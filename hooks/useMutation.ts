import { useState, useCallback } from 'react';
import { fetcher } from '../lib/apiUtils';

export default function useMutation<P, Q>(
  url: string,
  // eslint-disable-next-line no-unused-vars
  callback?: (resp: Q) => void
) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Q | {}>({});

  const mutate = useCallback(
    (req: P) => {
      setLoading(true);
      return fetcher<P, Q>(url, req)
        .then((resp) => {
          // debug only
          console.log('Response:', JSON.stringify(resp));
          setResponse(resp);
          setLoading(false);
          if (callback) {
            callback(resp);
          }
          return resp;
        })
        .catch((err) => {
          console.error('Error in mutation:', err);
          setResponse(err);
          setLoading(false);
          if (callback) {
            callback(err);
          }
        });
    },
    [callback, url]
  );

  return { response, loading, mutate };
}
