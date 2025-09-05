import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { NewsResponse, NewsSearchParams } from '../../entities/news/types';

const newsApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'X-API-Key': API_CONFIG.API_KEY,
  },
});

export const fetchTopHeadlines = async (params: NewsSearchParams = {}): Promise<NewsResponse> => {
  const response = await newsApi.get(API_CONFIG.ENDPOINTS.TOP_HEADLINES, {
    params: {
      ...API_CONFIG.DEFAULT_PARAMS,
      ...params,
    },
  });
  return response.data;
};

export const searchNews = async (params: NewsSearchParams): Promise<NewsResponse> => {
  const response = await newsApi.get(API_CONFIG.ENDPOINTS.EVERYTHING, {
    params: {
      ...params,
      pageSize: params.pageSize || API_CONFIG.DEFAULT_PARAMS.pageSize,
    },
  });
  return response.data;
};

export { newsApi };
