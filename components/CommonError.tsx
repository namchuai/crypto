import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

type Props = {
  message: string;
  onRetry?: () => void;
  retryText?: string;
  showIcon?: boolean;
};

const CommonError: React.FC<Props> = ({
  message,
  onRetry,
  retryText = 'Try Again',
  showIcon = true,
}) => {
  return (
    <View style={styles.container}>
      {showIcon && (
        <IconSymbol
          name="exclamationmark.triangle"
          size={48}
          color="#FF3B30"
          style={styles.icon}
        />
      )}

      <ThemedText style={styles.errorMessage}>{message}</ThemedText>

      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <ThemedText style={styles.retryText}>{retryText}</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 16,
  },
  errorMessage: {
    textAlign: 'center',
    color: '#FF3B30',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default React.memo(CommonError);
