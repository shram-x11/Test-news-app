import React from 'react';
import styled from 'styled-components/native';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: #ff3b30;
  text-align: center;
  margin-bottom: 16px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 12px 24px;
  border-radius: 8px;
`;

const RetryButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <Container>
      <ErrorText>{message}</ErrorText>
      {onRetry && (
        <RetryButton onPress={onRetry}>
          <RetryButtonText>Повторить</RetryButtonText>
        </RetryButton>
      )}
    </Container>
  );
};
