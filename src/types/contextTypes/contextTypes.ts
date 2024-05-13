import { SigninUser, SignupUser } from '../SignTypes/signTypes';

export type AuthContextType = {
  user: SigninUser | null;
  signIn: (userData: SigninUser) => void;
  signOut: () => void;
  signUp: (userData: SignupUser) => void;
};
