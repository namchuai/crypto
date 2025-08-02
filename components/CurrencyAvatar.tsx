import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  currencyName: string;
};

const CurrencyAvatar: React.FC<Props> = ({ currencyName }) => {
  const initial = currencyName.length > 0 ? currencyName.charAt(0) : '';

  return (
    <View style={styles.container}>
      <Text style={styles.textAvatar}>{initial}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAvatar: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default React.memo(CurrencyAvatar);
