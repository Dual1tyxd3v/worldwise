import { CountryType } from '../../types';
import styles from './country-item.module.css';

type CountryItemProps = {
  country: CountryType;
};

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
