import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/page-not-found';
import { API_URL, APP_ROUTE } from './const';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import CityList from './components/city-list/city-list';
import { useEffect, useState } from 'react';
import { CitiesType } from './types';
import CountriesList from './components/countries-list/countries-list';

export default function App() {
  const [cities, setCities] = useState<CitiesType>([]);
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTE.MAIN} element={<Homepage />} />
        <Route path={APP_ROUTE.PRODUCT} element={<Product />} />
        <Route path={APP_ROUTE.PRICING} element={<Pricing />} />
        <Route path={APP_ROUTE.LOGIN} element={<Login />} />
        <Route path={APP_ROUTE.APP} element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path={APP_ROUTE.CITIES}
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path={APP_ROUTE.COUNTRIES}
            element={<CountriesList cities={cities} isLoading={isLoading} />}
          />
          <Route path={APP_ROUTE.FORM} element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
