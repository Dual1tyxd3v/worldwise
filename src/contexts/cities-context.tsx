import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
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

  function getCity(id: number) {
    async function fetchCity(url: string) {
      try {
        setIsLoading(true);
        const resp = await fetch(`${url}/${id}`);
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

  async function uploadCity(city: CityType) {
    try {
      setIsLoading(true);
      const resp = await fetch(`${API_URL}`, {
        method: 'POST',
        body: JSON.stringify(city),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resp.ok) {
        throw new TypeError('Could not upload data');
      }
      const data = await resp.json();
      setCities((cities) => [...cities, data]);
    } catch (e) {
      console.log('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: number) {
    try {
      setIsLoading(true);
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (e) {
      console.log('Cant delete city');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        uploadCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useOwnContext() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error('You must use context into provider!');
  return context;
}
