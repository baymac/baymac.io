import { NextApiRequest, NextApiResponse } from 'next';
import { rateLimiterMiddleWare } from '../../../lib/rateLimiter';
import removeSubscriber from '../../../lib/subscription/removeSubscriber';

export default async function verify(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rateLimitRes = await rateLimiterMiddleWare(req, res);
  if (rateLimitRes.error) {
    return res.status(429).json({ error: true, message: rateLimitRes.message });
  }
  if (!req.query.u) {
    return res.status(401).json({ status: 'failure' });
  }
  const userId: string = req.query.u as string;
  const result = await removeSubscriber({ userId });
  if (result.error) {
    return res.status(200).json({ error: true, message: result.message });
  }
  res.status(200).json({ error: false, message: result.message });
}
