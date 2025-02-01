import { useValidatedToken } from '@/components/auth/hooks/useValidatedToken';
import checkResponse from '@/components/utils/helpers/checkResponse';
import getStatusMessage from '@/components/utils/helpers/getStatusMessage';
import { useEffect, useState } from 'react';
import { ListingCollection, UseFetchListingProps } from '../../types/Chart';

const useFetchListing = ({ url, urlMeanAndDeviation }: UseFetchListingProps) => {
  const [listing, setListing] = useState<ListingCollection>([]);
  const [unitValues, setUnitValues] = useState<string | null>(null);
  const [ownMeanValue, setOwnMean] = useState<number | null>(null);
  const [ownSdValue, setOwnSd] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, loading } = useValidatedToken();

  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        return;
      }

      if (!token) {
        setError('No authentication token available');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await checkResponse(response);

        const responseMeanAndDeviation = await fetch(urlMeanAndDeviation, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const jsonMeanAndDeviation = await checkResponse(responseMeanAndDeviation);

        setOwnMean(jsonMeanAndDeviation.mean);
        setOwnSd(jsonMeanAndDeviation.standardDeviation);

        if (json.length > 0) {
          setUnitValues(json[0]?.unit_value || null);
          setListing(json);
        } else {
          setUnitValues(null);
        }
      } catch (error: Error | any) {
        const errorMessage = getStatusMessage(error.status);
        setError(errorMessage);
        console.error('Error fetching data:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, urlMeanAndDeviation, token, loading]);

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
