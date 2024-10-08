import { toast } from "sonner";
import ApiClient from "../api/ApiClient";
import { NewsArticle } from "../pages/home/types";

export const fetchNews = async () => {
  try {
    const response = await ApiClient.get("/articles");
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error("Error fetching articles");
  }
};

export const fetchRandomNews = async () => {
  const index = Math.floor(Math.random() * 35);
  try {
    const response = await ApiClient.get("/science");
    return response?.data?.articles[index];
  } catch (error) {
    console.log(error);
    toast.error("Error fetching random article");
  }
};

export const addNewsArticle = async (data: NewsArticle) => {
  try {
    const response = await ApiClient.post("/articles", data);
    toast.success("News published successfully");
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error("Error publishing news");
  }
};

export const editNewsArticle = async (data: NewsArticle) => {
  try {
    const url = `/articles/${data?.id}`;
    const response = await ApiClient.put(url, data);
    toast.success("News updated successfully");
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error("Error updating article");
  }
};

export const deleteNewsArticle = async (id: string) => {
  try {
    const url = `/articles/${id}`;
    const response = await ApiClient.delete(url);
    toast.success("News deleted successfully");
    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error("Error deleting article");
  }
};
