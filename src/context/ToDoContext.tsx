import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IToDo {
  id: string;
  description: string;
  checked: boolean;
}

type ToDoContextType = {
  toDoList: IToDo[];
  addToDo: (toDo: string) => void;
  removeToDo: (id: string) => void;
  toggleStatus: (id: string) => void;
  resetToDo: () => void;
}

export const ToDoContext = createContext<ToDoContextType>({
  toDoList: [],
  addToDo: () => { },
  removeToDo: () => { },
  toggleStatus: () => { },
  resetToDo: () => { },
});

export const ToDoProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [toDoList, setToDoList] = useState<IToDo[]>([]);

  const addToDo = async (toDo: string) => {
    const newToDoList = [...toDoList, { id: Date.now().toString(), description: toDo, checked: false }];
    setToDoList(newToDoList);
    await AsyncStorage.setItem('toDoList', JSON.stringify(newToDoList));
  }

  const removeToDo = async (id: string) => {
    const newToDoList = toDoList.filter(toDo => toDo.id !== id);
    setToDoList(newToDoList);
    await AsyncStorage.setItem('toDoList', JSON.stringify(newToDoList));
  }

  const toggleStatus = async (id: string) => {
    const newToDoList = toDoList.map(toDo => {
      const newToDo = { ...toDo };
      if (newToDo.id === id) {
        newToDo.checked = !newToDo.checked;
      }

      return newToDo;
    });
    setToDoList(newToDoList);
    await AsyncStorage.setItem('toDoList', JSON.stringify(newToDoList));
  }

  const resetToDo = async () => {
    setToDoList([]);
    await AsyncStorage.setItem('toDoList', JSON.stringify([]));
  }

  useEffect(() => {
    (async () => {
      const storedToDo = await AsyncStorage.getItem('toDoList');

      if (storedToDo) {
        setToDoList(JSON.parse(storedToDo));
      } else {
        setToDoList([]);
      }
    })();
  }, []);

  return (
    <ToDoContext.Provider
      value={{ toDoList, addToDo, removeToDo, toggleStatus, resetToDo }}
    >
      {children}
    </ToDoContext.Provider>
  );
}
