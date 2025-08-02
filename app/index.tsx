import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import useCryptoData from './hooks/useCryptoData';

const HomeScreen: React.FC = () => {
  const {
    clearCryptoData,
    insertCryptoData,
    insertFiatData,
    insertCryptoAndFiatData,
  } = useCryptoData();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.title}>
        Control
      </ThemedText>
      <TouchableOpacity style={styles.button} onPress={clearCryptoData}>
        <ThemedText style={styles.buttonText}>Clear database</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={insertCryptoData}>
        <ThemedText style={styles.buttonText}>Insert Crypto data</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={insertFiatData}>
        <ThemedText style={styles.buttonText}>Insert Fiat data</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={insertCryptoAndFiatData}>
        <ThemedText style={styles.buttonText}>Insert Both</ThemedText>
      </TouchableOpacity>

      <ThemedText type="defaultSemiBold" style={styles.title}>
        Navigate Currency List
      </ThemedText>

      <Link href="/currency-list" style={styles.button} asChild>
        <TouchableOpacity>
          <ThemedText style={styles.buttonText}>View Currencies</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
  },
  title: {
    marginTop: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default HomeScreen;
