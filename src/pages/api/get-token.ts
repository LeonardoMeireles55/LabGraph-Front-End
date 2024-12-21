import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.cookies.tokenJWT;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving token' });
  }
}