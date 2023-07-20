import { Link } from 'react-router-dom';
import { APP_ROUTE } from '../../const';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <Link to={APP_ROUTE.MAIN}>
      <img src="/logo.png" alt="Worldwise logo" className={styles.logo} />
    </Link>
  );
}
