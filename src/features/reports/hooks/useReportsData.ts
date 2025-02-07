import { useToken } from '@/features/authentication/contexts/TokenContext';
import { ListingItem } from '@/features/charts/types/Chart';
import { useEffect, useState } from 'react';

interface UseReportsDataProps {
  url: string;
}

const useReportsData = ({ url }: UseReportsDataProps) => {
  const { token, loading } = useToken();

  const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        return;
      }
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setDataFetched(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url, loading, token]);

  return { dataFetched };
};

export default useReportsData;
