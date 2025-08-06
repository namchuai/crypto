import { renderHook, waitFor } from '@testing-library/react-native';
import { CurrencyInfo } from '../@types/currency-info';
import useCurrencies from '../hooks/useCurrencies';

const mockCurrencyStore = {
  currencies: [],
  loading: false,
  error: null,
  hydrated: true,
  setLoading: jest.fn(),
  setCurrencies: jest.fn(),
  clearCurrencies: jest.fn(),
};

jest.mock('../store/currencyStore', () => ({
  __esModule: true,
  default: jest.fn(() => mockCurrencyStore),
}));

describe('useCurrencies - Search Functionality', () => {
  const mockCurrencies: CurrencyInfo[] = [
    // Crypto currencies
    { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ETH', name: 'Ethereum', symbol: 'ETH' },
    { id: 'ETC', name: 'Ethereum Classic', symbol: 'ETC' },
    { id: 'ETN', name: 'Electroneum', symbol: 'ETN' },
    { id: 'BET', name: 'BetProtocol', symbol: 'BET' },
    { id: 'FOOBAR', name: 'Foobar', symbol: 'FOO' },
    { id: 'BARFOO', name: 'Barfoo', symbol: 'BAR' },
    { id: 'TRONCLASSIC', name: 'Tronclassic', symbol: 'TRONC' },

    // Fiat currencies
    { id: 'USD', name: 'United States Dollar', symbol: '$', code: 'USD' },
    { id: 'EUR', name: 'Euro', symbol: '€', code: 'EUR' },
    { id: 'SGD', name: 'Singapore Dollar', symbol: '$', code: 'SGD' },
  ];

  beforeEach(() => {
    mockCurrencyStore.currencies = mockCurrencies;
    mockCurrencyStore.loading = false;
    mockCurrencyStore.error = null;
    mockCurrencyStore.hydrated = true;
    mockCurrencyStore.setLoading.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all currencies when search query is empty', async () => {
    const { result } = renderHook(() => useCurrencies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.currencies).toEqual(mockCurrencies);
  });

  it('should return all currencies when search query is only whitespace', async () => {
    const { result } = renderHook(() => useCurrencies('   '));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.currencies).toEqual(mockCurrencies);
  });

  describe('Rule 1: The coin name starts with the search term', () => {
    it('should match Bitcoin with "bitcoin"', async () => {
      const { result } = renderHook(() => useCurrencies('bitcoin'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
      ]);
    });

    it('should match Ethereum and Ethereum Classic with "ethereum"', async () => {
      const { result } = renderHook(() => useCurrencies('ethereum'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'ETH', name: 'Ethereum', symbol: 'ETH' },
        { id: 'ETC', name: 'Ethereum Classic', symbol: 'ETC' },
      ]);
    });

    it('should match Foobar with "foo" but not Barfoo', async () => {
      const { result } = renderHook(() => useCurrencies('foo'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'FOOBAR', name: 'Foobar', symbol: 'FOO' },
      ]);
      expect(result.current.currencies).not.toContainEqual({
        id: 'BARFOO',
        name: 'Barfoo',
        symbol: 'BAR',
      });
    });

    it('should be case insensitive', async () => {
      const { result } = renderHook(() => useCurrencies('BITCOIN'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
      ]);
    });
  });

  describe('Rule 2: The coin name contains a partial match with a space prefix', () => {
    it('should match "Ethereum Classic" with "classic"', async () => {
      const { result } = renderHook(() => useCurrencies('classic'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'ETC', name: 'Ethereum Classic', symbol: 'ETC' },
      ]);
    });

    it('should match "United States Dollar" with "states"', async () => {
      const { result } = renderHook(() => useCurrencies('states'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'USD', name: 'United States Dollar', symbol: '$', code: 'USD' },
      ]);
    });

    it('should match "Singapore Dollar" with "dollar"', async () => {
      const { result } = renderHook(() => useCurrencies('dollar'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'USD', name: 'United States Dollar', symbol: '$', code: 'USD' },
        { id: 'SGD', name: 'Singapore Dollar', symbol: '$', code: 'SGD' },
      ]);
    });

    it('should NOT match "Tronclassic" with "classic" (no space prefix)', async () => {
      const { result } = renderHook(() => useCurrencies('classic'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).not.toContainEqual({
        id: 'TRONCLASSIC',
        name: 'Tronclassic',
        symbol: 'TRONC',
      });
    });
  });

  describe('Rule 3: The coin symbol/code starts with the search term', () => {
    it('should match ETH, ETC, ETN with "ET" (symbol starts with)', async () => {
      const { result } = renderHook(() => useCurrencies('ET'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'ETH', name: 'Ethereum', symbol: 'ETH' },
        { id: 'ETC', name: 'Ethereum Classic', symbol: 'ETC' },
        { id: 'ETN', name: 'Electroneum', symbol: 'ETN' },
      ]);
    });

    it('should NOT match BET with "ET" (symbol does not start with)', async () => {
      const { result } = renderHook(() => useCurrencies('ET'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).not.toContainEqual({
        id: 'BET',
        name: 'BetProtocol',
        symbol: 'BET',
      });
    });

    it('should match USD with "usd" (fiat code)', async () => {
      const { result } = renderHook(() => useCurrencies('usd'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'USD', name: 'United States Dollar', symbol: '$', code: 'USD' },
      ]);
    });

    it('should be case insensitive for symbols', async () => {
      const { result } = renderHook(() => useCurrencies('btc'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
      ]);
    });
  });

  describe('Combined matching rules', () => {
    it('should match both name and symbol rules', async () => {
      const { result } = renderHook(() => useCurrencies('e'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const resultIds = result.current.currencies.map((c) => c.id);

      // Should match: Ethereum (name starts), Ethereum Classic (name starts),
      // Electroneum (name starts), Euro (name starts)
      expect(resultIds).toContain('ETH');
      expect(resultIds).toContain('ETC');
      expect(resultIds).toContain('ETN');
      expect(resultIds).toContain('EUR');
    });

    it('should handle empty results', async () => {
      const { result } = renderHook(() => useCurrencies('xyz'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty currency list', async () => {
      mockCurrencyStore.currencies = [];

      const { result } = renderHook(() => useCurrencies('bitcoin'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([]);
    });

    it('should trim whitespace from search query', async () => {
      const { result } = renderHook(() => useCurrencies('  bitcoin  '));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currencies).toEqual([
        { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
      ]);
    });

    it('should handle special characters in search', async () => {
      const { result } = renderHook(() => useCurrencies('$'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Should find USD and SGD as they have $ symbol
      expect(result.current.currencies).toEqual([
        { id: 'USD', name: 'United States Dollar', symbol: '$', code: 'USD' },
        { id: 'SGD', name: 'Singapore Dollar', symbol: '$', code: 'SGD' },
      ]);
    });
  });
});
