import { useCallback, useEffect, useMemo } from 'react';
import { cryptoList } from '@/constants/crypto-list';
import { fiatList } from '@/constants/fiat-list';
import useCurrencyStore from '@/store/currencyStore';

const useCurrencies = (searchQuery?: string) => {
  const {
    currencies: allCurrencies,
    loading,
    error,
    hydrated,
    setLoading,
    setCurrencies,
    clearCurrencies,
  } = useCurrencyStore();

  useEffect(() => {
    if (hydrated) {
      setLoading(false);
    }
  }, [hydrated, setLoading]);

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery?.trim()) {
      return allCurrencies;
    }

    const query = searchQuery.toLowerCase().trim();

    return allCurrencies.filter((currency) => {
      const coinName = currency.name.toLowerCase();

      // Rule 1: The coin's name starts with the search term
      if (coinName.startsWith(query)) {
        return true;
      }

      // Rule 2: The coin's name contains a partial match with a ' ' (space) prefixed to the search term
      if (coinName.includes(' ' + query)) {
        return true;
      }

      // Rule 3: The coin's symbol starts with the search term (for crypto currencies)
      if (
        'symbol' in currency &&
        currency.symbol.toLowerCase().startsWith(query)
      ) {
        return true;
      }

      // Rule 3: The coin's code starts with the search term (for fiat currencies)
      if ('code' in currency && currency.code.toLowerCase().startsWith(query)) {
        return true;
      }

      return false;
    });
  }, [allCurrencies, searchQuery]);

  // Data manipulation methods
  const clearData = useCallback(() => {
    clearCurrencies();
  }, [clearCurrencies]);

  const insertCryptoData = useCallback(() => {
    setCurrencies(cryptoList);
  }, [setCurrencies]);

  const insertFiatData = useCallback(() => {
    setCurrencies(fiatList);
  }, [setCurrencies]);

  const insertBothData = useCallback(() => {
    setCurrencies([...cryptoList, ...fiatList]);
  }, [setCurrencies]);

  return {
    // Data
    currencies: filteredCurrencies,
    allCurrencies,
    loading,
    error,
    totalCount: allCurrencies.length,

    // Actions
    clearData,
    insertCryptoData,
    insertFiatData,
    insertBothData,
  };
};

export default useCurrencies;
