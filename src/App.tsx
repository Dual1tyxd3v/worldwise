import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/page-not-found';
import { APP_ROUTE } from './const';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import CityList from './components/city-list/city-list';
import CountriesList from './components/countries-list/countries-list';
import City from './components/city/city';
import Form from './components/form/form';
import CitiesProvider from './contexts/cities-context';
import AuthProvider from './contexts/fakeAuthContext';
import ProtectedRoute from './pages/protected-route';

export default function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={APP_ROUTE.MAIN} element={<Homepage />} />
            <Route path={APP_ROUTE.PRODUCT} element={<Product />} />
            <Route path={APP_ROUTE.PRICING} element={<Pricing />} />
            <Route path={APP_ROUTE.LOGIN} element={<Login />} />
            <Route
              path={APP_ROUTE.APP}
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to={APP_ROUTE.CITIES} />}
              />
              <Route path={APP_ROUTE.CITIES} element={<CityList />} />
              <Route path={`${APP_ROUTE.CITIES}/:id`} element={<City />} />
              <Route path={APP_ROUTE.COUNTRIES} element={<CountriesList />} />
              <Route path={APP_ROUTE.FORM} element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}
