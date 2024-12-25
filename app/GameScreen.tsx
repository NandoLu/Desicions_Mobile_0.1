import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  GameScreen: { country: any; leader: any };
};

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

const GameScreen = () => {
  const route = useRoute<GameScreenRouteProp>();
  const [gameData, setGameData] = useState(route.params);

  useEffect(() => {
    const loadGame = async () => {
      const savedGame = await AsyncStorage.getItem('gameSave');
      if (savedGame) {
        setGameData(JSON.parse(savedGame));
      }
    };

    loadGame();
  }, []);

  if (!gameData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando...</Text>
      </View>
    );
  }

  const { country, leader } = gameData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={country.flag} style={styles.flag} />
        <Image source={leader.image} style={styles.leader} />
      </View>
      <Text style={styles.title}>Bem-vindo ao jogo!</Text>
      {/* Adicione mais lógica de jogo aqui */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333', // Fundo cinza escuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  flag: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  leader: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GameScreen;
