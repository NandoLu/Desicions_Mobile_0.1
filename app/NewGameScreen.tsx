import React, { useState } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/NewGameS_styles';

type RootStackParamList = {
  GameScreen: { country: any; leader: any };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'GameScreen'>;

interface CountryData {
  [key: string]: {
    flag: any;
    pib: string;
    receita: string;
    gasto: string;
    leaders: { name: string; image: any }[];
  };
}

const countryData: CountryData = {
  Brasil: {
    flag: require('../assets/images/brasil.jpg'),
    pib: '2.05 trilhões USD',
    receita: '1.5 trilhões USD',
    gasto: '1.7 trilhões USD',
    leaders: [
      { name: 'Getúlio Vargas', image: require('../assets/images/getulio_vargas.jpg') },
      { name: 'Juscelino Kubitschek', image: require('../assets/images/juscelino_kubitschek.jpg') },
    ],
  },
  URSS: {
    flag: require('../assets/images/urss.jpg'),
    pib: '2.66 trilhões USD',
    receita: '1.8 trilhões USD',
    gasto: '2.0 trilhões USD',
    leaders: [
      { name: 'Joseph Stalin', image: require('../assets/images/joseph_stalin.jpg') },
      { name: 'Nikita Khrushchev', image: require('../assets/images/nikita_khrushchev.jpg') },
    ],
  },
};

const NewGameScreen = () => {
  const [country, setCountry] = useState('');
  const [leader, setLeader] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setLeader(''); // Resetar a seleção de líder
  };

  const startGame = async () => {
    const selectedCountry = countryData[country];
    const selectedLeader = selectedCountry.leaders.find((l) => l.name === leader);
    const gameData = { country: selectedCountry, leader: selectedLeader };
    await AsyncStorage.setItem('gameSave', JSON.stringify(gameData));
    navigation.navigate('GameScreen', gameData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o País</Text>
      <Picker selectedValue={country} onValueChange={handleCountryChange} style={styles.picker}>
        <Picker.Item label="Brasil" value="Brasil" />
        <Picker.Item label="URSS" value="URSS" />
      </Picker>
      {country && (
        <>
          <Image source={countryData[country].flag} style={styles.flag} />
          <Text style={styles.info}>PIB: {countryData[country].pib}</Text>
          <Text style={styles.info}>Receita: {countryData[country].receita}</Text>
          <Text style={styles.info}>Gasto: {countryData[country].gasto}</Text>
          <Text style={styles.title}>Selecione o Líder</Text>
          <Picker selectedValue={leader} onValueChange={(itemValue) => setLeader(itemValue)} style={styles.picker}>
            {countryData[country].leaders.map((leader) => (
              <Picker.Item key={leader.name} label={leader.name} value={leader.name} />
            ))}
          </Picker>
          {leader && (
            <Image source={countryData[country].leaders.find((l) => l.name === leader)?.image} style={styles.leader} />
          )}
        </>
      )}
      <Button title="Iniciar Jogo" onPress={startGame} disabled={!country || !leader} />
    </View>
  );
};

export default NewGameScreen;
