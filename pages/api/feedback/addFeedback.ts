import { NextApiRequest, NextApiResponse } from 'next';
import add from '../../../lib/feedback/add';
import { rateLimiterMiddleWare } from '../../../lib/rateLimiter';

export default async function resend(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rateLimitRes = await rateLimiterMiddleWare(req, res);
  if (rateLimitRes.error) {
    return res.status(429).json({ error: true, message: rateLimitRes.message });
  }
  const content = req.body.content;
  const result = await add({ content });
  if (result.error) {
    return res.status(200).json({ error: true, message: result.message });
  }
  res.status(200).json({ error: false, message: result.message });
}
