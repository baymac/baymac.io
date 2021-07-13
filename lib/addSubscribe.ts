import firebase from '../firebase/clientApp';

type AddSubscriber = {
  firstName: string;
  email: string;
};

export default function addSubscriber({ firstName, email }: AddSubscriber) {
  const db = firebase.firestore();
  try {
    db.collection('subscribers')
      .add({
        firstName: firstName,
        email: email,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then((docRef) => {
        // eslint-disable-next-line no-console
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error adding document: ', error);
      });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Some error occured: ' + e.message);
  }
}
