import { by, device, element, expect, waitFor } from 'detox';

describe('Consolidated Database Scenarios', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('should show empty currency list when database is cleared', async () => {
    // Clear database from home screen
    await element(by.text('Clear database')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Navigate to currency list
    await element(by.text('View Currencies')).tap();

    // Should show empty state
    await expect(element(by.text('No currencies available'))).toBeVisible();
  });

  it('should show only crypto currencies when crypto data is inserted', async () => {
    // Clear database and insert crypto data
    await element(by.text('Clear database')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await element(by.text('Insert Crypto data')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Navigate to currency list
    await element(by.text('View Currencies')).tap();

    // Should show crypto currencies
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    await expect(element(by.text('BTC'))).toBeVisible();
    await expect(element(by.text('Ethereum'))).toBeVisible();
    await expect(element(by.text('ETH'))).toBeVisible();

    // Scroll to check for more crypto currencies
    await element(by.id('currency-list')).swipe('up', 'fast', 0.8);
    await waitFor(element(by.text('Chainlink')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.text('LINK'))).toBeVisible();

    // Should NOT show fiat currencies
    await expect(element(by.text('United States Dollar'))).not.toBeVisible();
    await expect(element(by.text('Euro'))).not.toBeVisible();
  });

  it('should show only fiat currencies when fiat data is inserted', async () => {
    // Clear database and insert fiat data
    await element(by.text('Clear database')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await element(by.text('Insert Fiat data')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Navigate to currency list
    await element(by.text('View Currencies')).tap();

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
    // Clear database and insert both data types
    await element(by.text('Clear database')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await element(by.text('Insert Both')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Navigate to currency list
    await element(by.text('View Currencies')).tap();

    // Should show crypto currencies
    await expect(element(by.text('Bitcoin'))).toBeVisible();
    await expect(element(by.text('BTC'))).toBeVisible();
    await expect(element(by.text('Ethereum'))).toBeVisible();
    await expect(element(by.text('ETH'))).toBeVisible();

    // Scroll to see more currencies
    for (let i = 0; i < 3; i++) {
      await element(by.id('currency-list')).swipe('up', 'fast', 0.8);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Should also show fiat currencies
    await waitFor(element(by.text('United States Dollar')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.text('USD'))).toBeVisible();
  });

  it('should handle sequential database operations correctly', async () => {
    // Start with crypto data
    await element(by.text('Clear database')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await element(by.text('Insert Crypto data')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check crypto data is loaded
    await element(by.text('View Currencies')).tap();
    await expect(element(by.text('Bitcoin'))).toBeVisible();

    // Navigate back to home - use app relaunch since pressBack is Android-only
    await device.launchApp({ newInstance: true });

    // Switch to fiat data
    await element(by.text('Clear database')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await element(by.text('Insert Fiat data')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check only fiat data is now loaded
    await element(by.text('View Currencies')).tap();
    await expect(element(by.text('United States Dollar'))).toBeVisible();
    await expect(element(by.text('Bitcoin'))).not.toBeVisible();

    // Navigate back to home
    await device.launchApp({ newInstance: true });

    // Finally, add both data types
    await element(by.text('Clear database')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await element(by.text('Insert Both')).tap();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check both data types are loaded
    await element(by.text('View Currencies')).tap();
    await expect(element(by.text('Bitcoin'))).toBeVisible();

    // Scroll to find fiat currencies
    for (let i = 0; i < 3; i++) {
      await element(by.id('currency-list')).swipe('up', 'fast', 0.8);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    await waitFor(element(by.text('United States Dollar')))
      .toBeVisible()
      .withTimeout(2000);
  });
});
