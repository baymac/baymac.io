export interface IGenericAPIResponse {
  error: boolean;
  message: string;
}

export const fetcher = <P, Q>(
  url: string,
  data?: P,
  method: 'POST' | 'GET' = 'POST'
): Promise<Q> =>
  fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    ...(data && { body: JSON.stringify(data) }),
  }).then((r) => r.json());

export const sleep = (duration: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ error: false, message: `Slept for ${duration}` });
    }, duration);
  });
