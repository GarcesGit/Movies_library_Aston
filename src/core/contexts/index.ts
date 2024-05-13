import { createContext } from 'react';
import { AuthContextType } from '../../types/contextTypes/contextTypes';

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
