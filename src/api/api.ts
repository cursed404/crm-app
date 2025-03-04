import axios from 'axios';

const API_BASE_URL = 'http://185.244.172.108:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface RowData {
  id?: string;
  parentId: string | null;
  title: string;
  value?: number;
}

export const createEntity = async (): Promise<string> => {
  const response = await api.post('/v1/outlay-rows/entity/create');
  return response.data.eID;
};

export const getRows = async (eID: string): Promise<RowData[]> => {
  const response = await api.get(`/v1/outlay-rows/entity/${eID}/row/list`);
  return response.data;
};

export const createRow = async (eID: string, row: RowData): Promise<RowData[]> => {
  const response = await api.post(`/v1/outlay-rows/entity/${eID}/row/create`, row);
  return response.data; // сервер возвращает массив изменённых строк
};

export const updateRow = async (eID: string, rowId: string, row: RowData): Promise<RowData[]> => {
  const response = await api.put(`/v1/outlay-rows/entity/${eID}/row/${rowId}/update`, row);
  return response.data;
};

export const deleteRow = async (eID: string, rowId: string): Promise<RowData[]> => {
  const response = await api.delete(`/v1/outlay-rows/entity/${eID}/row/${rowId}/delete`);
  return response.data;
};
