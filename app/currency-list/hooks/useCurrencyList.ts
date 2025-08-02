import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrencyInfo } from '@/@types/currency-info';

// TODO: error handling
const useCurrencyList = () => {
  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('crypto-data').then((jsonValue) => {
      console.log(jsonValue);
      setCurrencies(JSON.parse(jsonValue!));
    });
  }, []);

  return { currencies };
};

export default useCurrencyList;
