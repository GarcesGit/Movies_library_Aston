import React, { useEffect, useState, useMemo } from 'react';
import RouterConfig from './routes/routerConfig';
import { AuthContext } from './core/contexts';
import { SigninUser, SignupUser, Users } from './types/SignTypes/signTypes';
import './assets/styles/App.css';
import { getLocalStorageItem } from './utils/getLocalStorageItem';

type LayoutProps = {
  children: React.ReactNode;
};

const usersDB: Users = {
  admin: { username: 'admin', password: 'admin' },
};

const AuthProvider = ({ children }: LayoutProps) => {
  const currentUser = getLocalStorageItem<SigninUser>('user');
  const [user, setUser] = useState(currentUser ? currentUser : null);

  const signIn = (userData: SigninUser) => {
    userData = { ...userData, isSignIn: true };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({
      username: userData.username,
      password: userData.password,
      isSignIn: true,
    });
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const signUp = (userData: SignupUser) => {
    let usersDB = getLocalStorageItem<Users>('usersDB');
    const { username, password } = userData;
    const user: Users = { [username]: { username, password } };
    usersDB = { ...usersDB, ...user };
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
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

function App() {
  useEffect(() => {
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <RouterConfig />
      </div>
    </AuthProvider>
  );
}

export default App;
