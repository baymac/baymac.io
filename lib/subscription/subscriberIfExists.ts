import firebase from '../../firebase/clientApp';
import { ISubscriber } from '../apiUtils';

export default function subscriberIfExists(
  email: string
): Promise<ISubscriber | null> {
  const db = firebase.firestore();
  return db
    .collection('subscribers')
    .where('email', '==', email)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        return null;
      }
      return {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data(),
      } as ISubscriber;
    });
}
