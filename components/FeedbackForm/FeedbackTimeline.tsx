import { useEffect, useState } from 'react';
import { fetcher } from '../../lib/apiUtils';

export interface IFeedbackResponse {
  email: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export default function FeedbackTimeline() {
  const [next, setNext] = useState(true);
  const [feedbacks, setFeedbacks] = useState<Array<IFeedbackResponse>>([]);

  useEffect(() => {
    if (next) {
      fetcher<{}, any>('/api/feedback/feedbacks?p=0').then((res) => {
        setFeedbacks((prev) => prev.concat(res.feedbacks)), setNext(false);
      });
    }
  }, [next]);

  return (
    <>
      {feedbacks.map((feedback) => (
        <div key={feedback.id}>{feedback.content}</div>
      ))}
    </>
  );
}
