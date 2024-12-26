import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

type RootStackParamList = {
  Home: undefined;
  NewGameScreen: undefined;
  GameScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const checkSavedGame = async () => {
      const savedGame = await AsyncStorage.getItem('gameSave');
      if (savedGame) {
        setHasSavedGame(true);
      }
    };

    checkSavedGame();
  }, []);

  const handleNewGame = () => {
    if (hasSavedGame) {
      Alert.alert(
        'Jogo Salvo',
        'Já existe um jogo salvo. Deseja continuar o jogo atual ou substituir o save atual pelo novo?',
        [
          { text: 'Continuar Jogo', onPress: () => navigation.navigate('GameScreen') },
          { text: 'Substituir Save', onPress: () => navigation.navigate('NewGameScreen') },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    } else {
      navigation.navigate('NewGameScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.logo} />
      <TouchableOpacity style={[styles.button, !hasSavedGame && styles.disabledButton]} disabled={!hasSavedGame} onPress={() => navigation.navigate('GameScreen')}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNewGame}>
        <Text style={styles.buttonText}>Novo Jogo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="settings" size={24} color="white" />
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Apoiar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
