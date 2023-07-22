import { useAuth } from '../../contexts/fakeAuthContext';
import styles from './user.module.css';
import { APP_ROUTE } from '../../const';
import { useNavigate } from 'react-router-dom';

export default function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const { name, avatar } = user;

  function onClickHandler() {
    logout();
    navigate(APP_ROUTE.MAIN);
  }

  return (
    <div className={styles.user}>
      <img src={avatar} alt={name} />
      <span>Welcome, {name}</span>
      <button onClick={onClickHandler}>Logout</button>
    </div>
  );
}
