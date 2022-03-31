import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import { ToDoProvider } from './src/context/ToDoContext';
import { UserProvider } from './src/context/UserContext';
import { theme } from './src/global/theme';
import { TabBar } from './src/routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='auto' />
      <UserProvider>
        <ToDoProvider>
          <TabBar />
        </ToDoProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
