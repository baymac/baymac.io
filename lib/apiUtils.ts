export interface IGenericAPIResponse {
  error: boolean;
  message: string;
}

export const fetcher = (
  url: string,
  data?: Object,
  method: 'POST' | 'GET' = 'POST'
) =>
  fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    ...(data && { body: JSON.stringify(data) }),
  }).then((r) => r.json());
