import Logo from '../logo/logo';
import NavApp from '../nav-app/nav-app';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <NavApp />

      <p>List of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWide Inc.</p>
      </footer>
    </div>
  );
}
