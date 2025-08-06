import { by, element } from 'detox';

/**
 * Wait for a specified amount of time
 * @param ms - Milliseconds to wait
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Standard wait times
 */
export const WAIT_TIMES = {
  SHORT: 500,
  MEDIUM: 1000,
  LONG: 2000,
} as const;

/**
 * Test IDs used in the app
 */
export const TEST_IDS = {
  CURRENCY_LIST: 'currency-list',
  SEARCH_ICON: 'search-icon',
  SEARCH_CLOSE: 'search-close',
  SEARCH_INPUT: 'search-input',
  SEARCH_CLEAR: 'search-clear',
} as const;

/**
 * Common button texts
 */
export const BUTTONS = {
  CLEAR_DATABASE: 'Clear database',
  INSERT_CRYPTO: 'Insert Crypto data',
  INSERT_FIAT: 'Insert Fiat data',
  INSERT_BOTH: 'Insert Both',
  VIEW_CURRENCIES: 'View Currencies',
} as const;

/**
 * Tap a button by its text
 */
export const tapButton = async (buttonText: string): Promise<void> => {
  await element(by.text(buttonText)).tap();
};

/**
 * Clear database and wait
 */
export const clearDatabase = async (): Promise<void> => {
  await tapButton(BUTTONS.CLEAR_DATABASE);
  await wait(WAIT_TIMES.SHORT);
};

/**
 * Insert crypto data and wait
 */
export const insertCryptoData = async (): Promise<void> => {
  await tapButton(BUTTONS.INSERT_CRYPTO);
  await wait(WAIT_TIMES.SHORT);
};

/**
 * Insert fiat data and wait
 */
export const insertFiatData = async (): Promise<void> => {
  await tapButton(BUTTONS.INSERT_FIAT);
  await wait(WAIT_TIMES.SHORT);
};

/**
 * Insert both crypto and fiat data and wait
 */
export const insertBothData = async (): Promise<void> => {
  await tapButton(BUTTONS.INSERT_BOTH);
  await wait(WAIT_TIMES.SHORT);
};

/**
 * Navigate to currency list
 */
export const navigateToCurrencyList = async (): Promise<void> => {
  await tapButton(BUTTONS.VIEW_CURRENCIES);
};

/**
 * Scroll the currency list
 */
export const scrollCurrencyList = async (times: number = 1): Promise<void> => {
  for (let i = 0; i < times; i++) {
    await element(by.id(TEST_IDS.CURRENCY_LIST)).swipe('up', 'fast', 0.8);
    await wait(WAIT_TIMES.SHORT);
  }
};
