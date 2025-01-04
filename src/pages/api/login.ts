import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ErrorResponse {
  message: string;
  status: number;
}

interface SuccessResponse {
  success: boolean;
}

const TOKEN_SECONDS = 3600;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    console.error(`Invalid method: ${req.method}`);
    return res.status(405).json({
      message: 'Method not allowed. Only POST requests are accepted.',
      status: 405,
    });
  }

  try {
    const { token } = req.body;

    if (!token || typeof token !== 'string') {
      console.error('Token missing or not a string');
      return res.status(400).json({
        message: 'Invalid or missing token',
        status: 400,
      });
    }

    if (token.split('.').length !== 3) {
      console.error('Malformed token provided');
      return res.status(401).json({
        message: 'Malformed token',
        status: 401,
      });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: TOKEN_SECONDS,
    };

    try {
      res.setHeader('Set-Cookie', serialize('tokenJWT', token, cookieOptions));
    } catch (cookieError) {
      console.error('Error setting cookie:', cookieError);
      return res.status(500).json({
        message: 'Failed to set authentication cookie',
        status: 500,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Unexpected error during login:', error);
    return res.status(500).json({
      message: 'Internal server error',
      status: 500,
    });
  }
}
