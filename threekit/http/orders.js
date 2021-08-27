import { threekitRequest } from './request';

const ORDERS_API_ROUTE = '/api/orders';

export const createOrder = (data) => {
  let error;
  if (!data) error = 'Requires Order Data';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    method: 'POST',
    url: ORDERS_API_ROUTE,
    data,
  });
};

export const addToOrder = (id, data) => {
  let error;
  if (!data) error = 'Requires Order Data';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    method: 'PUT',
    url: `${ORDERS_API_ROUTE}/${id}`,
    data,
  });
};

export const getOrder = (id) => {
  return threekitRequest({
    method: 'GET',
    url: `${ORDERS_API_ROUTE}/${id}`,
  });
};

export const fetchOrders = () => {
  return threekitRequest({
    method: 'GET',
    url: ORDERS_API_ROUTE,
    includeOrgId: true,
  });
};

export const editOrder = (id, data) => {
  let error;
  if (!id) error = 'Requires an order ID / shortId';
  if (!data) error = 'Requires updated cart data';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    method: 'PUT',
    url: ORDERS_API_ROUTE,
    params: query,
  });
};

export const deleteOrder = (id, data) => {
  let error;
  if (!id) error = 'Requires an order ID / shortId';
  if (!data) error = 'Requires updated cart data';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    method: 'PUT',
    url: ORDERS_API_ROUTE,
    params: query,
  });
};
