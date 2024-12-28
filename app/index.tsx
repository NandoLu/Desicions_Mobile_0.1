import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './screens/MainPage';
import NewGame from './screens/NewGame';
import GameMain from './screens/GameMain';

// Definição do tipo RootStackParamList
export type RootStackParamList = {
  Main: undefined;
  NewGame: undefined;
  GameMain: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
      <Stack.Screen name="NewGame" component={NewGame} options={{ title: 'Novo Jogo' }} />
      <Stack.Screen name="GameMain" component={GameMain} options={{ headerShown: false }} />
      {/* Outras telas podem ser adicionadas aqui */}
    </Stack.Navigator>
  );
}
