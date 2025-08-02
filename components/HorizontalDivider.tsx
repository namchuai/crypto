import React from 'react';
import { StyleSheet, View } from 'react-native';

const HorizontalDivider: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: '#eee',
  },
});

export default HorizontalDivider;
