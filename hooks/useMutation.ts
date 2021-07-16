import { useState, useCallback } from 'react';
import { fetcher } from '../lib/apiUtils';

export default function useMutation<T>(
  url: string,
  // eslint-disable-next-line no-unused-vars
  callback: (resp: T) => void
) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  const mutate = useCallback(
    (req: T) => {
      setLoading(true);
      return fetcher(url, req).then((resp) => {
        setResponse(resp);
        setLoading(false);
        callback(resp);
        return resp;
      });
    },
    [callback, url]
  );

  return { response, loading, mutate };
}
