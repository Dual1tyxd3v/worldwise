import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { CitiesType, CityType, ContextType } from '../types';
import { API_URL } from '../const';

const CitiesContext = createContext<ContextType | null>(null);

type CitiesProviderProps = {
  children: ReactNode;
};

export default function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<CitiesType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<CityType | null>(null);

  useEffect(() => {
    async function fetchCities(url: string) {
      try {
        setIsLoading(true);
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new TypeError('Could not load data');
        }
        const data = await resp.json();
        setCities(data);
      } catch (e) {
        console.log('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities(API_URL);
  }, []);

  function getCity(id: string) {
    async function fetchCity(url: string) {
      try {
        setIsLoading(true);
        const resp = await fetch(`${url}/${id }`);
        if (!resp.ok) {
          throw new TypeError('Could not load data');
        }
        const data = await resp.json();
        setCurrentCity(data);
      } catch (e) {
        console.log('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCity(API_URL);
  }
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

export function useOwnContext() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error('You must use context into provider!');
  return context;
}
