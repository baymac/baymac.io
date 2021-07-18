import firebase from '../../firebase/clientApp';

export default function subscriberIfExists(email: string): Promise<any> {
  const db = firebase.firestore();
  return db
    .collection('subscribers')
    .where('email', '==', email)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        return {};
      }
      return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
    });
}
