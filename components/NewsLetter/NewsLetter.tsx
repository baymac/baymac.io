import { yupResolver } from '@hookform/resolvers/yup';
import { UilFastMail } from '@iconscout/react-unicons';
import { createElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useMutation from '../../hooks/useMutation';
import { IGenericAPIResponse } from '../../lib/apiUtils';
import Snackbar from '../Snackbar/Snackbar';
import cn from 'classnames';
import styles from './newsletter.module.css';

const SubscribeSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+$/,
      'First Name can only contain characters.'
    ),
  email: yup.string().email().required('Email is required'),
});

export default function NewsLetter() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(SubscribeSchema),
  });

  const [submitted, setSubmitted] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [showSnackbar, setShowSnackbar] = useState(false);

  const { loading, mutate } = useMutation<IGenericAPIResponse>(
    '/api/addSubscriber',
    (res) => {
      if (!res.error) {
        setSubmitted(true);
      }
      setSnackbarMessage(res.message);
      setShowSnackbar(true);
    }
  );

  const onSubmit = (data) => {
    mutate(data);
  };

  const handleReset = () => {
    setSubmitted(false);
    reset();
  };

  return (
    <>
      <div className={styles.container}>
        {!submitted && (
          <div>
            <h3 className={styles.header}>
              Subscribe to the newsletter
              <br className={styles.add_new_line} />
              <UilFastMail size={30} className={styles.email_icon} />
            </h3>
            <p className={styles.description}>
              I will share about cool things I&apos;m working on, favourite
              articles I&apos;ve read and new articles I publish.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.input_box}>
                <input
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className={styles.error_message}>
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className={styles.input_box}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className={styles.error_message}>{errors.email.message}</p>
                )}
              </div>
              <div
                className={cn(styles.input_box, {
                  [styles.button_disable]: loading,
                })}
              >
                <input
                  type="submit"
                  disabled={loading}
                  value={loading ? 'loading' : 'Subscribe'}
                />
              </div>
            </form>
          </div>
        )}
        {submitted && (
          <>
            <p
              onClick={() => {
                handleReset();
              }}
              className={cn(styles.go_back, styles.clickable)}
            >
              &#8592; Go Back
            </p>
            <h3 className={styles.thanks_message}>Check your email 📧</h3>
            <br></br>
            <p className={styles.email_failure_description}>
              I&apos;ve sent a message to <b>{getValues().email}</b> with a link
              to verify your email.
            </p>
            <br></br>
            <p className={styles.email_failure_description}>
              Didn’t get an email? If you don’t see an email within a few
              minutes, a few things could have happened:
            </p>
            <br></br>
            <ul className={styles.email_failure_list}>
              <li>The email is in your spam folder.</li>
              <li>The email address you entered had a typo.</li>
              <li>
                Sometimes email doesn&apos;t get delivered. Try Resending.
              </li>
            </ul>
          </>
        )}
      </div>
      {showSnackbar &&
        createElement(
          Snackbar,
          {
            message: snackbarMessage,
            show: showSnackbar,
            // @ts-ignore
            reset: setShowSnackbar,
            duration: 5000,
          },
          null
        )}
    </>
  );
}
