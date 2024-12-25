import getStatusMessage from '@/components/utils/getStatusMessage';
import { useEffect, useState } from 'react';

interface ListingCollection extends Array<any> {}

interface UseFetchListingProps {
    url: string;
    urlMeanAndDeviation: string;
    url2: string;
    urlMeanAndDeviation2: string;
}

const useFetchDoubleListinig = ({ url, urlMeanAndDeviation, url2, urlMeanAndDeviation2 }: UseFetchListingProps) => {
    const [listing, setListing] = useState<ListingCollection>([]);
    const [listing2, setListing2] = useState<ListingCollection>([]);

    const [unitValues, setUnitValues] = useState<string | null>(null);
    const [unitValues2, setUnitValues2] = useState<string | null>(null);

    const [ownMeanValue, setOwnMean] = useState<number | null>(null);
    const [ownSdValue, setOwnSd] = useState<number | null>(null);

    const [ownMeanValue2, setOwnMean2] = useState<number | null>(null);
    const [ownSdValue2, setOwnSd2] = useState<number | null>(null);

    const checkResponse = async (response: Response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${getStatusMessage(response.status)}`);
        }
        return await response.json();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {

                const tokenResponse = await fetch('/api/get-token');
                const { token } = await tokenResponse.json();

                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const json = await checkResponse(response);

                const response2 = await fetch(url2, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const json2 = await checkResponse(response2);

                const responseMeanAndDeviation = await fetch(urlMeanAndDeviation, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const jsonMeanAndDeviation = await checkResponse(responseMeanAndDeviation);

                const responseMeanAndDeviation2 = await fetch(urlMeanAndDeviation2, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const jsonMeanAndDeviation2 = await checkResponse(responseMeanAndDeviation2);

                setOwnMean(jsonMeanAndDeviation.mean);
                setOwnSd(jsonMeanAndDeviation.standardDeviation);

                setOwnMean2(jsonMeanAndDeviation2.mean);
                setOwnSd2(jsonMeanAndDeviation2.standardDeviation);

                if (json.length > 0) {
                    setUnitValues(json[0]?.unit_value || null);
                    setUnitValues2(json2[0]?.unit_value || null);
                    setListing(json);
                    setListing2(json2);

                } else {
                    setUnitValues(null);
                }
            } catch (error: Error | any) {
                console.error('Error fetching data:', getStatusMessage(error.status));
            }
        };

        fetchData();
    }, [url, urlMeanAndDeviation, url2, urlMeanAndDeviation2]);

    return {
        listing,
        listing2,
        unitValues,
        unitValues2,
        ownMeanValue,
        ownSdValue,
        ownMeanValue2,
        ownSdValue2,
    };
};

export default useFetchDoubleListinig;
