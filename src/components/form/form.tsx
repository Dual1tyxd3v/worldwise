import { FormEvent, useEffect, useState } from 'react';
import styles from './form.module.css';
import Button from '../button/button';
import ButtonBack from '../button-back/button-back';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { APP_ROUTE, CITY_URL } from '../../const';
import Spinner from '../spinner/spinner';
import Message from '../message/message';
import DatePicker from 'react-datepicker';
import { useOwnContext } from '../../contexts/cities-context';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [emoji, setEmoji] = useState('');
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { uploadCity, isLoading } = useOwnContext();

  useEffect(() => {
    if (!lat && !lng) return;

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
        setEmoji(data.countryCode);
      } catch (e) {
        setGeoError((e as Error).message);
      } finally {
        setIsLoadingGeo(false);
      }
    }

    loadCity();
  }, [lat, lng]);

  if (isLoadingGeo) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking on the map" />;
  if (geoError) return <Message message={geoError} />;

  async function onSubmitHandler(e: FormEvent) {
    e.preventDefault();

    if (!notes || !cityName || !date || !lat || !lng) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: +lat,
        lng: +lng,
      },
      id: new Date().getTime(),
    };

    await uploadCity(newCity);
    navigate(`${APP_ROUTE.APP}/cities`);
  }

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={onSubmitHandler}>
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
        <DatePicker
          id="date"
          selected={date}
          onChange={(d) => setDate(d as Date)}
          dateFormat="dd/MM/yyyy"
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
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}
