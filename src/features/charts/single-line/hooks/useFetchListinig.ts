import { useToken } from '@/features/authentication/contexts/TokenContext';
import getStatusMessage from '@/features/shared/utils/helpers/getStatusMessage';
import { FetchWrapper } from '@/services/fetch-wrapper';
import { useCallback, useEffect, useState } from 'react';
import { FetchListingData, ListingCollection } from '../../types/Chart';

const useFetchListing = (url: string) => {
  const [listing, setListing] = useState<ListingCollection>([]);
  const [unitValues, setUnitValues] = useState<string>('-');
  const [ownMeanValue, setOwnMeanValue] = useState<number>(0);
  const [ownSdValue, setOwnSdValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, loading } = useToken();

  const fetchData = useCallback(async (): Promise<FetchListingData> => {
    let data = {} as FetchListingData

    if (!loading) {
      data = await FetchWrapper({
        route: url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return data;
  }, [url, token, loading]);

  useEffect(() => {
    if (loading) return;

    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await fetchData();
        setOwnMeanValue(data.calcMeanAndStdDTO.mean);
        setOwnSdValue(data.calcMeanAndStdDTO.standardDeviation);

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
