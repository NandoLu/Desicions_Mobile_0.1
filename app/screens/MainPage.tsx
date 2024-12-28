import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../index'; // Certifique-se de ajustar o caminho conforme necessário
import styles from './MainPage.styles';
import { MaterialIcons } from '@expo/vector-icons'; // Certifique-se de ter instalado o expo/vector-icons

type MainPageNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const MainPage = () => {
  const [isGameSaved, setIsGameSaved] = useState(false);
  const navigation = useNavigation<MainPageNavigationProp>();

  useEffect(() => {
    const checkSavedGame = async () => {
      const savedScenario = await AsyncStorage.getItem('currentScenario');
      setIsGameSaved(savedScenario !== null);
    };

    checkSavedGame();
  }, []);

  const handleNewGamePress = () => {
    if (isGameSaved) {
      Alert.alert(
        "Jogo Salvo",
        "Você já possui um jogo salvo. Deseja continuar o jogo atual ou criar um novo jogo?",
        [
          { text: "Continuar Jogo", onPress: () => navigation.navigate('GameMain') },
          { text: "Novo Jogo", onPress: () => {
              AsyncStorage.removeItem('currentScenario');
              setIsGameSaved(false);
              navigation.navigate('NewGame');
            }
          },
        ]
      );
    } else {
      navigation.navigate('NewGame');
    }
  };

  const handleDeleteGamePress = async () => {
    await AsyncStorage.removeItem('currentScenario');
    setIsGameSaved(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/logo.png')} style={styles.logo} />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, !isGameSaved && styles.buttonDisabled]} onPress={() => navigation.navigate('GameMain')} disabled={!isGameSaved}>
          <Text style={styles.buttonText}>Continuar jogo</Text>
        </TouchableOpacity>
        {isGameSaved && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteGamePress}>
            <MaterialIcons name="delete" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNewGamePress}>
        <Text style={styles.buttonText}>Novo jogo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Apoiar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainPage;
