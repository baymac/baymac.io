import firebase from '../../firebase/clientApp';
import { IGenericAPIResponse, ISubscriber } from '../apiUtils';

export interface IUpdateSubscriberRequest {
  firstName: string;
  userId: string;
}

export interface IUpdateSubscriberResponse extends IGenericAPIResponse {}

export default async function addSubscriber({
  userId,
  firstName,
}: IUpdateSubscriberRequest): Promise<IUpdateSubscriberResponse> {
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
        .collection('subscribers')
        .doc(userId)
        .update({
          firstName: firstName,
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          return {
            error: false,
            message: 'Your first name has been updated.',
          };
        })
        .catch((error) => {
          return {
            error: true,
            message: 'Subscriber could not be updated. ' + error.message,
          };
        });
      return result;
    } else {
      return {
        error: true,
        message: "Subscriber doesn't exists.",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: 'Some error occurred: ' + error.message,
    };
  }
}
