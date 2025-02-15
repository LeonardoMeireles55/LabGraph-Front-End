import checkResponse from '../features/shared/utils/helpers/checkResponse';

interface ServerFetchOptions {
    route: string;
    method?: string;
    body?: any;
    auth?: boolean;
    headers?: Record<string, string>;
}

export const serverFetch = async (options: ServerFetchOptions) => {
    const { route, method = 'GET', body, headers = {} } = options;
    try {
        const fetchOptions: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };
        if (body) {
            fetchOptions.body = JSON.stringify(body);
        }
        const response = await fetch(`${route}`, fetchOptions);
        return await checkResponse(response);
    } catch (error) {
        console.error(`Server API error for ${route}:`, error);
        throw error;
    }
};
