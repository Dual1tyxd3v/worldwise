import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './map.module.css';
import { APP_ROUTE } from '../../const';

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  return (
    <div className={styles.mapContainer} onClick={() => {navigate(APP_ROUTE.FORM)}}>
      {lat} / {lng}
    </div>
  );
}
