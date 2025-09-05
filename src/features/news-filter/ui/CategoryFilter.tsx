import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { API_CONFIG, NewsCategory } from '../../../shared/config/api';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const Container = styled.View`
  margin: 8px 0;
`;

const FilterItem = styled.TouchableOpacity<{ isSelected: boolean }>`
  background-color: ${props => props.isSelected ? '#007aff' : '#f2f2f7'};
  padding: 8px 16px;
  border-radius: 20px;
  margin: 0 8px;
`;

const FilterText = styled.Text<{ isSelected: boolean }>`
  color: ${props => props.isSelected ? 'white' : '#1d1d1f'};
  font-size: 14px;
  font-weight: 500;
`;

const categoryLabels: Record<string, string> = {
  business: 'Бизнес',
  entertainment: 'Развлечения',
  health: 'Здоровье',
  science: 'Наука',
  sports: 'Спорт',
  technology: 'Технологии',
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <Container>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        <FilterItem
          isSelected={selectedCategory === null}
          onPress={() => onCategorySelect(null)}
        >
          <FilterText isSelected={selectedCategory === null}>
            Все
          </FilterText>
        </FilterItem>
        
        {API_CONFIG.CATEGORIES.map((category) => (
          <FilterItem
            key={category}
            isSelected={selectedCategory === category}
            onPress={() => onCategorySelect(category)}
          >
            <FilterText isSelected={selectedCategory === category}>
              {categoryLabels[category]}
            </FilterText>
          </FilterItem>
        ))}
      </ScrollView>
    </Container>
  );
};
