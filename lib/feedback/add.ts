import firebase from '../../firebase/clientApp';
import * as Sentry from '@sentry/nextjs';
import { IGenericAPIResponse } from '../apiUtils';

export interface IAddFeedbackResponse extends IGenericAPIResponse {}

export default async function add({
  content,
}: {
  content: string;
}): Promise<IAddFeedbackResponse> {
  const db = firebase.firestore();
  try {
    const result = await db
      .collection('feedback')
      .add({
        content: content,
        userId: 'xyz',
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then((docRef) => {
        return {
          error: false,
          message: 'Feedback has been added. ' + docRef.id,
        };
      })
      .catch((error) => {
        Sentry.captureException(error);
        return {
          error: true,
          message: 'Feedback could not be added. ' + error.message,
        };
      });
    return result;
  } catch (error) {
    Sentry.captureException(error);
    return {
      error: true,
      message: 'Some error occurred: ' + error.message,
    };
  }
}
