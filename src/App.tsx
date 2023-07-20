import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/page-not-found';
import { APP_ROUTE } from './const';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';

// import AppLayout from './pages/app-layout/app-layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTE.MAIN} element={<Homepage />} />
        <Route path={APP_ROUTE.PRODUCT} element={<Product />} />
        <Route path={APP_ROUTE.PRICING} element={<Pricing />} />
        <Route path={APP_ROUTE.LOGIN} element={<Login />} />
        <Route path={APP_ROUTE.APP} element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
