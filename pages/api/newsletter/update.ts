import updateSubscriber from '../../../lib/subscription/updateSubscriber';
import { rateLimiterMiddleWare } from '../../../lib/rateLimiter';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rateLimitRes = await rateLimiterMiddleWare(req, res);
  if (rateLimitRes.error) {
    return res.status(429).json({ error: true, message: rateLimitRes.message });
  }
  const { userId, firstName } = req.body;
  const result = await updateSubscriber({
    userId,
    firstName,
  });
  if (result.error) {
    return res.status(200).json({ error: true, message: result.message });
  }
  res.status(200).json({ error: false, message: result.message });
}
