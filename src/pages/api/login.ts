import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { token } = req.body

     const cookieOptions = {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 60 * 60 * 24,
    }


    res.setHeader(
      'Set-Cookie', 
      serialize('tokenJWT', token, cookieOptions)
    )
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(500).json({ message: 'Error setting authentication cookie' })
  }
}