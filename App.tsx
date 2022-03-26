import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components'

import { theme } from './src/global/theme'
import { TabBar } from './src/routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='auto' />
      <TabBar />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
