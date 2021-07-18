import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { createElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ButtonLoading from '../../components/ButtonLoading/ButtonLoading';
import Snackbar from '../../components/Snackbar/Snackbar';
import useMutation from '../../hooks/useMutation';
import constants from '../../lib/constants';
import {
  IUpdateSubscriberRequest,
  IUpdateSubscriberResponse,
} from '../../lib/subscription/updateSubscriber';
import styles from '../../styles/pageStyles/updatenewsletter.module.css';

export async function getServerSideProps(context) {
  if (!context.query.u) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      error: false,
      userId: context.query.u,
    },
  };
}

export interface IUpdateSubscriberFieldValues {
  firstName: string;
}

const UpdateSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+$/,
      'First Name can only contain characters without space'
    ),
});

export default function Update(props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IUpdateSubscriberFieldValues>({
    resolver: yupResolver(UpdateSchema),
  });

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [showSnackbar, setShowSnackbar] = useState(false);

  const { mutate, loading } = useMutation<
    IUpdateSubscriberRequest,
    IUpdateSubscriberResponse
  >(constants.newsletterUpdateApiRoute, (res) => {
    if (!res.error) {
      reset();
    }
    setSnackbarMessage(res.message);
    setShowSnackbar(true);
  });

  const updateFirstName = (data: IUpdateSubscriberFieldValues) => {
    mutate({ userId: props.userId, ...data });
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(updateFirstName)}>
          <div className={styles.input_box}>
            <input
              name="firstname"
              type="text"
              placeholder="First Name"
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className={styles.error_message}>{errors.firstName.message}</p>
            )}
          </div>
          <div
            className={cn(styles.input_box, {
              [styles.button_disable]: loading,
            })}
          >
            <button type="submit" disabled={loading}>
              {loading ? <ButtonLoading /> : 'Update'}
            </button>
          </div>
        </form>
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
