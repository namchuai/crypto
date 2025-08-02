import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

type Props = {
  message?: string;
  icon?: string;
};

const EmptyView: React.FC<Props> = ({ message = 'No items found' }) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.message}>{message}</ThemedText>
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
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default EmptyView;
