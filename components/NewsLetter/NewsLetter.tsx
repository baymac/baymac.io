import styles from './newsletter.module.css';
import { UilFastMail } from '@iconscout/react-unicons';

export default function NewsLetter() {
  return (
    <>
      <div>
        <h4 className={styles.header}>
          Subscribe to the newsletter
          <UilFastMail />
        </h4>
      </div>
    </>
  );
}
