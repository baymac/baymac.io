import crypto from 'crypto';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import constants from '../../lib/constants';
import mailerClient from './mailerClient';

export const JWT_ISSUER = 'baymac.io';
export const JWT_AUDIENCE = 'baymac.io';
export const VERIFICATION_VALIDITY = 1 * 60 * 60 * 1000; // 1 hour

function getJwtToken(email: string) {
  const payload = {
    nbf: Math.floor(+Date.now() / 1000),
    exp: Math.floor((+Date.now() + VERIFICATION_VALIDITY) / 1000),
  };
  const idToken = crypto.randomBytes(16).toString('hex');
  return jwt.sign(payload, process.env.EMAIL_KEY, {
    algorithm: 'HS512',
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    subject: email,
    jwtid: idToken,
  });
}

const emailConfirmationPath = '/var/task' + constants.verifyEmailTemplatePath;

function getEmailConfirmationHtml(
  unsubscribeLink: string,
  verifyLink: string,
  firstName: string,
  updateProfileLink: string
) {
  let html = fs
    .readFileSync(emailConfirmationPath)
    .toString()
    .replace('{{FIRST_NAME}}', firstName)
    .replace('{{VERIFY_LINK}}', verifyLink)
    .replace('{{VERIFY_LINK}}', verifyLink)
    .replace('{{UNSUBSCRIBE_LINK}}', unsubscribeLink)
    .replace('{{UNSUBSCRIBE_LINK}}', unsubscribeLink)
    .replace('{{UPDATE_PROFILE_LINK}}', updateProfileLink);
  return html;
}

export default function sendVerificationMail(
  userId: string,
  email: string,
  firstName: string
) {
  const token = getJwtToken(email);
  const verifyLink = `${
    process.env.NODE_ENV === 'development' ? 'http' : 'https'
  }://${process.env.NEXT_PUBLIC_URL}${
    constants.newsletterVerifyApiRoute
  }?t=${token}`;
  const unsubscribeLink = `${
    process.env.NODE_ENV === 'development' ? 'http' : 'https'
  }://${process.env.NEXT_PUBLIC_URL}${
    constants.newsletterUnsubscribeApiRoute
  }?u=${userId}`;
  const updateProfileLink = `${
    process.env.NODE_ENV === 'development' ? 'http' : 'https'
  }://${process.env.NEXT_PUBLIC_URL}${
    constants.newsletterUpdateServerSideRoute
  }?u=${userId}`;
  const mailOptions = {
    from: 'hi@baymac.io',
    to: email,
    subject: 'Only one more step, verify your email address',
    html: getEmailConfirmationHtml(
      unsubscribeLink,
      verifyLink,
      firstName,
      updateProfileLink
    ),
  };
  mailerClient.sendMail(mailOptions, (err, info) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    // eslint-disable-next-line no-console
    console.log(info);
  });
}
