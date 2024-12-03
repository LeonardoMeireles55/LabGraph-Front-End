import { useEffect, useState } from 'react';

interface ListingCollection extends Array<any> {}
interface UseFetchListingProps {
  url: string;
  urlMeanAndDeviation: string;
  initialYear: number;
  initialMonth: number;
  initialDay: number;
  secondYear: number;
  secondMonth: number;
  secondDay: number;
}

const useFetchListing = ({
  url,
  urlMeanAndDeviation,
  initialYear,
  initialMonth,
  initialDay,
  secondYear,
  secondMonth,
  secondDay,
}: UseFetchListingProps) => {
  const [listing, setListing] = useState<ListingCollection>([]);
  const [unitValues, setUnitValues] = useState<string | null>(null);
  const [ownMeanValue, setOwnMean] = useState<number | null>(null);
  const [ownSdValue, setOwnSd] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const responseMeanAndDeviation = await fetch(urlMeanAndDeviation, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!responseMeanAndDeviation.ok) {
          throw new Error('Network response was not ok for mean and deviation');
        }

        const jsonMeanAndDeviation = await responseMeanAndDeviation.json();
        setOwnMean(jsonMeanAndDeviation.mean);
        setOwnSd(jsonMeanAndDeviation.standardDeviation);

        if (!response.ok) {
          throw new Error('Network response was not ok for listing');
        }

        const json = await response.json();
        setUnitValues(json[0]?.unit_value || null);
        setListing(json);

        if (!json.length) {
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
