import * as Sentry from '@sentry/nextjs';
import firebase from '../../firebase/clientApp';

// export interface IFeedbacksResponse extends IFeedbackResponse {
//   error: boolean;
//   message: string;
// }

export default async function getFeedback({
  page,
}: {
  page: number;
}): Promise<any> {
  const db = firebase.firestore();
  try {
    const result = await db
      .collection('feedback')
      .orderBy('createdAt')
      .startAt(page)
      .limit(10)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length === 0) {
          null;
        }
        return {
          error: false,
          message: 'Recevied feedbacks!',
          data: querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        };
      })
      .catch((error) => {
        Sentry.captureException(error);
        return {
          error: true,
          message: 'Error fetching feedback: ' + error.message,
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
