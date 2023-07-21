import { useOwnContext } from '../../contexts/cities-context';
import CityItem from '../city-item/city-item';
import Message from '../message/message';
import Spinner from '../spinner/spinner';
import styles from './city-list.module.css';

export default function CityList() {
  const {isLoading, cities} = useOwnContext();
  
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clickin on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
