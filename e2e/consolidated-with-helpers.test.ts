import { by, device, element, expect, waitFor } from 'detox';
import {
  WAIT_TIMES,
  clearDatabase,
  insertBothData,
  insertCryptoData,
  insertFiatData,
  navigateToCurrencyList,
  scrollCurrencyList,
} from './helpers';

describe('Consolidated Database Scenarios (with helpers)', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('should show empty currency list when database is cleared', async () => {
    await clearDatabase();
    await navigateToCurrencyList();

    // Should show empty state
    await expect(element(by.text('No currencies available'))).toBeVisible();
  });

  it('should show only crypto currencies when crypto data is inserted', async () => {
    await clearDatabase();
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
    await clearDatabase();
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
    await clearDatabase();
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

  it('should handle sequential database operations correctly', async () => {
    // Start with crypto data
    await clearDatabase();
    await insertCryptoData();

    // Check crypto data is loaded
    await navigateToCurrencyList();
    await expect(element(by.text('Bitcoin'))).toBeVisible();

    // Navigate back to home - use app relaunch since pressBack is Android-only
    await device.launchApp({ newInstance: true });

    // Switch to fiat data
    await clearDatabase();
    await insertFiatData();

    // Check only fiat data is now loaded
    await navigateToCurrencyList();
    await expect(element(by.text('United States Dollar'))).toBeVisible();
    await expect(element(by.text('Bitcoin'))).not.toBeVisible();

    // Navigate back to home
    await device.launchApp({ newInstance: true });

    // Finally, add both data types
    await clearDatabase();
    await insertBothData();

    // Check both data types are loaded
    await navigateToCurrencyList();
    await expect(element(by.text('Bitcoin'))).toBeVisible();

    // Scroll to find fiat currencies
    await scrollCurrencyList(3);
    await waitFor(element(by.text('United States Dollar')))
      .toBeVisible()
      .withTimeout(WAIT_TIMES.LONG);
  });
});
