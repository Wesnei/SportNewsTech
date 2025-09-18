import api from './api';
import type { ArticleFormData, Article } from '../types';

export const createArticle = async (articleData: ArticleFormData) => {
  const response = await api.post('/articles', articleData);
  return response.data;
};

export const getArticles = async (filters?: { authorId?: string; categoryId?: string; search?: string; page?: number; limit?: number }): Promise<{ articles: Article[]; totalArticles: number; page: number; limit: number }> => {
  const response = await api.get('/articles', { params: filters });
  return response.data;
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const response = await api.get(`/articles/slug/${slug}`);
  return response.data;
};

export const updateArticle = async (id: string, articleData: Partial<ArticleFormData>) => {
  const response = await api.put(`/articles/${id}`, articleData);
  return response.data;
};

export const deleteArticle = async (id: string) => {
  const response = await api.delete(`/articles/${id}`);
  return response.data;
};
