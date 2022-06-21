import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { Text } from 'react-native';

interface IUser {
  name: string;
}

type UserContextType = {
  user: IUser;
  storeUser: (name: string) => void;
  token: string;
  storeToken: (token: string) => void;
  resetUser: () => void;
  resetAppState: () => Promise<void>
}

export const UserContext = createContext<UserContextType>({
  user: {
    name: ''
  },
  storeUser: () => { },
  storeToken: () => { },
  resetUser: () => { },
  token: '',
  resetAppState: async () => {}
});

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = useState<IUser>({ name: "" });
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const storeUser = (name: string) => {
    setUser({ name });
  }

  const resetAppState = async () => {
    resetUser();
    setToken('');
    await AsyncStorage.removeItem("todo@token");
  };

  const storeToken = async (token: string) => {
    setToken(token);
    await AsyncStorage.setItem("todo@token", token);
  }

  const resetUser = () => {
    setUser({ name: '' });
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const storedToken = await AsyncStorage.getItem('todo@token');

        if (storedToken) {
          setToken(storedToken);

          const { data } = await api.get("/user/profile", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            }
          });

          storeUser(data.user.name);
        }
      } catch(err) {
        storeToken('');
        storeUser('');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <UserContext.Provider
      value={{ user, storeUser, resetUser, token, storeToken, resetAppState }}
    >
      {loading ? <Text>Carregando</Text> : children}
    </UserContext.Provider>
  );
}
