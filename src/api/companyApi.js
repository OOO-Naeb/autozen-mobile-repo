import {axios8086} from './axiosInstance';

export const getCompanyById = async id => {
  const res = await axios8086.get(`/company/${id}`);
  return res.data;
};

export const getAllCompanies = async () => {
  const res = await axios8086.get('/company');
  return res.data;
};
