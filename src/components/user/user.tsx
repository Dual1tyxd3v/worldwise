import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/fakeAuthContext';
import styles from './user.module.css';
import { APP_ROUTE } from '../../const';

export default function User() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to={APP_ROUTE.MAIN} />;

  const { name, avatar } = user;

  return (
    <div className={styles.user}>
      <img src={avatar} alt={name} />
      <span>Welcome, {name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
