import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/HomeScreen';
import { AddToDoScreen } from '../screens/AddToDoScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';

import { UserContext } from '../context/UserContext';

const Stack = createNativeStackNavigator();

function TabBar() {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.name ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewToDo"
              component={AddToDoScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { TabBar };
