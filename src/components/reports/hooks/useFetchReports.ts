import checkResponse from '@/components/shared/utils/helpers/checkResponse';
import getStatusMessage from '@/components/shared/utils/helpers/getStatusMessage';
import { useEffect, useState } from 'react';

interface ListingCollection extends Array<any> {}
interface UseFetchListingProps {
  url: string;
}

const useFetchReports = ({ url }: UseFetchListingProps) => {
  const [listing, setListing] = useState<ListingCollection>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const json = await checkResponse(response);
        setListing(json);
      } catch (error: Error | any) {
        console.error('Error fetching data:', getStatusMessage(error.status));
      }
    };

    fetchData();
  }, [url]);

  return {
    listing,
  };
};

export default useFetchReports;
