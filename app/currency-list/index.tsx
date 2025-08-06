import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDebounce } from 'use-debounce';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CurrencyList from './components/CurrencyList';
import SearchInput from './components/SearchInput';

const DEBOUNCE_SEARCH_MS = 300;

const CurrencyListScreen: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, DEBOUNCE_SEARCH_MS);
  const navigation = useNavigation();

  const handleCloseSearch = useCallback(() => {
    setShowSearch(false);
    setSearchQuery('');
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: showSearch ? '' : 'Currencies',
      headerShown: true,
      headerLeft: showSearch
        ? () => (
            <Pressable onPress={handleCloseSearch} testID="search-close">
              <IconSymbol name="chevron.backward" size={20} color="#007AFF" />
            </Pressable>
          )
        : undefined,
      headerTitle: showSearch
        ? () => (
            <SearchInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
          )
        : 'Currencies',
      headerRight: showSearch
        ? undefined
        : () => (
            <Pressable onPress={() => setShowSearch(true)} testID="search-icon">
              <IconSymbol name="magnifyingglass" size={20} color="#007AFF" />
            </Pressable>
          ),
    });
  }, [navigation, showSearch, searchQuery, handleCloseSearch]);

  return <CurrencyList searchQuery={debouncedSearchQuery} />;
};

export default CurrencyListScreen;
