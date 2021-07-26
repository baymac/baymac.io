import addSubscriber from '../../../lib/subscription/addSubscriber';
import { rateLimiterMiddleWare } from '../../../lib/rateLimiter';
import { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  const rateLimitRes = await rateLimiterMiddleWare(req, res);
  if (rateLimitRes.error) {
    return res.status(429).json({ error: true, message: rateLimitRes.message });
  }
  const { email, firstName } = req.body;
  const result = await addSubscriber({
    email,
    firstName,
  });
  if (result.error) {
    return res.status(200).json({ error: true, message: result.message });
  }
  res.status(200).json({ error: false, message: result.message });
};

export default withSentry(subscribe);
