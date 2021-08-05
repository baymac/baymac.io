import { NextApiRequest, NextApiResponse } from 'next';
import getFeedback from '../../../lib/feedback/getFeedback';
import { rateLimiterMiddleWare } from '../../../lib/rateLimiter';

export default async function resend(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rateLimitRes = await rateLimiterMiddleWare(req, res);
  if (rateLimitRes.error) {
    return res.status(429).json({ error: true, message: rateLimitRes.message });
  }
  const page = parseInt(req.query.p as string, 10);
  const result = await getFeedback({ page });
  if (result.error) {
    return res.status(200).json({ error: true, message: result.message });
  }
  res.status(200).json({ error: false, feedbacks: result.data });
}
