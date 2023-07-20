import { NavLink } from 'react-router-dom';
import { APP_ROUTE } from '../../const';
import Logo from '../logo/logo';
import styles from './nav-page.module.css';

export default function NavPage() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={APP_ROUTE.PRICING}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={APP_ROUTE.PRODUCT}>Product</NavLink>
        </li>
        <li>
          <NavLink to={APP_ROUTE.LOGIN} className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
