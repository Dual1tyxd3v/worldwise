import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/page-not-found';
import { APP_ROUTE } from './const';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTE.MAIN} element={<Homepage />} />
        <Route path={APP_ROUTE.PRODUCT} element={<Product />} />
        <Route path={APP_ROUTE.PRICING} element={<Pricing />} />
        <Route path={APP_ROUTE.LOGIN} element={<Login />} />
        <Route path={APP_ROUTE.APP} element={<AppLayout />}>
          <Route index element={<p>List of cities</p>}/>
          <Route path={APP_ROUTE.CITIES} element={<p>List of cities</p>}/>
          <Route path={APP_ROUTE.COUNTRIES} element={<p>List of countries</p>}/>
          <Route path={APP_ROUTE.FORM} element={<p>Form</p>}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
