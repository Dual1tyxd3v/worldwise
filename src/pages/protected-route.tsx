import { ReactNode, useEffect } from 'react';
import { useAuth } from '../contexts/fakeAuthContext';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTE } from '../const';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate(APP_ROUTE.MAIN);
  }, [isAuth, navigate]);
  return children;
}
