import React, { useState } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 16px;
  background-color: #f2f2f7;
  border-radius: 10px;
  padding: 8px 12px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #1d1d1f;
  padding: 8px 0;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 8px 16px;
  border-radius: 8px;
  margin-left: 8px;
`;

const SearchButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Поиск новостей..." 
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Container>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor="#999"
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <SearchButton onPress={handleSearch}>
        <SearchButtonText>Поиск</SearchButtonText>
      </SearchButton>
    </Container>
  );
};
