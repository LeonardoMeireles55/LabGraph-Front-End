import getStatusMessage from '@/components/utils/helpers/getStatusMessage';
import { useEffect, useState, useMemo } from 'react';

interface ListingCollection extends Array<any> {}

interface UseFetchListingProps {
    urls: string[];
    meanDeviationUrls: string[];
}

const useFetchListinigs = ({ urls, meanDeviationUrls }: UseFetchListingProps) => {
    const [listings, setListings] = useState<ListingCollection[]>([]);
    const [unitValuesList, setUnitValuesList] = useState<(string | null)[]>([]);
    const [ownMeanValues, setOwnMeanValues] = useState<(number | null)[]>([]);
    const [ownSdValues, setOwnSdValues] = useState<(number | null)[]>([]);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        let isSubscribed = true;

        const fetchToken = async () => {
            try {
                const response = await fetch('/api/get-token');
                const data = await response.json();
                if (isSubscribed) {
                    setToken(data.token);
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchToken();

        return () => {
            isSubscribed = false;
        };
    }, []);

    const headers = useMemo(() => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }), [token]);

    const checkResponse = async (response: Response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${getStatusMessage(response.status)}`);
        }
        return await response.json();
    };

    useEffect(() => {
        if (!token || urls.length === 0) return;

        let isSubscribed = true;

        const fetchData = async () => {
            try {
                if (isSubscribed) {
                    setListings([]);
                    setUnitValuesList([]);
                    setOwnMeanValues([]);
                    setOwnSdValues([]);
                }

                const mainResponses = await Promise.all(
                    urls.map(url => 
                        fetch(url, { method: 'GET', headers })
                        .then(checkResponse)
                        .catch(() => null)
                    )
                );

                const meanDeviationResponses = await Promise.all(
                    meanDeviationUrls.map(url => 
                        fetch(url, { method: 'GET', headers })
                        .then(checkResponse)
                        .catch(() => null)
                    )
                );

                if (!isSubscribed) return;

                const validMainResponses = mainResponses.filter(response => response !== null);
                const validMeanResponses = meanDeviationResponses.filter(response => response !== null);

                setListings(validMainResponses);
                setUnitValuesList(validMainResponses.map(json => 
                    json?.length > 0 ? json[0]?.unit_value || null : null
                ));
                setOwnMeanValues(validMeanResponses.map(json => json?.mean || null));
                setOwnSdValues(validMeanResponses.map(json => json?.standardDeviation || null));

            } catch (error: Error | any) {
                console.error('Error fetching data:', getStatusMessage(error.status));
            }
        };

        fetchData();

        return () => {
            isSubscribed = false;
        };
    }, [token, urls.join(','), meanDeviationUrls.join(',')]);

    return {
        listings,
        unitValuesList,
        ownMeanValues,
        ownSdValues
    };
};

export default useFetchListinigs;
