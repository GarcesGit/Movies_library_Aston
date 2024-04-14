import React, { useMemo, useState } from 'react';
import { AuthContext } from '../contexts';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '../../utils/helpers/localStorageFns';
import { SigninUser, SignupUser, Users } from '../../types/SignTypes/signTypes';
import { CURRENT_USER, USERS_DB } from '../../utils/constants/constants';

type LayoutProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: LayoutProps) => {
  const currentUser = getLocalStorageItem<SigninUser>(CURRENT_USER);
  const [user, setUser] = useState(currentUser ? currentUser : null);

  const signIn = (userData: SigninUser) => {
    userData = { ...userData, isSignIn: true };
    setLocalStorageItem(CURRENT_USER, userData);
    setUser({
      username: userData.username,
      password: userData.password,
      isSignIn: true,
    });
  };

  const signOut = () => {
    removeLocalStorageItem(CURRENT_USER);
    setUser(null);
  };

  const signUp = (userData: SignupUser) => {
    let usersDB = getLocalStorageItem<Users>(USERS_DB);
    const { username, password } = userData;
    const user: Users = { [username]: { username, password } };
    usersDB = { ...usersDB, ...user };
    setLocalStorageItem(USERS_DB, usersDB);
  };

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      signUp,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
