import axios from 'axios';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
  },

  getOne: async (id: number): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  create: async (data: CreateTodoDto): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', data);
    return response.data;
  },

  update: async (id: number, data: UpdateTodoDto): Promise<Todo> => {
    const response = await api.patch<Todo>(`/todos/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
