import { NavLink } from 'react-router-dom';
import { APP_ROUTE } from '../const';

export default function NavPage() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={APP_ROUTE.MAIN}>Home</NavLink>
        </li>
        <li>
          <NavLink to={APP_ROUTE.PRICING}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={APP_ROUTE.PRODUCT}>Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}
