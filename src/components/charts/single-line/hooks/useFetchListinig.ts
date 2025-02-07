import { useToken } from '@/components/authentication/contexts/TokenContext';
import checkResponse from '@/components/shared/utils/helpers/checkResponse';
import getStatusMessage from '@/components/shared/utils/helpers/getStatusMessage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ListingCollection, UseFetchListingProps } from '../../types/Chart';

const useFetchListing = ({ url, urlMeanAndDeviation }: UseFetchListingProps) => {
  const [listing, setListing] = useState<ListingCollection>([]);
  const [unitValues, setUnitValues] = useState<string | null>(null);
  const [ownMeanValue, setOwnMean] = useState<number | null>(null);
  const [ownSdValue, setOwnSd] = useState<number | null>(null);
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

  const fetchData = useCallback(
    async (abortController: AbortController) => {
      if (!token) throw new Error('No authentication token available');

      const [listingResponse, meanDeviationResponse] = await Promise.all([
        fetch(url, { ...fetchConfig, signal: abortController.signal }),
        fetch(urlMeanAndDeviation, { ...fetchConfig, signal: abortController.signal }),
      ]);

      const [json, jsonMeanAndDeviation] = await Promise.all([
        checkResponse(listingResponse),
        checkResponse(meanDeviationResponse),
      ]);

      return { json, jsonMeanAndDeviation };
    },
    [url, urlMeanAndDeviation, fetchConfig, token]
  );

  useEffect(() => {
    if (loading) return;

    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);

    fetchData(abortController)
      .then(({ json, jsonMeanAndDeviation }) => {
        setOwnMean(jsonMeanAndDeviation.mean);
        setOwnSd(jsonMeanAndDeviation.standardDeviation);

        if (json.length > 0) {
          setUnitValues(json[0]?.unit_value ?? null);
          setListing(json);
        } else {
          setUnitValues(null);
        }
      })
      .catch((error: Error | any) => {
        if (error.name === 'AbortError') return;
        const errorMessage = getStatusMessage(error.status);
        setError(errorMessage);
        console.error('Error fetching data:', errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [loading, fetchData, token]);

  return {
    listing,
    unitValues,
    ownMeanValue,
    ownSdValue,
    url,
    urlMeanAndDeviation,
    isLoading,
    error,
  };
};

export default useFetchListing;
