import http from '../http';
import FormData from 'form-data';
import { dataURItoBlob } from '../utils';

export const saveSnapshot = (data, filename) =>
  new Promise(async (resolve) => {
    let message;
    if (!data) message = 'Requires Data';
    if (message) return [undefined, { message }];
    const fd = new FormData();

    const blob = typeof data === 'string' ? dataURItoBlob(data) : data;

    const file = new File([blob], filename);
    fd.append('files', file, filename);

    const [fileResponse, error] = await http.server.postSnapshot(fd);
    if (error) resolve([undefined, error]);
    resolve([fileResponse, undefined]);
  });

export const shareEmail = (data) =>
  new Promise(async (resolve) => {
    let message;
    if (!data) message = 'Requires Data';
    if (message) return [undefined, { message }];

    const [response, error] = await http.server.postShareEmail(data);
    if (error) resolve([undefined, error]);
    resolve([response, undefined]);
  });

export const shareSms = (data) =>
  new Promise(async (resolve) => {
    let message;
    if (!data) message = 'Requires Data';
    if (message) return [undefined, { message }];

    const [response, error] = await http.server.postShareSms(data);
    if (error) resolve([undefined, error]);
    resolve([response, undefined]);
  });
