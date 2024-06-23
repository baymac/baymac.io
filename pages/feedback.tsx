import RootLayout from '../layouts/RootLayout';
import rootStyles from '../styles/root.module.css';
import cn from 'classnames';
import FeedbackForm from '../components/FeedbackForm/FeedbackForm';
import feedbackStyles from '../styles/pageStyles/feedback.module.css';

export default function feedback() {
  return (
    <RootLayout>
      <section className={rootStyles.section}>
        <div
          className={cn(
            rootStyles.container,
            rootStyles.grid,
            feedbackStyles.container
          )}
        >
          <FeedbackForm />
        </div>
      </section>
    </RootLayout>
  );
}
