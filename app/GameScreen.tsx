import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { loadGame, saveGame, advanceTurn } from './gameLogic';
import styles from '../styles/GameS_styles';

type RootStackParamList = {
  GameScreen: { country: any; leader: any };
};

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

const GameScreen = () => {
  const route = useRoute<GameScreenRouteProp>();
  const [gameData, setGameData] = useState(route.params);
  const [date, setDate] = useState({ year: 1940, month: 1 });

  useEffect(() => {
    const initializeGame = async () => {
      const savedGame = await loadGame();
      if (savedGame) {
        setGameData(savedGame);
        setDate(savedGame.date || { year: 1940, month: 1 });
      }
    };

    initializeGame();
  }, []);

  const handleAdvanceTurn = async () => {
    const newDate = advanceTurn(date);
    setDate(newDate);

    const updatedGameData = { ...gameData, date: newDate };
    setGameData(updatedGameData);
    await saveGame(updatedGameData);
  };

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
      <View style={styles.nav}>
        <Image source={country.flag} style={styles.flag} />
        <Image source={leader.image} style={styles.leader} />
        <Text style={styles.pib}>PIB: {country.pib}</Text>
      </View>
      <Text style={styles.title}>Bem-vindo ao jogo!</Text>
      <View style={styles.dateBar}>
        <Text style={styles.date}>Data: {date.month}/{date.year}</Text>
        <TouchableOpacity style={styles.advanceButton} onPress={handleAdvanceTurn}>
          <Text style={styles.advanceButtonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.footerButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.footerButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.footerButtonImage} />
        </TouchableOpacity>
      </View>
      {/* Adicione mais lógica de jogo aqui */}
    </View>
  );
};

export default GameScreen;
