import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NewsArticle } from '../../entities/news/types';
import { NewsFeedScreen } from '../../pages/news-feed/NewsFeedScreen';
import { NewsDetailScreen } from '../../pages/news-detail/NewsDetailScreen';

export type RootStackParamList = {
  NewsFeed: undefined;
  NewsDetail: { article: NewsArticle };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NewsFeed"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="NewsFeed" 
          component={NewsFeedScreen}
        />
        <Stack.Screen 
          name="NewsDetail" 
          component={NewsDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
