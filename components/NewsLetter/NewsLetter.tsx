import { UilFastMail } from '@iconscout/react-unicons';
import { useForm } from 'react-hook-form';
import styles from './newsletter.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
  } = useForm({
    resolver: yupResolver(SubscribeSchema),
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <>
      <div>
        <h3 className={styles.header}>
          Subscribe to the newsletter&nbsp;&nbsp;
          <UilFastMail size={30} />
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
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
    </>
  );
}
