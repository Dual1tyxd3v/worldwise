import { Outlet } from 'react-router-dom';
import Logo from '../logo/logo';
import NavApp from '../nav-app/nav-app';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <NavApp />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWide Inc.
        </p>
      </footer>
    </div>
  );
}
