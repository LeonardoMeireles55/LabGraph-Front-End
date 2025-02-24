import CheckResponse from '@/features/shared/utils/helpers/checkResponse';
import FetchOptions from '@/services/types/FetchOptions';

export const FetchWrapper = async (options: FetchOptions) => {
  const { route, method = 'GET', body, headers = {} } = options;
  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }
    const response = await fetch(`${route}`, fetchOptions);
    return await CheckResponse(response);
  } catch (error) {
    console.error(`Server API error for ${route}:`, error);
    throw error;
  }
};
