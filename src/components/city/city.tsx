import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils';
import styles from './city.module.css';
import { useOwnContext } from '../../contexts/cities-context';
import { useEffect } from 'react';
import Spinner from '../spinner/spinner';
import ButtonBack from '../button-back/button-back';

export default function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useOwnContext();

  useEffect(() => {
    getCity(Number(id));
  }, [id]);

  if (isLoading) return <Spinner />;

  if (!currentCity) return <p>Something went wrong</p>;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date.toString() || '')}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}
