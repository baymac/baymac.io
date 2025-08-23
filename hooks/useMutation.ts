import { useCallback, useState } from 'react';

export function useMutation<TData, TVariables>(
  mutationFn: (data: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
  }
) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<TData | null>(null);

  const mutate = useCallback(
    async (data: TVariables) => {
      try {
        setLoading(true);
        const result = await mutationFn(data);
        setResponse(result);
        options?.onSuccess?.(result);
        return result;
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error(String(error));
        options?.onError?.(errorObj);
        throw errorObj;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn, options]
  );

  return { mutate, loading, response };
}
