import http from '../http';
import connection from '../connection';

export const getOrder = async (id) => {
  return new Promise(async (resolve) => {
    const [response, error] = await http.orders.getOrder(id);
    if (error) return [undefined, error];
    resolve([response, undefined]);
  });
};

export const fetchOrders = async (metadataQuery) => {
  return new Promise(async (resolve) => {
    const [response, error] = await http.orders.fetchOrders();
    if (error) return [undefined, error];

    let { orders } = response;

    if (metadataQuery) {
      const [key, value] = Object.entries(metadataQuery)[0];
      orders = orders.filter((order) => order.metadata?.[key] === value);
    }

    resolve([orders, undefined]);
  });
};

export const createOrder = async (order) => {
  return new Promise(async (resolve) => {
    if (!order?.userId) return resolve(undefined);
    const { orgId } = connection.getConnection();
    const { userId, name, cart } = order;
    const data = {
      name: name,
      platform: {},
      metadata: {
        _userId: userId,
      },
      cart,
      status: 'List',
      orgId,
    };

    const [response, error] = await http.orders.createOrder(data);
    if (error) return [undefined, error];

    resolve([response, undefined]);
  });
};

export const editOrder = async (id, data) => {
  return new Promise(async (resolve) => {
    if (!id || !data)
      return resolve([undefined, { message: 'Missing Order Id' }]);

    const [response, error] = await http.orders.addToOrder(id, data);
    if (error) return [undefined, error];

    resolve([response, undefined]);
  });
};
