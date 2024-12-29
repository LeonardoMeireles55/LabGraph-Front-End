import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ErrorResponse {
  message: string;
  status: number;
}

interface SuccessResponse {
  success: boolean;
}

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    console.error(`Invalid method: ${req.method}`);
    return res.status(405).json({
      message: 'Method not allowed. Only POST requests are accepted.',
      status: 405
    });
  }

  try {
    const { token } = req.body;

    if (!token || typeof token !== 'string') {
      console.error('Invalid or missing token in request body');
      return res.status(400).json({
        message: 'Invalid token provided',
        status: 400
      });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: ONE_DAY_IN_SECONDS,
    };

    try {
      res.setHeader(
        'Set-Cookie',
        serialize('tokenJWT', token, cookieOptions)
      );
    } catch (cookieError) {
      console.error('Error setting cookie:', cookieError);
      return res.status(500).json({
        message: 'Failed to set authentication cookie',
        status: 500
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Internal server error',
      status: 500
    });
  }
}