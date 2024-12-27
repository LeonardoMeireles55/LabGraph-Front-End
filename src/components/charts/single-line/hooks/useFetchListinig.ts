import getStatusMessage from '@/components/utils/helpers/getStatusMessage';
import { useEffect, useState } from 'react';

interface ListingCollection extends Array<any> {}
interface UseFetchListingProps {
    url: string;
    urlMeanAndDeviation: string;
}

const useFetchListinig = ({ url, urlMeanAndDeviation }: UseFetchListingProps) => {
    const [listing, setListing] = useState<ListingCollection>([]);
    const [unitValues, setUnitValues] = useState<string | null>(null);
    const [ownMeanValue, setOwnMean] = useState<number | null>(null);
    const [ownSdValue, setOwnSd] = useState<number | null>(null);
    const [onLoad, setOnLoad] = useState<boolean>(false);

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

                const responseMeanAndDeviation = await fetch(urlMeanAndDeviation, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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
        urlMeanAndDeviation
    };
};

export default useFetchListinig;
