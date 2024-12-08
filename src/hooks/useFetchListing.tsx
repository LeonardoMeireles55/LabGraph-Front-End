import { useEffect, useState } from 'react';

interface ListingCollection extends Array<any> { }
interface UseFetchListingProps {
  url: string;
  urlMeanAndDeviation: string;
}

const useFetchListing = ({ url, urlMeanAndDeviation }: UseFetchListingProps) => {
  const [listing, setListing] = useState<ListingCollection>([]);
  const [unitValues, setUnitValues] = useState<string | null>(null);
  const [ownMeanValue, setOwnMean] = useState<number | null>(null);
  const [ownSdValue, setOwnSd] = useState<number | null>(null);

  const checkResponse = async (response: Response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const json = await checkResponse(response);

        const responseMeanAndDeviation = await fetch(urlMeanAndDeviation, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url, urlMeanAndDeviation]);

  return {
    listing,
    unitValues,
    ownMeanValue,
    ownSdValue,
  };
};

export default useFetchListing;
