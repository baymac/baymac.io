import { yupResolver } from '@hookform/resolvers/yup';
import { UilFastMail } from '@iconscout/react-unicons';
import { createElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import addSubscriber from '../../lib/addSubscribe';
import Snackbar from '../Snackbar/Snackbar';
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
  } = useForm({
    resolver: yupResolver(SubscribeSchema),
  });

  const [submitted, setSubmitted] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [showSnackbar, setShowSnackbar] = useState(false);

  const onSubmit = async (data) => {
    const res = await addSubscriber(data);
    if (!res.error) {
      setSubmitted(true);
    }
    setSnackbarMessage(res.message);
    setShowSnackbar(true);
  };

  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          if (submitted) {
            setSubmitted(false);
            reset();
          }
        }}
      >
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
              <div className={styles.input_box}>
                <input type="submit" value="Subscribe" />
              </div>
            </form>
          </div>
        )}
        {submitted && (
          <h3 className={styles.thanks_message}>
            Thank you for subscribing 🥰
          </h3>
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
            duration: 1500,
          },
          null
        )}
    </>
  );
}
