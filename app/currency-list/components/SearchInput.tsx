import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
};

const SearchInput: React.FC<Props> = ({ value, onChangeText, onClear }) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      placeholder="Search currencies..."
      placeholderTextColor="#999"
      autoCapitalize="none"
      autoCorrect={false}
      autoFocus={true}
      testID="search-input"
    />
    {value.length > 0 && (
      <Pressable
        onPress={onClear}
        style={styles.clearButton}
        testID="search-clear"
      >
        <IconSymbol name="xmark.circle.fill" size={18} color="#999" />
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    height: 36,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchInput;
