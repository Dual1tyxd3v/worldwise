import { FormEvent, useEffect, useState } from 'react';
import styles from './form.module.css';
import Button from '../button/button';
import ButtonBack from '../button-back/button-back';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { CITY_URL } from '../../const';
import Spinner from '../spinner/spinner';
import Message from '../message/message';

export default function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState<Date | string>(new Date());
  const [notes, setNotes] = useState('');
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCity() {
      try {
        setIsLoadingGeo(true);
        setGeoError(null);

        const resp = await fetch(
          `${CITY_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!resp.ok) throw new Error('Could not load city');
        const data = await resp.json();
        if (!data.countryCode) throw new Error('Please click on a city');

        setCityName(data.city || data.locality);
        setCountry(data.countryName);
      } catch (e) {
        setGeoError((e as Error).message);
      } finally {
        setIsLoadingGeo(false);
      }
    }

    loadCity();
  }, [lat, lng]);

  if (isLoadingGeo) return <Spinner />;
  if (geoError) return <Message message={geoError} />;

  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date.toString()}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => console.log(123)}>
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}
