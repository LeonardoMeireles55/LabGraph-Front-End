import { LRUCache } from 'lru-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ValidationResponse {
  valid: boolean;
  message?: string;
}

const tokenCache = new LRUCache<string, boolean>({
  max: 500,
  ttl: 1000 * 60 * 5,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValidationResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      valid: false,
      message: 'Method not allowed',
    });
  }

  try {
    const token = req.cookies.tokenJWT;

    if (!token) {
      return res.status(401).json({
        valid: false,
        message: 'No token found',
      });
    }

    const cachedResult = tokenCache.get(token);
    if (cachedResult !== undefined) {
      return res.status(200).json({ valid: cachedResult });
    }

    if (token.split('.').length !== 3) {
      return res.status(401).json({
        valid: false,
        message: 'Invalid token format',
      });
    }

    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      if (Date.now() >= payload.exp * 1000) {
        tokenCache.set(token, false, { ttl: 1000 * 60 * 5 });
        return res.status(401).json({
          valid: false,
          message: 'Token expired',
        });
      }
    } catch {
      tokenCache.set(token, false, { ttl: 1000 * 60 * 5 });
      return res.status(401).json({
        valid: false,
        message: 'Invalid token payload',
      });
    }

    tokenCache.set(token, true, { ttl: 1000 * 60 * 5 });
    return res.status(200).json({ valid: true });
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(500).json({
      valid: false,
      message: 'Internal server error',
    });
  }
}
