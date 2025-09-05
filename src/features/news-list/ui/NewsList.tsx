import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { NewsArticle } from '../../../entities/news/types';
import { NewsCard } from '../../../entities/news/ui/NewsCard';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';

interface NewsListProps {
  articles: NewsArticle[];
  loading: boolean;
  refreshing?: boolean;
  hasMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onArticlePress: (article: NewsArticle) => void;
}

const Container = styled.View`
  flex: 1;
  background-color: #f2f2f7;
`;

const LoadMoreContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

const EndMessage = styled.Text`
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 20px;
`;

export const NewsList: React.FC<NewsListProps> = ({
  articles,
  loading,
  refreshing = false,
  hasMore,
  onRefresh,
  onLoadMore,
  onArticlePress,
}) => {
  const renderItem = ({ item }: { item: NewsArticle }) => (
    <NewsCard article={item} onPress={onArticlePress} />
  );
  
  console.log('articles', articles, hasMore);

  const renderFooter = () => {
    if (loading && articles.length > 0) {
      return (
        <LoadMoreContainer>
          <LoadingSpinner size="small" />
        </LoadMoreContainer>
      );
    }
    
    if (!hasMore && articles.length > 0) {
      return <EndMessage>Больше новостей нет</EndMessage>;
    }
    
    return null;
  };

  const handleEndReached = () => {
    console.log('handleEndReached', hasMore, loading)
    if (hasMore && !loading) {
      onLoadMore();
    }
  };

  return (
    <Container>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};
