import checkResponse from '@/components/utils/helpers/checkResponse';
import getStatusMessage from '@/components/utils/helpers/getStatusMessage';
import { useEffect, useState } from 'react';
import { ListingCollection, UseFetchListingProps } from '../../types/Chart';

const useFetchListing = ({ url, urlMeanAndDeviation }: UseFetchListingProps) => {
  const [listing, setListing] = useState<ListingCollection>([]);
  const [unitValues, setUnitValues] = useState<string | null>(null);
  const [ownMeanValue, setOwnMean] = useState<number | null>(null);
  const [ownSdValue, setOwnSd] = useState<number | null>(null);

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
        console.error('Error fetching data:', getStatusMessage(error.status));
      }
    };

    fetchData();
  }, [url, urlMeanAndDeviation]);

  return {
    listing,
    unitValues,
    ownMeanValue,
    ownSdValue,
    url,
    urlMeanAndDeviation,
  };
};

export default useFetchListing;
