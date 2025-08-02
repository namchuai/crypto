import { IconSymbol } from '@/components/ui/IconSymbol';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useDebounce } from 'use-debounce';
import CurrencyList from './components/CurrencyList';
import SearchInput from './components/SearchInput';

const CurrencyListScreen: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: showSearch ? '' : 'Currencies',
      headerShown: true,
      headerLeft: showSearch
        ? () => (
            <Pressable
              onPress={() => setShowSearch(false)}
              testID="search-close"
            >
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
  }, [navigation, showSearch, searchQuery]);

  const onCloseSearch = useCallback(() => {
    setShowSearch(false);
    setSearchQuery('');
  }, []);

  return (
    <CurrencyList
      showSearch={showSearch}
      onCloseSearch={onCloseSearch}
      searchQuery={debouncedSearchQuery}
    />
  );
};

export default CurrencyListScreen;
