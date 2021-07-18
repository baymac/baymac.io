import firebase from '../../firebase/clientApp';
import { IGenericAPIResponse, ISubscriber } from '../apiUtils';

export interface IRemoveSubscriberRequest {
  userId: string;
}

export interface IRemoveSubscriberResponse extends IGenericAPIResponse {}

export default async function removeSubscriber({
  userId,
}: IRemoveSubscriberRequest): Promise<IGenericAPIResponse> {
  const db = firebase.firestore();
  try {
    // Get existing subscriber
    const existingSubscriber: ISubscriber | null = await db
      .collection('subscribers')
      .doc(userId)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.exists) {
          return null;
        }
        return { id: querySnapshot.id, ...querySnapshot.data() } as ISubscriber;
      });
    // If exisiting subscriber does not exist
    if (existingSubscriber) {
      // Add subscriber and then send verification email
      const result = await db
        .collection('unsubscribers')
        .add({
          firstName: existingSubscriber.firstName,
          email: existingSubscriber.email,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          verified: false,
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          return db.collection('subscribers').doc(userId).delete();
        })
        .then(() => {
          return {
            error: false,
            message: 'Sorry to see you go.',
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
