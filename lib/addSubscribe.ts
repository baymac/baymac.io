import firebase from '../firebase/clientApp';
import doesSubscriberExists from './doesSubscriberExists';

type AddSubscriber = {
  firstName: string;
  email: string;
};

interface IAddSubscriberResponse {
  error: boolean;
  message: string;
}

export default async function addSubscriber({
  firstName,
  email,
}: AddSubscriber): Promise<IAddSubscriberResponse> {
  const db = firebase.firestore();
  try {
    const exists = await doesSubscriberExists(email);
    if (!exists) {
      const result = await db
        .collection('subscribers')
        .add({
          firstName: firstName,
          email: email,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          return {
            error: false,
            message: 'Subscriber successfully added.',
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
      return {
        error: true,
        message: 'Subscriber already exists',
      };
    }
  } catch (error) {
    return {
      error: false,
      message: 'Some error occurred ' + error.message,
    };
  }
}
