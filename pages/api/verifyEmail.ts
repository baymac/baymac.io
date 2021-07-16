import jwt from 'jsonwebtoken';
import { rateLimiterMiddleWare } from '../../lib/rateLimiter';
import { JWT_AUDIENCE, JWT_ISSUER } from '../../lib/sendVerificationMail';
import verifySubscriber from '../../lib/verifySubscriber';

export default async function verifyEmail(req, res) {
  const rateLimitRes = await rateLimiterMiddleWare(req, res);
  if (rateLimitRes.error) {
    return res.status(429).json({ error: true, message: rateLimitRes.message });
  }
  if (!req.query.t) {
    return res.status(401).json({ status: 'failure' });
  }
  const token = req.query.t;
  const decoded = jwt.verify(token, process.env.EMAIL_KEY, {
    algorithms: ['HS512'],
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    clockTolerance: 200, // tolerate 200 seconds difference
    clockTimestamp: Date.now() / 1000,
  });
  const result = await verifySubscriber(decoded['sub']);
  if (result.error) {
    return res.status(200).json({ error: true, message: result.message });
  }
  res.status(200).json({ error: false, message: result.message });
}
