import { AuthActionType, AuthInitState, User } from '../types';

export const authInitState = {
  isAuth: false,
  user: null,
};

export const authReducer = (
  state: AuthInitState,
  action: AuthActionType
): AuthInitState => {
  switch (action.type) {
    case 'login':
      return { isAuth: true, user: action.payload as User };
    case 'logout':
      return authInitState;
    default:
      return authInitState;
  }
};
