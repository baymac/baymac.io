import firebase from '../firebase/clientApp';

export default function doesSubscriberExists(email: string): Promise<boolean> {
  const db = firebase.firestore();
  return db
    .collection('subscribers')
    .where('email', '==', email)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        return false;
      }
      return true;
    });
}
