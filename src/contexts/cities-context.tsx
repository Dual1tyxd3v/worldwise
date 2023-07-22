import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { CityType, ContextType } from '../types';
import { API_URL } from '../const';
import { initState, reducer } from '../store/store';

const CitiesContext = createContext<ContextType | null>(null);

type CitiesProviderProps = {
  children: ReactNode;
};

export default function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initState
  );

  useEffect(() => {
    async function fetchCities(url: string) {
      try {
        dispatch({ type: 'loading' });
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new TypeError('Could not load data');
        }
        const data = await resp.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (e) {
        dispatch({type: 'rejected', payload: 'Something went wrong'});
      } 
    }

    fetchCities(API_URL);
  }, []);

  function getCity(id: number) {
    async function fetchCity(url: string) {
      try {
        dispatch({ type: 'loading' });
        const resp = await fetch(`${url}/${id}`);
        if (!resp.ok) {
          throw new TypeError('Could not load data');
        }
        const data = await resp.json();
        dispatch({ type: 'currentCity/loaded', payload: data });
      } catch (e) {
        dispatch({type: 'rejected', payload: 'Something went wrong'});
      } 
    }

    fetchCity(API_URL);
  }

  async function uploadCity(city: CityType) {
    try {
      dispatch({ type: 'loading' });
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
      dispatch({ type: 'city/added', payload: data });
    } catch (e) {
      dispatch({type: 'rejected', payload: 'Something went wrong'});
    } 
  }

  async function deleteCity(id: number) {
    try {
      dispatch({ type: 'loading' });
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'city/deleted', payload: id });
    } catch (e) {
      dispatch({type: 'rejected', payload: 'Cant delete city'});
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
