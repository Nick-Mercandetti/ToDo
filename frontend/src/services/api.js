import axios from 'axios';

const api = axios.create({
  baseURL: '/api/todos',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getTodo = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await api.post('/', todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await api.put(`/${id}`, todoData);
  return response.data;
};

export const deleteTodo = async (id) => {
  await api.delete(`/${id}`);
};

