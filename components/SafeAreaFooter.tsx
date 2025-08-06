import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaFooter: React.FC = () => {
  const insets = useSafeAreaInsets();

  return <View style={[styles.container, { height: insets.bottom }]} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
});

export default React.memo(SafeAreaFooter);
