import { useToken } from '@/features/authentication/contexts/TokenContext';
import checkResponse from '@/features/shared/utils/helpers/checkResponse';
import getStatusMessage from '@/features/shared/utils/helpers/getStatusMessage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FetchListingData, ListingCollection } from '../../types/Chart';

const useFetchListing = (url: string) => {
  const [listing, setListing] = useState<ListingCollection>([]);
  const [unitValues, setUnitValues] = useState<string>('-');
  const [ownMeanValue, setOwnMean] = useState<number>(0);
  const [ownSdValue, setOwnSd] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, loading } = useToken();

  const fetchConfig = useMemo(
    () => ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  const fetchData = useCallback(async (): Promise<FetchListingData> => {
    if (!token) throw new Error('No authentication token available');
    const response = await fetch(url, fetchConfig);
    const data: FetchListingData = await checkResponse(response);
    return data;
  }, [url, fetchConfig, token]);

  useEffect(() => {
    if (loading) return;

    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await fetchData();
        setOwnMean(data.calcMeanAndStdDTO.mean);
        setOwnSd(data.calcMeanAndStdDTO.standardDeviation);

        if (data.analyticsDTO.length > 0) {
          setUnitValues(data.analyticsDTO[0]?.unit_value ?? '-');
          setListing(data.analyticsDTO);
        } else {
          setUnitValues('-');
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') return;
        const errorMessage = getStatusMessage((error as any).status);
        setError(errorMessage);
        console.error('Error fetching data:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loading, fetchData, token]);

  return {
    listing,
    unitValues,
    ownMeanValue,
    ownSdValue,
    url,
    isLoading,
    error,
  };
};

export default useFetchListing;
