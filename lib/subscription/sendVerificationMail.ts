import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import constants from '../../lib/constants';
import mailerClient from './mailerClient';
import path from 'path';
import { IGenericAPIResponse } from '../apiUtils';
import pug from 'pug';

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

const emailConfirmationPath = () => {
  let basePath = process.cwd();
  if (process.env.NODE_ENV === 'production') {
    basePath = path.join(process.cwd(), '.next/server/chunks');
  } else {
    basePath += '/public';
  }
  return path.join(basePath, constants.verifyEmailTemplatePath);
};

function getEmailConfirmationHtml(
  unsubscribeLink: string,
  verifyLink: string,
  firstName: string,
  updateProfileLink: string
) {
  const compiledFunction = pug.compileFile(emailConfirmationPath());
  const html = compiledFunction({
    FIRST_NAME: firstName,
    VERIFY_LINK: verifyLink,
    UNSUBSCRIBE_LINK: unsubscribeLink,
    UPDATE_PROFILE_LINK: updateProfileLink,
  });
  return html;
}

export default function sendVerificationMail(
  userId: string,
  email: string,
  firstName: string
): IGenericAPIResponse {
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
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Only one more step, verify your email address',
    html: getEmailConfirmationHtml(
      unsubscribeLink,
      verifyLink,
      firstName,
      updateProfileLink
    ),
  };
  // try {
  //   const result = await mailerClient.sendMail(mailOptions);
  //   return {
  //     error: false,
  //     message: result.response,
  //   };
  // } catch (err) {
  //   return {
  //     error: true,
  //     message: err.response,
  //   };
  // }
  mailerClient.sendMail(mailOptions, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Error occurred');
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
    mailerClient.close();
  });
  return {
    error: false,
    message: 'Mail sent.',
  };
}
