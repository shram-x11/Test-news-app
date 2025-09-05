import React from 'react';
import { SafeAreaView, Linking, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { NewsArticle } from '../../entities/news/types';

type RootStackParamList = {
  NewsFeed: undefined;
  NewsDetail: { article: NewsArticle };
};

type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;
type NewsDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewsDetail'>;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e7;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
  margin-right: 8px;
`;

const BackButtonText = styled.Text`
  font-size: 16px;
  color: #007aff;
  font-weight: 600;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  flex: 1;
`;

const BrowserButton = styled.TouchableOpacity`
  padding: 8px;
  margin-left: 8px;
`;

const BrowserButtonText = styled.Text`
  font-size: 14px;
  color: #007aff;
  font-weight: 500;
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const ImageContainer = styled.View`
  height: 250px;
  background-color: #f0f0f0;
`;

const NewsImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const PlaceholderImage = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const PlaceholderText = styled.Text`
  color: #999;
  font-size: 16px;
`;

const ArticleContent = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #1d1d1f;
  line-height: 32px;
  margin-bottom: 16px;
`;

const MetaInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e7;
`;

const Source = styled.Text`
  font-size: 14px;
  color: #007aff;
  font-weight: 600;
`;

const Author = styled.Text`
  font-size: 14px;
  color: #666;
`;

const PublishedDate = styled.Text`
  font-size: 12px;
  color: #999;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #1d1d1f;
  line-height: 24px;
  margin-bottom: 16px;
`;

const ArticleText = styled.Text`
  font-size: 16px;
  color: #1d1d1f;
  line-height: 24px;
`;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const NewsDetailScreen: React.FC = () => {
  const navigation = useNavigation<NewsDetailScreenNavigationProp>();
  const route = useRoute<NewsDetailScreenRouteProp>();
  const { article } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleOpenInBrowser = async () => {
    try {
      const supported = await Linking.canOpenURL(article.url);
      if (supported) {
        await Linking.openURL(article.url);
      } else {
        Alert.alert('Ошибка', 'Не удается открыть ссылку');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удается открыть ссылку');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBackPress}>
          <BackButtonText>← Назад</BackButtonText>
        </BackButton>
        <HeaderTitle numberOfLines={1}>Новость</HeaderTitle>
        <BrowserButton onPress={handleOpenInBrowser}>
          <BrowserButtonText>Открыть</BrowserButtonText>
        </BrowserButton>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
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

        <ArticleContent>
          <Title>{article.title}</Title>
          
          <MetaInfo>
            <Source>{article.source.name}</Source>
            <PublishedDate>{formatDate(article.publishedAt)}</PublishedDate>
          </MetaInfo>

          {article.author && (
            <Author>Автор: {article.author}</Author>
          )}

          {article.description && (
            <Description>{article.description}</Description>
          )}

          {article.content && (
            <ArticleText>
              {article.content.replace('[+', '').replace(/\[.*?\]$/, '')}
            </ArticleText>
          )}
        </ArticleContent>
      </Content>
    </Container>
  );
};
