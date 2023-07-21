// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { FormEvent, useState } from 'react';
import styles from './form.module.css';
import Button from '../button/button';
import ButtonBack from '../button-back/button-back';

export default function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState<Date | string>(new Date());
  const [notes, setNotes] = useState('');

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
        {/* <span className={styles.flag}>{emoji}</span> */}
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
