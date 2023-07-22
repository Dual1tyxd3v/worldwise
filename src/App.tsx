import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { APP_ROUTE } from './const';
import CityList from './components/city-list/city-list';
import CountriesList from './components/countries-list/countries-list';
import City from './components/city/city';
import Form from './components/form/form';
import CitiesProvider from './contexts/cities-context';
import AuthProvider from './contexts/fakeAuthContext';
import ProtectedRoute from './pages/protected-route';
import { Suspense, lazy } from 'react';
import SpinnerFullPage from './pages/SpinnerFullPage';

const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const PageNotFound = lazy(() => import('./pages/page-not-found'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));

export default function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}
