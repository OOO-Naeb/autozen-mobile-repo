import {axios8087} from './axiosInstance';

export const getUserOrders = async userId => {
  const res = await axios8087.get(`/orders/user/${userId}`);
  return res.data;
};

export const createOrder = async order => {
  const res = await axios8087.post('/orders', order);
  return res.data;
};
