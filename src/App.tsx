import React, { useEffect } from 'react';
import RouterConfig from './routes/routerConfig';
import { Users } from './types/SignTypes/signTypes';
import { AuthProvider } from './core/providers/authProvider';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from './utils/helpers/localStorageFns';
import { USERS_DB } from './utils/constants/constants';
import './assets/styles/App.css';

const initialUsersDB: Users = {
  admin: { username: 'admin', password: 'admin' },
};

function App() {
  useEffect(() => {
    const usersDB = getLocalStorageItem<Users>(USERS_DB);
    if (!usersDB) {
      setLocalStorageItem(USERS_DB, initialUsersDB);
    }
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
