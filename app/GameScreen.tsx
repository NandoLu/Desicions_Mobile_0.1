import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { loadGame, saveGame, advanceTurn } from './gamelogic/gameLogic';
import styles from '../styles/GameS_styles';

type RootStackParamList = {
  GameScreen: { country: any; leader: any };
};

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

const GameScreen = () => {
  const route = useRoute<GameScreenRouteProp>();
  const [gameData, setGameData] = useState(route.params);
  const [date, setDate] = useState({ year: 1940, month: 1 });
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [councilModalVisible, setCouncilModalVisible] = useState(false);

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

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

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
        <Text style={styles.date}> {monthNames[date.month - 1]} {date.year}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setStatsModalVisible(true)}>
          <Image source={require('../assets/images/img.jpg')} style={styles.footerButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.footerButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => setCouncilModalVisible(true)}>
          <Image source={require('../assets/images/img.jpg')} style={styles.footerButtonImage} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.advanceButton} onPress={handleAdvanceTurn}>
        <Text style={styles.advanceButtonText}>Avançar</Text>
      </TouchableOpacity>
      {/* Modal de Estatísticas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={statsModalVisible}
        onRequestClose={() => setStatsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Estatísticas</Text>
            <Image source={country.flag} style={styles.modalImage} />
            <Text style={styles.modalText}>PIB: {country.pib}</Text>
            <Button title="Fechar" onPress={() => setStatsModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {/* Modal de Conselho */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={councilModalVisible}
        onRequestClose={() => setCouncilModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Conselho</Text>
            <Text style={styles.modalText}>Aqui vai o conselho...</Text>
            <Button title="Fechar" onPress={() => setCouncilModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {/* Adicione mais lógica de jogo aqui */}
    </View>
  );
};

export default GameScreen;
