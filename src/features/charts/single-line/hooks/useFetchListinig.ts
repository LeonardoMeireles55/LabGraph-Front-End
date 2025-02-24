import { useToken } from '@/features/authentication/contexts/TokenContext';
import { fetchWrapper } from '@/services/fetch-wrapper';
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
    let data = {} as FetchListingData;

    if (!loading) {
      data = await fetchWrapper({
        route: url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return data;
  }, [url, token, loading]);

  const handleFetchData = useCallback(async () => {
    if (loading) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchData();
      setOwnMeanValue(data.calcMeanAndStdDTO.mean);
      setOwnSdValue(data.calcMeanAndStdDTO.standardDeviation);
      setUnitValues(data.analyticsDTO[0]?.unit_value ?? '-');
      setListing(data.analyticsDTO);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [loading, fetchData]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

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
