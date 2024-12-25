import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/index';
import NewGameScreen from './app/NewGameScreen';
import GameScreen from './app/GameScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewGameScreen" component={NewGameScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
