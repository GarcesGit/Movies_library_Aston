import { createContext } from 'react';

import { SigninUser, SignupUser } from '../../types/SignTypes/signTypes';

interface AuthContext {
  user: SigninUser | null;
  signIn: (userData: SigninUser) => void;
  signOut: () => void;
  signUp: (userData: SignupUser) => void;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);
