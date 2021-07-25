import { IGenericAPIResponse } from '../apiUtils';
import sendVerificationMail from './sendVerificationMail';
import subscriberIfExists from './subscriberIfExists';

export interface IResendVerificationRequest {
  email: string;
}

export interface IResendVerificationResponse extends IGenericAPIResponse {}

export default async function resendVerificationEmail({
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
      const { error, message } = await sendVerificationMail(
        existingSubscriber.id,
        email,
        existingSubscriber.firstName
      );
      return {
        error,
        message: !error ? 'Verification mail resent' : message,
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
