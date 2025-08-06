import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';

type Props = {
  value: string;
  isVisible: boolean;
  onChangeText: (text: string) => void;
  onClose: () => void;
};

const SearchHeader: React.FC<Props> = ({
  value,
  isVisible,
  onChangeText,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (isVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isVisible, fadeAnim]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.searchBar}>
        <Pressable
          onPress={onClose}
          style={styles.backButton}
          testID="search-close"
        >
          <IconSymbol name="chevron.backward" size={24} color="#007AFF" />
        </Pressable>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search currencies..."
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          testID="search-input"
        />
        {value.length > 0 && (
          <Pressable
            onPress={() => onChangeText('')}
            style={styles.clearButton}
            testID="search-clear"
          >
            <IconSymbol name="xmark.circle.fill" size={20} color="#999" />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.select({ ios: 44, android: 56 }),
    paddingHorizontal: 8,
  },
  backButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginHorizontal: 8,
  },
  clearButton: {
    padding: 8,
  },
});

export default SearchHeader;
