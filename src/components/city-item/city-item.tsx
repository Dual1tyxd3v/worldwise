import { Link } from 'react-router-dom';
import { CityType } from '../../types';
import { formatDate } from '../../utils';
import styles from './city-item.module.css';

type CityItemProps = {
  city: CityType;
};

export default function CityItem({ city }: CityItemProps) {
  const { emoji, cityName, date, id, position } = city;
  const queryString = `?lat=${position.lat}&lng=${position.lng}`;
  return (
    <li >
      <Link to={`${id}${queryString}`} className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}