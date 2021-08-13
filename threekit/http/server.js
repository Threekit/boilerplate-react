import { serverRequest } from './request';

const SERVER_API_ROUTE = '/api';

export const postSnapshot = (data) => {
  let error;
  if (!data) error = 'Requires Form Data';
  if (error) return [undefined, { message: error }];
  return serverRequest({
    method: 'POST',
    url: `${SERVER_API_ROUTE}/snapshot`,
    data,
  });
};

export const postEmailShare = (data) => {
  let error;
  if (!data) error = 'Requires Email Data';
  if (error) return [undefined, { message: error }];
  return serverRequest({
    method: 'POST',
    url: `${SERVER_API_ROUTE}/email`,
    data,
  });
};
