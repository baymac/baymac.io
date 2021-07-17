import firebase from '../../firebase/clientApp';
import { IGenericAPIResponse } from '../apiUtils';
import sendVerificationMail from './sendVerificationMail';
import subscriberIfExists from './subscriberIfExists';

export interface IAddSubscriberRequest {
  firstName: string;
  email: string;
}

export interface IAddSubscriberResponse extends IGenericAPIResponse {}

export default async function addSubscriber({
  email,
  firstName,
}: IAddSubscriberRequest): Promise<IAddSubscriberResponse> {
  const db = firebase.firestore();
  try {
    // Get existing subscriber
    const existingSubscriber = await subscriberIfExists(email);
    // If exisiting subscriber does not exist
    if (Object.keys(existingSubscriber).length === 0) {
      // Add subscriber and then send verification email
      const result = await db
        .collection('subscribers')
        .add({
          firstName: firstName,
          email: email,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          verified: false,
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          sendVerificationMail(email, firstName);
          return {
            error: false,
            message: 'Please check your email to confirm your subscription.',
          };
        })
        .catch((error) => {
          return {
            error: true,
            message: 'Subscriber could not be added. ' + error.message,
          };
        });
      return result;
    } else {
      // If subscriber exists but not verified send verification email
      if (!existingSubscriber.verified) {
        sendVerificationMail(email, firstName);
        return {
          error: false,
          message: 'Subscriber already exists, verification mail resent.',
        };
      }
      return {
        error: true,
        message: 'Subscriber already exists.',
      };
    }
  } catch (error) {
    return {
      error: false,
      message: 'Some error occurred: ' + error.message,
    };
  }
}
