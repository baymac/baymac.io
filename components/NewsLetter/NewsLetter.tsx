import styles from './newsletter.module.css';
import { UilFastMail } from '@iconscout/react-unicons';
import { useState } from 'react';

export default function NewsLetter() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  return (
    <>
      <div>
        <h3 className={styles.header}>
          Subscribe to the newsletter&nbsp;
          <UilFastMail size={30} />
        </h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await fetch('/api/hello'); // demo
          }}
        >
          <div className={styles.input_box}>
            <input
              type="text"
              id="name-input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.input_box}>
            <input
              type="email"
              id="email-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.input_box}>
            <input type="submit" value="Subscribe" />
          </div>
        </form>
      </div>
    </>
  );
}
