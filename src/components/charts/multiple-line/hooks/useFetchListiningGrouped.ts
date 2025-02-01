import { useValidatedToken } from '@/components/auth/hooks/useValidatedToken';
import checkResponse from '@/components/utils/helpers/checkResponse';
import getStatusMessage from '@/components/utils/helpers/getStatusMessage';
import { useEffect, useState } from 'react';
import { LevelGroupResponse } from '../../types/Chart';

const useFetchListeningGrouped = (url: string) => {
  const [listing, setListing] = useState<LevelGroupResponse[]>([]);
  const [unitValues, setUnitValues] = useState<string | null>(null);
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
        const listingResponse = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const listingData = (await checkResponse(listingResponse)) as LevelGroupResponse[];

        setListing(listingData);

        if (listingData.length > 0 && listingData[0].groupedValuesByLevelDTO.values.length > 0) {
          setUnitValues(listingData[0].groupedValuesByLevelDTO.values[0].unit_value);
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
  }, [url, token, loading]);

  return {
    listing,
    unitValues,
    isLoading,
    error,
  };
};

export default useFetchListeningGrouped;
