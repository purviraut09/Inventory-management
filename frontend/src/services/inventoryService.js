import api from './api';

export const getInventory = async () => {
  const response = await api.get('/inventory');
  return response.data;
};

export const getInventoryDetails = async () => {
  const response = await api.get('/inventory/details');
  return response.data;
};
