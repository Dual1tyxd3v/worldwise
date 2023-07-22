import { FormEvent, useEffect, useState } from 'react';
import styles from './Login.module.css';
import NavPage from '../components/nav-page/nav-page';
import { useAuth } from '../contexts/fakeAuthContext';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTE } from '../const';
import Button from '../components/button/button';

export default function Login() {
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');
  const { isAuth, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    isAuth && navigate(APP_ROUTE.APP);
  }, [isAuth]);

  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();

    if (!email || !password) return;

    login(email, password);
  }

  return (
    <main className={styles.login}>
      <NavPage />
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="back">Login</Button>
        </div>
      </form>
    </main>
  );
}
