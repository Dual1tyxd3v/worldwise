import { NavLink } from 'react-router-dom';
import styles from './nav-app.module.css';
import { APP_ROUTE } from '../../const';

export default function NavApp() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={APP_ROUTE.CITIES}>Cities</NavLink>
        </li>
        <li>
          <NavLink to={APP_ROUTE.COUNTRIES}>Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}
