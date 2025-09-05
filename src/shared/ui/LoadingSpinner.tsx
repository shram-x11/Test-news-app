import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'large', 
  color = '#007AFF' 
}) => {
  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
    </Container>
  );
};
