import Map from '../components/map/map';
import Sidebar from '../components/sidebar/sidebar';
import User from '../components/user/user';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <User />
      <Map />
    </div>
  );
}
