import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  CommonError,
  CommonLoading,
  EmptyView,
  HorizontalDivider,
  SafeAreaFooter,
} from '@/components';
import useCurrencies from '@/hooks/useCurrencies';
import CurrencyRow from './CurrencyRow';

type Props = {
  searchQuery?: string;
};

const CurrencyList: React.FC<Props> = ({ searchQuery }) => {
  const { currencies, loading, error } = useCurrencies(searchQuery);

  if (loading) {
    return <CommonLoading message="Loading currencies..." />;
  }

  if (error) {
    return (
      <CommonError
        message={error}
        onRetry={() => {
          // Could add retry logic here if needed
          console.log('Retry loading currencies');
        }}
      />
    );
  }

  return (
    <FlatList
      style={styles.container}
      testID="currency-list"
      data={currencies}
      renderItem={({ item }) => (
        <CurrencyRow key={item.id} currencyInfo={item} />
      )}
      ItemSeparatorComponent={HorizontalDivider}
      keyExtractor={(item) => item.id}
      ListFooterComponent={<SafeAreaFooter />}
      ListEmptyComponent={
        <EmptyView
          message={
            searchQuery
              ? 'No currencies found matching your search'
              : 'No currencies available'
          }
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CurrencyList;
