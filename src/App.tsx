import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import Product from './pages/product';
import PricingPage from './pages/pricing';
import PageNotFound from './pages/page-not-found';
import { APP_ROUTE } from './const';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTE.MAIN} element={<HomePage />} />
        <Route path={APP_ROUTE.PRODUCT} element={<Product />} />
        <Route path={APP_ROUTE.PRICING} element={<PricingPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
