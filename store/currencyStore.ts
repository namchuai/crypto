import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CurrencyInfo } from '@/@types/currency-info';

interface CurrencyState {
  currencies: CurrencyInfo[];
  loading: boolean;
  error: string | null;
  setCurrencies: (currencies: CurrencyInfo[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearCurrencies: () => void;
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currencies: [],
      loading: false,
      error: null,
      hydrated: false,
      setCurrencies: (currencies) => set({ currencies, error: null }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearCurrencies: () => set({ currencies: [], error: null }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: 'crypto-data',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ currencies: state.currencies }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

export default useCurrencyStore;
