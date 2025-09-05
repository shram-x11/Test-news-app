import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { NewsArticle } from '../../entities/news/types';
import { NewsList } from '../../features/news-list/ui/NewsList';
import { SearchBar } from '../../features/news-search/ui/SearchBar';
import { CategoryFilter } from '../../features/news-filter/ui/CategoryFilter';
import { LoadingSpinner } from '../../shared/ui/LoadingSpinner';
import { ErrorMessage } from '../../shared/ui/ErrorMessage';
import { useNews } from '../../shared/lib/hooks/useNews';

type RootStackParamList = {
  NewsFeed: undefined;
  NewsDetail: { article: NewsArticle };
};

type NewsFeedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewsFeed'>;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f2f2f7;
`;

const Header = styled.View`
  background-color: white;
  padding-bottom: 8px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #1d1d1f;
  text-align: center;
  padding: 16px 0 8px 0;
`;

export const NewsFeedScreen: React.FC = () => {
  const navigation = useNavigation<NewsFeedScreenNavigationProp>();
  const { articles, loading, error, hasMore, loadNews, loadMore, refresh } = useNews();
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadInitialNews = useCallback(() => {
    const params = {
      ...(searchQuery && { q: searchQuery }),
      ...(selectedCategory && { category: selectedCategory }),
    };
    loadNews(params, true);
  }, [searchQuery, selectedCategory, loadNews]);

  useEffect(() => {
    loadInitialNews();
  }, [loadInitialNews]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    const params = {
      q: query,
      ...(selectedCategory && { category: selectedCategory }),
    };
    loadNews(params, true);
  }, [selectedCategory, loadNews]);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
    const params = {
      ...(searchQuery && { q: searchQuery }),
      ...(category && { category }),
    };
    loadNews(params, true);
  }, [searchQuery, loadNews]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    const params = {
      ...(searchQuery && { q: searchQuery }),
      ...(selectedCategory && { category: selectedCategory }),
    };
    await refresh(params);
    setRefreshing(false);
  }, [searchQuery, selectedCategory, refresh]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      const params = {
        ...(searchQuery && { q: searchQuery }),
        ...(selectedCategory && { category: selectedCategory }),
      };
      loadMore(params);
    }
  }, [searchQuery, selectedCategory, loadMore, loading, hasMore]);

  const handleArticlePress = useCallback((article: NewsArticle) => {
    navigation.navigate('NewsDetail', { article });
  }, [navigation]);

  if (loading && articles.length === 0) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error && articles.length === 0) {
    return (
      <Container>
        <ErrorMessage message={error} onRetry={loadInitialNews} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Новости</Title>
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </Header>
      
      <NewsList
        articles={articles}
        loading={loading}
        refreshing={refreshing}
        hasMore={hasMore}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        onArticlePress={handleArticlePress}
      />
    </Container>
  );
};
