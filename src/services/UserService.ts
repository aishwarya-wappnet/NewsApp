import { toast } from 'sonner';
import { v4 as uuid4 } from 'uuid';
import ApiClient from '../api/ApiClient';

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  token?: string;
}

export const fetchUsers = async () => {
  try {
    const response = await ApiClient.get('/users');
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error('Error fetching users');
  }
};

export const addUser = async (data: User) => {
  try {
    const response = await ApiClient.post('/users', { id: uuid4(), ...data });
    toast.success('User added successfully');
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error('Error creating user');
  }
};

export const editUser = async (data: User) => {
  try {
    const url = `/users/${data?.id}`;
    const response = await ApiClient.put(url, data);
    toast.success('User updated successfully');
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error('Error updating user');
  }
};

export const deleteUser = async (id: string) => {
  try {
    const url = `/users/${id}`;
    const response = await ApiClient.delete(url);
    toast.success('User deleted successfully');
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error('Error deleting user');
  }
};
