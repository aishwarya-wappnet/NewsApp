import { toast } from 'sonner';
import ApiClient from '../api/ApiClient';
import { NewsArticle } from '../pages/home/types';

export const fetchNews = async () => {
  try {
    const response = await ApiClient.get('/articles');
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error('Error fetching articles');
  }
};

export const fetchRandomNews = async () => {
  const index = Math.floor(Math.random() * 35);
  try {
    const response = await ApiClient.get('/science');
    return response?.data?.articles[index];
  } catch (error) {
    console.log(error);
    toast.error('Error fetching random article');
  }
};

export const addNewArticle = async (data: NewsArticle) => {
  try {
    const response = await ApiClient.post('/articles', data);
    toast.success('Article added successfully');
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error('Error creating article');
  }
};

export const editUser = async (data: NewsArticle) => {
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
