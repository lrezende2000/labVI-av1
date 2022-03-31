import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUser {
  name: string;
}

type UserContextType = {
  user: IUser
  storeUser: (name: string) => void
  resetUser: () => void
}

export const UserContext = createContext<UserContextType>({
  user: {
    name: ''
  },
  storeUser: () => { },
  resetUser: () => { }
});

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = useState<IUser>({ name: '' });

  const storeUser = async (name: string) => {
    await AsyncStorage.setItem('user', JSON.stringify({ name }));
    setUser({ name });
  }

  const resetUser = async () => {
    await AsyncStorage.setItem('user', JSON.stringify({ name: '' }));
    setUser({ name: '' });
  }

  useEffect(() => {
    (async () => {
      const storedUser = await AsyncStorage.getItem('user');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser({ name: '' });
      }
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, storeUser, resetUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
