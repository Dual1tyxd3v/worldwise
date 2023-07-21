import { useOwnContext } from '../../contexts/cities-context';
import { CityType, CountryType } from '../../types';
import CountryItem from '../country-item/country-item';
import Message from '../message/message';
import Spinner from '../spinner/spinner';
import styles from './countries-list.module.css';

export default function CountriesList() {
  const { isLoading, cities } = useOwnContext();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clickin on a city on the map" />
    );

  const countries = cities.reduce((acc, city) => {
    if (
      acc.map((country) => (country as CityType).country).includes(city.country)
    ) {
      return acc;
    } else return [...acc, { country: city.country, emoji: city.emoji }];
  }, [] as CountryType[]);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
