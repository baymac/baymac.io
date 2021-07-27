import { yupResolver } from '@hookform/resolvers/yup';
import { UilFastMail } from '@iconscout/react-unicons';
import { createElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useMutation from '../../hooks/useMutation';
import Snackbar from '../Snackbar/Snackbar';
import cn from 'classnames';
import styles from './newsletter.module.css';
import {
  IAddSubscriberRequest,
  IAddSubscriberResponse,
} from '../../lib/subscription/addSubscriber';
import ButtonLoading from '../ButtonLoading/ButtonLoading';
import NewsLetterVerifyInfo from './NewsLetterVerifyInfo';
import constants from '../../lib/constants';
import * as Sentry from '@sentry/nextjs';

const SubscribeSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+$/,
      'First Name can only contain characters without space'
    ),
  email: yup.string().email().required('Email is required'),
});

function isErrorTimeOut(err): boolean {
  if (err.error?.code === '504') {
    Sentry.captureException(err);
    return true;
  }
  return false;
}

export default function NewsLetter() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IAddSubscriberRequest>({
    resolver: yupResolver(SubscribeSchema),
  });

  const [formSuccess, setFormSuccess] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [showSnackbar, setShowSnackbar] = useState(false);

  const { mutate, loading } = useMutation<
    IAddSubscriberRequest,
    IAddSubscriberResponse
  >(constants.newsletterSubscribeApiRoute, (res) => {
    if (!res.error || !isErrorTimeOut(res.error)) {
      setFormSuccess(true);
    }
    // A hack to circumvent around function timeout as only 10s allowed for hobbyists, we will just assume that email is delivered if function times out.
    setSnackbarMessage(
      !isErrorTimeOut(res.error)
        ? res.message
        : 'Please check your email to confirm your subscription.'
    );
    setShowSnackbar(true);
  });

  const onSubmit = (data: IAddSubscriberRequest) => {
    mutate(data);
  };

  const handleReset = () => {
    setFormSuccess(false);
    reset();
  };

  return (
    <>
      <div className={styles.container}>
        {!formSuccess && (
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
                <button type="submit" disabled={loading}>
                  {loading ? <ButtonLoading /> : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        )}
        {formSuccess && (
          <NewsLetterVerifyInfo
            email={getValues().email}
            handleReset={handleReset}
            setSnackbarMessage={setSnackbarMessage}
            setShowSnackbar={setShowSnackbar}
          />
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
