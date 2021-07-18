import firebase from '../../firebase/clientApp';
import subscriberIfExists from './subscriberIfExists';

// First verify the JWT token then run this function
export default async function verifySubscriber(email: string) {
  const db = firebase.firestore();
  try {
    // Get existing subscriber
    const existingSubscriber = await subscriberIfExists(email);
    // If existing subscriber exists and it is not verified
    if (
      Object.keys(existingSubscriber).length > 0 &&
      !existingSubscriber.verified
    ) {
      // update verified to true
      const result = await db
        .collection('subscribers')
        .doc(existingSubscriber.id)
        .update({
          verified: true,
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          return {
            error: false,
            message: 'You are sucessfully verified.',
          };
        })
        .catch((error) => {
          return {
            error: true,
            message: 'You could not be verified. ' + error.message,
          };
        });
      return result;
    } else {
      return {
        error: true,
        message: "Subscriber already verified or doesn't exist.",
      };
    }
  } catch (error) {
    return {
      error: false,
      message: 'Some error occurred ' + error.message,
    };
  }
}
