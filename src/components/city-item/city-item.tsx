import { Link } from 'react-router-dom';
import { CityType } from '../../types';
import { formatDate } from '../../utils';
import styles from './city-item.module.css';
import { useOwnContext } from '../../contexts/cities-context';
import { MouseEvent } from 'react';

type CityItemProps = {
  city: CityType;
};

export default function CityItem({ city }: CityItemProps) {
  const { currentCity, deleteCity } = useOwnContext();
  const { emoji, cityName, date, id, position } = city;
  const queryString = `?lat=${position.lat}&lng=${position.lng}`;

  function onClickHandler(e: MouseEvent) {
    e.preventDefault();

    deleteCity(id);
  }
  return (
    <li>
      <Link
        to={`${id}${queryString}`}
        className={`${styles.cityItem} ${
          currentCity?.id === id ? styles['cityItem--active'] : ''
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date.toString())})</time>
        <button className={styles.deleteBtn} onClick={onClickHandler}>&times;</button>
      </Link>
    </li>
  );
}
