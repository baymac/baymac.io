import styles from './newsletter.module.css';
import cn from 'classnames';

interface INewsLetterVerifyInfoProps {
  handleReset: () => void;
  email: string;
}

export default function NewsLetterVerifyInfo(
  props: INewsLetterVerifyInfoProps
) {
  return (
    <>
      <p
        onClick={() => {
          props.handleReset();
        }}
        className={cn(styles.go_back, styles.clickable)}
      >
        &#8592; Go Back
      </p>
      <h3 className={styles.thanks_message}>Check your email 📧</h3>
      <br></br>
      <p className={styles.email_failure_description}>
        I&apos;ve sent a message to <b>{props.email}</b> with a link to verify
        your email.
      </p>
      <br></br>
      <p className={styles.email_failure_description}>
        Didn’t get an email? If you don’t see an email within a few minutes, a
        few things could have happened:
      </p>
      <br></br>
      <ul className={styles.email_failure_list}>
        <li>The email is in your spam folder.</li>
        <li>The email address you entered had a typo.</li>
        <li>Sometimes email doesn&apos;t get delivered. Try Resending.</li>
      </ul>
    </>
  );
}
