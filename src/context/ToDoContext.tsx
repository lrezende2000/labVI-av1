import React, { useState, createContext, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { UserContext } from './UserContext';

interface IToDo {
  id: number;
  description: string;
  completed: boolean;
}

type ToDoContextType = {
  toDoList: IToDo[];
  addToDo: (toDo: string) => void;
  removeToDo: (id: number) => void;
  toggleStatus: (id: number) => void;
}

export const ToDoContext = createContext<ToDoContextType>({
  toDoList: [],
  addToDo: () => { },
  removeToDo: () => { },
  toggleStatus: () => { },
});

export const ToDoProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [toDoList, setToDoList] = useState<IToDo[]>([]);
  const { token } = useContext(UserContext);

  const getTodos = async () => {
    try {
      const { data } = await api.get("/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setToDoList(data.todos);
    } catch (err) {}
  }

  const addToDo = async (toDo: string) => {
    try {
      await api.post("/todo", { description: toDo }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await getTodos();
    } catch (err) {}
  }

  const removeToDo = async (id: number) => {
    try {
      await api.delete(`/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      await getTodos();
    } catch (err) {}
  }

  const toggleStatus = async (id: number) => {
    try {
      await api.put(`/todo/toggleCheck/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      await getTodos();
    } catch (err) {}
  }

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          await getTodos();
        }
      } catch (err) {
        setToDoList([]);
      }
    })();
  }, []);

  return (
    <ToDoContext.Provider
      value={{ toDoList, addToDo, removeToDo, toggleStatus }}
    >
      {children}
    </ToDoContext.Provider>
  );
}
