import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

type Props = {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
};

const CommonLoading: React.FC<Props> = ({
  message = 'Loading...',
  size = 'large',
  color = '#007AFF',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <ThemedText style={styles.message}>{message}</ThemedText>}
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
  message: {
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default React.memo(CommonLoading);
