import styles from './newsletter.module.css';
import { UilFastMail } from '@iconscout/react-unicons';

export default function NewsLetter() {
  return (
    <>
      <div>
        <h3 className={styles.header}>
          Subscribe to the newsletter&nbsp;
          <UilFastMail size={30} />
        </h3>
        <div className={styles.input_box}>
          <input type="text" id="name-input" placeholder="First Name" />
        </div>
        <div className={styles.input_box}>
          <input type="email" id="email-input" placeholder="Email" />
        </div>
        <div className={styles.input_box}>
          <input type="submit" value="Subscribe" />
        </div>
      </div>
    </>
  );
}
