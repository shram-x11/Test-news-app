import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  onPress: (article: NewsArticle) => void;
}

const { width } = Dimensions.get('window');

const Card = styled.View`
  background-color: white;
  margin: 8px 16px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const ImageContainer = styled.View`
  height: 200px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
`;

const NewsImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const PlaceholderImage = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
`;

const PlaceholderText = styled.Text`
  color: #999;
  font-size: 16px;
`;

const ContentContainer = styled.View`
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 8px;
  line-height: 24px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 20px;
`;

const MetaContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Source = styled.Text`
  font-size: 12px;
  color: #007aff;
  font-weight: 500;
`;

const PublishedDate = styled.Text`
  font-size: 12px;
  color: #999;
`;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Только что';
  } else if (diffInHours < 24) {
    return `${diffInHours} ч. назад`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} д. назад`;
  }
};

export const NewsCard: React.FC<NewsCardProps> = ({ article, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(article)} activeOpacity={0.7}>
      <Card>
        <ImageContainer>
          {article.urlToImage ? (
            <NewsImage 
              source={{ uri: article.urlToImage }} 
              resizeMode="cover"
            />
          ) : (
            <PlaceholderImage>
              <PlaceholderText>Нет изображения</PlaceholderText>
            </PlaceholderImage>
          )}
        </ImageContainer>
        
        <ContentContainer>
          <Title numberOfLines={2}>{article.title}</Title>
          
          {article.description && (
            <Description numberOfLines={3}>{article.description}</Description>
          )}
          
          <MetaContainer>
            <Source>{article.source.name}</Source>
            <PublishedDate>{formatDate(article.publishedAt)}</PublishedDate>
          </MetaContainer>
        </ContentContainer>
      </Card>
    </TouchableOpacity>
  );
};
