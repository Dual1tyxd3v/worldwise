import { ReactNode, createContext, useContext, useReducer } from 'react';
import { authInitState, authReducer } from '../store/auth-store';
import { AuthContextType } from '../types';
import { FAKE_USER } from '../const';

const AuthContext = createContext<null | AuthContextType>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [{ isAuth, user }, dispatch] = useReducer(authReducer, authInitState);

  function login(email: string, pass: string) {
    if (email === FAKE_USER.email && pass === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('Use context inside according provider');
  return context;
}
