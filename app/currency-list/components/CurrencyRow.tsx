import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CurrencyInfo } from '@/@types/currency-info';
import CurrencyAvatar from '@/components/CurrencyAvatar';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

type Props = {
  currencyInfo: CurrencyInfo;
};

const CurrencyRow: React.FC<Props> = ({ currencyInfo }) => {
  const displayCode =
    'code' in currencyInfo ? currencyInfo.code : currencyInfo.symbol;

  return (
    <View style={styles.container}>
      <CurrencyAvatar currencyName={currencyInfo.name} />
      <ThemedText style={styles.name}>{currencyInfo.name}</ThemedText>
      <ThemedText style={styles.symbol}>{displayCode}</ThemedText>
      <IconSymbol name="chevron.forward" size={16} color="#999" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  name: {
    flex: 1,
  },
  symbol: {
    marginRight: 8,
    color: '#666',
  },
});

export default CurrencyRow;
