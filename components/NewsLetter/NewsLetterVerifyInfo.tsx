import styles from './newsletter.module.css';
import cn from 'classnames';
import useMutation from '../../hooks/useMutation';
import {
  IResendVerificationRequest,
  IResendVerificationResponse,
} from '../../lib/subscription/resendVerificationEmail';
import { Dispatch, SetStateAction } from 'react';
import constants from '../../lib/constants';
import LinkButton from '../LinkButton/LinkButton';

interface INewsLetterVerifyInfoProps {
  handleReset: () => void;
  email: string;
  // eslint-disable-next-line no-unused-vars
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
  setShowSnackbar: Dispatch<SetStateAction<boolean>>;
}

export default function NewsLetterVerifyInfo(
  props: INewsLetterVerifyInfoProps
) {
  const { loading, mutate } = useMutation<
    IResendVerificationRequest,
    IResendVerificationResponse
  >(constants.newsletterVerifyApiRoute, (res) => {
    props.setSnackbarMessage(res.message);
    props.setShowSnackbar(true);
  });

  const handleResendEmail = () => {
    mutate({ email: props.email });
  };

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
      {props.email && (
        <LinkButton onClick={handleResendEmail} disabled={loading}>
          Resend Verification Email
        </LinkButton>
      )}
    </>
  );
}
