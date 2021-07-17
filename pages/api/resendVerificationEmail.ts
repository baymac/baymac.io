import { NextApiRequest, NextApiResponse } from 'next';
import { rateLimiterMiddleWare } from '../../lib/rateLimiter';
import resendVerification from '../../lib/subscription/resendVerification';

export default async function resendVerificationEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rateLimitRes = await rateLimiterMiddleWare(req, res);
  if (rateLimitRes.error) {
    return res.status(429).json({ error: true, message: rateLimitRes.message });
  }
  const { email } = req.body;
  const result = await resendVerification({ email });
  if (result.error) {
    return res.status(200).json({ error: true, message: result.message });
  }
  res.status(200).json({ error: false, message: result.message });
}
