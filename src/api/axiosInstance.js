import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axios8086 = axios.create({
  baseURL: 'http://172.20.10.2:8086/api/v1',
});

const axios8087 = axios.create({
  baseURL: 'http://172.20.10.2:8087/api/v1',
});

const attachToken = async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

axios8086.interceptors.request.use(attachToken);
axios8087.interceptors.request.use(attachToken);

export {axios8086, axios8087};
