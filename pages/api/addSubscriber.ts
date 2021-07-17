import addSubscriberFb from '../../lib/subscription/addSubscriberFb';
import { rateLimiterMiddleWare } from '../../lib/rateLimiter';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function addSubscriber(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rateLimitRes = await rateLimiterMiddleWare(req, res);
  if (rateLimitRes.error) {
    return res.status(429).json({ error: true, message: rateLimitRes.message });
  }
  const { email, firstName } = req.body;
  const result = await addSubscriberFb({
    email,
    firstName,
  });
  if (result.error) {
    return res.status(200).json({ error: true, message: result.message });
  }
  res.status(200).json({ error: false, message: result.message });
}
