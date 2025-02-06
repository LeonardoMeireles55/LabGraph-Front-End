import { ListingItem } from '@/components/charts/types/Chart';
import { useEffect, useState } from 'react';

interface UseReportsDataProps {
  url: string;
}

const useReportsData = ({ url }: UseReportsDataProps) => {
  const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await fetch('/api/get-token');
        const { token } = await tokenResponse.json();

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        setDataFetched(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url]);

  return { dataFetched };
};

export default useReportsData;
