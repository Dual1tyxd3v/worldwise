import { CitiesType } from '../../types';
import CityItem from '../city-item/city-item';
import Message from '../message/message';
import Spinner from '../spinner/spinner';
import styles from './city-list.module.css';

type CityListProps = {
  cities: CitiesType;
  isLoading: boolean;
};

export default function CityList({ cities, isLoading }: CityListProps) {
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
