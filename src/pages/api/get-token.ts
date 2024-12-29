import type { NextApiRequest, NextApiResponse } from 'next';

interface ErrorResponse {
  message: string;
  status: number;
}

interface SuccessResponse {
  token: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  // Method validation
  if (req.method !== 'GET') {
    console.error(`Invalid method: ${req.method}`);
    return res.status(405).json({
      message: 'Method not allowed. Only GET requests are accepted.',
      status: 405
    });
  }

  try {
    const token = req.cookies.tokenJWT;

    // Token validation
    if (!token) {
      console.error('Token not found in cookies');
      return res.status(401).json({
        message: 'Authentication required. Please login again.',
        status: 401
      });
    }

    if (typeof token !== 'string') {
      console.error('Invalid token format');
      return res.status(400).json({
        message: 'Invalid token format',
        status: 400
      });
    }

    return res.status(200).json({ token });

  } catch (error) {
    // Error handling
    console.error('Error retrieving token:', error);
    
    if (error instanceof Error) {
      return res.status(500).json({
        message: `Internal server error: ${error.message}`,
        status: 500
      });
    }

    return res.status(500).json({
      message: 'Unknown error occurred',
      status: 500
    });
  }
}