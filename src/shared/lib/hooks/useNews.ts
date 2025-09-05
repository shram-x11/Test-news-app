import { useState, useCallback, useRef } from 'react';
import { NewsSearchParams, NewsState } from '../../../entities/news/types';
import { fetchTopHeadlines, searchNews } from '../../api/newsApi';

export const useNews = () => {
  const [state, setState] = useState<NewsState>({
    articles: [],
    loading: false,
    error: null,
    hasMore: true,
    currentPage: 1,
    totalResults: 0,
  });

  const loadingRef = useRef(false);

  const loadNews = useCallback(
    async (params: NewsSearchParams = {}, reset: boolean = false) => {
      if (loadingRef.current) return;
      
      loadingRef.current = true;
      
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        let currentPage = 1;
        setState(prev => {
          currentPage = reset ? 1 : prev.currentPage;
          return prev;
        });

        const searchParams = { ...params, page: currentPage };

        console.log('Loading page:', currentPage, 'params:', searchParams);

        const response = params.q
          ? await searchNews(searchParams)
          : await fetchTopHeadlines(searchParams);

        setState(prev => ({
          ...prev,
          articles: reset
            ? response.articles
            : [...prev.articles, ...response.articles],
          loading: false,
          hasMore:
            response.articles.length === (params.pageSize || 10) &&
            (reset
              ? response.articles.length
              : prev.articles.length + response.articles.length) <
              response.totalResults,
          currentPage: currentPage + 1,
          totalResults: response.totalResults,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Произошла ошибка при загрузке новостей',
        }));
      } finally {
        loadingRef.current = false;
      }
    },
    [],
  );

  const loadMore = useCallback(
    (params: NewsSearchParams = {}) => {
      console.log('load more', loadingRef.current, state.hasMore)
      if (!loadingRef.current && state.hasMore) {
        loadNews(params, false);
      }
    },
    [loadNews, state.hasMore],
  );

  const refresh = useCallback(
    (params: NewsSearchParams = {}) => {
      setState(prev => ({ ...prev, currentPage: 1 }));
      loadNews(params, true);
    },
    [loadNews],
  );

  return {
    ...state,
    loadNews,
    loadMore,
    refresh,
  };
};
