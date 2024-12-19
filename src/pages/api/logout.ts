import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const cookieOptions = {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 0, // Set to 0 to delete the cookie
  }

  res.setHeader(
    'Set-Cookie', 
    serialize('tokenJWT', '', cookieOptions) // Empty value to clear the cookie
  )

  return res.status(200).json({ success: true })
}