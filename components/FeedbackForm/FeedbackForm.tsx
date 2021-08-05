import cn from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ButtonLoading from '../ButtonLoading/ButtonLoading';
import styles from './feedbackform.module.css';
import useMutation from '../../hooks/useMutation';
import { IAddFeedbackResponse } from '../../lib/feedback/add';
import constants from '../../lib/constants';
import FeedbackTimeline from './FeedbackTimeline';

const AddFeedbackSchema = yup.object().shape({
  content: yup
    .string()
    .required('Add some feedback')
    .min(100, 'Add atleast 100 characters'),
});

export interface IAddFeedbackFieldValues {
  content: string;
}

export default function FeedbackForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    // reset,
  } = useForm<IAddFeedbackFieldValues>({
    resolver: yupResolver(AddFeedbackSchema),
  });

  const { loading, mutate } = useMutation<
    IAddFeedbackFieldValues,
    IAddFeedbackResponse
  >(constants.feedbackAddApiRoute, (res) => {
    // eslint-disable-next-line no-console
    console.log(res);
  });

  const addFeedback = (data: IAddFeedbackFieldValues) => {
    mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(addFeedback)} className={styles.form_styles}>
        <div className={styles.input_box}>
          <input
            name="content"
            type="text"
            placeholder="Feedback"
            {...register('content')}
          />
          {errors.content && (
            <p className={styles.error_message}>{errors.content.message}</p>
          )}
        </div>
        <div
          className={cn(styles.input_box, {
            [styles.button_disable]: loading,
          })}
        >
          <button type="submit" disabled={loading}>
            {loading ? <ButtonLoading /> : 'Add Feedback'}
          </button>
        </div>
      </form>
      <FeedbackTimeline />
    </>
  );
}
