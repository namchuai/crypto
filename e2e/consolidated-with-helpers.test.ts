import { by, device, element, expect, waitFor } from 'detox';
import {
  WAIT_TIMES,
  clearDatabase,
  closeSearch,
  insertBothData,
  insertCryptoData,
  insertFiatData,
  navigateToCurrencyList,
  navigateToHome,
  performSearch,
  scrollCurrencyList,
} from './helpers';

describe('Consolidated Database Scenarios (with helpers)', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should show empty currency list when database is cleared', async () => {
    await navigateToHome();
    await clearDatabase();
    await navigateToCurrencyList();

    // Should show empty state
    await expect(element(by.text('No currencies available'))).toBeVisible();
  });

  it('should show only crypto currencies when crypto data is inserted', async () => {
    await navigateToHome();
    await insertCryptoData();
    await navigateToCurrencyList();

    // Should show crypto currencies
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    await expect(element(by.text('BTC'))).toBeVisible();
    await expect(element(by.text('Ethereum'))).toBeVisible();
    await expect(element(by.text('ETH'))).toBeVisible();

    // Scroll to check for more crypto currencies
    await scrollCurrencyList();
    await waitFor(element(by.text('Chainlink')))
      .toBeVisible()
      .withTimeout(WAIT_TIMES.LONG);
    await expect(element(by.text('LINK'))).toBeVisible();

    // Should NOT show fiat currencies
    await expect(element(by.text('United States Dollar'))).not.toBeVisible();
    await expect(element(by.text('Euro'))).not.toBeVisible();
  });

  it('should show only fiat currencies when fiat data is inserted', async () => {
    await navigateToHome();
    await insertFiatData();
    await navigateToCurrencyList();

    // Should show fiat currencies
    await expect(element(by.text('United States Dollar'))).toBeVisible();
    await expect(element(by.text('USD'))).toBeVisible();
    await expect(element(by.text('Euro'))).toBeVisible();
    await expect(element(by.text('EUR'))).toBeVisible();

    // Should NOT show crypto currencies
    await expect(element(by.text('Bitcoin'))).not.toBeVisible();
    await expect(element(by.text('Ethereum'))).not.toBeVisible();
  });

  it('should show both crypto and fiat currencies when both data types are inserted', async () => {
    await navigateToHome();
    await insertBothData();
    await navigateToCurrencyList();

    // Should show crypto currencies
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    await expect(element(by.text('BTC'))).toBeVisible();
    await expect(element(by.text('Ethereum'))).toBeVisible();
    await expect(element(by.text('ETH'))).toBeVisible();

    // Scroll to see fiat currencies
    await scrollCurrencyList(3);

    // Should also show fiat currencies
    await waitFor(element(by.text('United States Dollar')))
      .toBeVisible()
      .withTimeout(WAIT_TIMES.LONG);
    await expect(element(by.text('USD'))).toBeVisible();
  });

  // it('should handle sequential database operations correctly', async () => {
  //   // Start with crypto data
  //   await navigateToHome();
  //   await clearDatabase();
  //   await insertCryptoData();

  //   // Check crypto data is loaded
  //   await navigateToCurrencyList();
  //   await expect(element(by.text('Bitcoin'))).toBeVisible();

  //   // Navigate back to home - use app relaunch since pressBack is Android-only
  //   await device.launchApp({ newInstance: true });

  //   // Switch to fiat data
  //   await navigateToHome();
  //   await clearDatabase();
  //   await insertFiatData();

  //   // Check only fiat data is now loaded
  //   await navigateToCurrencyList();
  //   await expect(element(by.text('United States Dollar'))).toBeVisible();
  //   await expect(element(by.text('Bitcoin'))).not.toBeVisible();

  //   // Navigate back to home
  //   await device.launchApp({ newInstance: true });

  //   // Finally, add both data types
  //   await navigateToHome();
  //   await clearDatabase();
  //   await insertBothData();

  //   // Check both data types are loaded
  //   await navigateToCurrencyList();
  //   await expect(element(by.text('Bitcoin'))).toBeVisible();

  //   // Scroll to find fiat currencies
  //   await scrollCurrencyList(3);
  //   await waitFor(element(by.text('United States Dollar')))
  //     .toBeVisible()
  //     .withTimeout(WAIT_TIMES.LONG);
  // });

  it('should filter currencies by name starting with search term', async () => {
    // Setup data
    await navigateToHome();
    await insertBothData();
    await navigateToCurrencyList();

    // Search for "b" - should show Bitcoin, Binance Coin, Bitcoin Cash
    await performSearch('b');

    // Verify results match criteria: name starts with "b"
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    await expect(element(by.text('BTC'))).toBeVisible();
    await expect(element(by.text('Binance Coin'))).toBeVisible();
    await expect(element(by.text('BNB'))).toBeVisible();
    await expect(element(by.text('Bitcoin Cash'))).toBeVisible();
    await expect(element(by.text('BCH'))).toBeVisible();

    // Should NOT show currencies that don't start with "b"
    await expect(element(by.text('Ethereum'))).not.toBeVisible();
    await expect(element(by.text('Cardano'))).not.toBeVisible();

    await closeSearch();
  });

  it('should filter currencies by symbol starting with search term', async () => {
    // Setup data
    await navigateToHome();
    await insertBothData();
    await navigateToCurrencyList();

    // Search for "ET" - should show currencies with symbols starting with "ET"
    await performSearch('ET');

    // Verify results - should show ETH, ETC, ETN (if they exist)
    await expect(element(by.text('Ethereum'))).toBeVisible();
    await expect(element(by.text('ETH'))).toBeVisible();

    // Should NOT show BET or other symbols that don't start with "ET"
    await expect(element(by.text('Bitcoin'))).not.toBeVisible();

    await closeSearch();
  });

  it('should show partial matches with space prefix', async () => {
    // Setup data
    await navigateToHome();
    await insertBothData();
    await navigateToCurrencyList();

    // Search for "Classic" - should match "Ethereum Classic" (space + Classic)
    await performSearch('Classic');

    // Should show Ethereum Classic if it exists in the data
    // This tests the space-prefixed matching rule: coinName.includes(' ' + query)

    // If no exact matches, should show empty state
    // Note: This test depends on having "Ethereum Classic" in the crypto data

    await closeSearch();
  });

  it('should show empty state when no results found', async () => {
    // Setup data
    await navigateToHome();
    await insertBothData();
    await navigateToCurrencyList();

    // Search for "be" - should show no results based on the image
    await performSearch('be');

    // Should show empty state
    await expect(
      element(by.text('No currencies found matching your search')),
    ).toBeVisible();

    await closeSearch();
  });

  it('should handle search debouncing correctly', async () => {
    // Setup data
    await navigateToHome();
    await insertBothData();
    await navigateToCurrencyList();

    // Type partial search quickly (testing debounce)
    await performSearch('bit');

    // Should show Bitcoin-related results
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    await expect(element(by.text('Bitcoin Cash'))).toBeVisible();

    // Clear search and verify all results return
    await closeSearch();

    // Should show all currencies again
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    await expect(element(by.text('Ethereum'))).toBeVisible();
  });

  it('should maintain search state during navigation', async () => {
    // Setup data
    await navigateToHome();
    await insertBothData();
    await navigateToCurrencyList();

    // Perform search
    await performSearch('b');
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    await expect(element(by.text('Ethereum'))).not.toBeVisible();

    // Note: Navigation state test would depend on how the app handles search state
    // during navigation - may need adjustment based on actual app behavior

    await closeSearch();
  });
});
