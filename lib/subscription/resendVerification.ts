import { IGenericAPIResponse } from '../apiUtils';
import sendVerificationMail from './sendVerificationMail';
import subscriberIfExists from './subscriberIfExists';

export interface IResendVerificationRequest {
  email: string;
}

export interface IResendVerificationResponse extends IGenericAPIResponse {}

export default async function resendVerification({
  email,
}: IResendVerificationRequest): Promise<IResendVerificationResponse> {
  try {
    // Get existing subscriber
    const existingSubscriber = await subscriberIfExists(email);
    // If exisiting subscriber exists and email is not verified
    if (
      Object.keys(existingSubscriber).length !== 0 &&
      !existingSubscriber.verified
    ) {
      sendVerificationMail(email, existingSubscriber.firstName);
      return {
        error: false,
        message: 'Verification mail resent.',
      };
    } else {
      if (existingSubscriber.verified) {
        return {
          error: true,
          message: 'Subscriber already verified.',
        };
      }
      return {
        error: true,
        message: "Subscriber doesn't exist.",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: 'Some error occurred: ' + error.message,
    };
  }
}
