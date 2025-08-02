import React, { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmptyView from '@/components/EmptyView';
import HorizontalDivider from '@/components/HorizontalDivider';
import useCurrencyList from '../hooks/useCurrencyList';
import CurrencyRow from './CurrencyRow';

type Props = {
  showSearch?: boolean;
  onCloseSearch?: () => void;
  searchQuery?: string;
};

const CurrencyList: React.FC<Props> = ({
  showSearch = false,
  onCloseSearch,
  searchQuery = '',
}) => {
  const { currencies } = useCurrencyList();
  const insets = useSafeAreaInsets();

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return currencies;

    const query = searchQuery.toLowerCase();
    return currencies.filter(
      (currency) =>
        currency.name.toLowerCase().includes(query) ||
        ('symbol' in currency &&
          currency.symbol.toLowerCase().includes(query)) ||
        ('code' in currency && currency.code.toLowerCase().includes(query)),
    );
  }, [currencies, searchQuery]);

  return (
    <View style={styles.container}>
      <FlatList
        testID="currency-list"
        data={showSearch && searchQuery ? filteredData : currencies}
        renderItem={({ item }) => (
          <CurrencyRow key={item.id} currencyInfo={item} />
        )}
        ItemSeparatorComponent={HorizontalDivider}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={{ height: insets.bottom }} />}
        ListEmptyComponent={
          <EmptyView
            message={
              showSearch && searchQuery
                ? 'No currencies found matching your search'
                : 'No currencies available'
            }
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  currencyList: {
    flex: 1,
  },
});

export default CurrencyList;
