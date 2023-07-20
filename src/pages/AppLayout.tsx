import Map from '../components/map/map';
import Sidebar from '../components/sidebar/sidebar';
import styles from './AppLayout.module.css'

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}