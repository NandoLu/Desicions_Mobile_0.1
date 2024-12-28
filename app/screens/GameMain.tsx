import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatsModal from './modals/StatsModal';
import AdviceModal from './modals/AdviceModal';
import styles from './GameMain.styles';
import { Country, Leader } from './countries';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../index';

type GameMainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameMain'>;

interface Scenario extends Country {
  leader: Leader;
}

interface Props {
  navigation: GameMainScreenNavigationProp;
}

const GameMain: React.FC<Props> = ({ navigation }) => {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [isStatsModalVisible, setIsStatsModalVisible] = useState(false);
  const [isAdviceModalVisible, setIsAdviceModalVisible] = useState(false);

  useEffect(() => {
    const fetchScenario = async () => {
      const savedScenario = await AsyncStorage.getItem('currentScenario');
      if (savedScenario) {
        setScenario(JSON.parse(savedScenario));
      }
    };

    fetchScenario();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Jogo em andamento',
          'Você deseja ir para o menu principal?',
          [
            { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
            { text: 'Ir para o Menu', onPress: () => navigation.navigate('Main') },
          ],
          { cancelable: false }
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  if (!scenario) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={scenario.images.flag} style={styles.flagImage} />
        <View style={styles.headerText}>
          <Text style={styles.countryText}>{scenario.name}</Text>
          <Text style={styles.infoText}>PIB: {scenario.details.pib}</Text>
        </View>
        <Image source={scenario.leader.image} style={styles.leaderImage} />
      </View>
      {/* Restante da interface do jogo */}
      <View style={styles.infoBar} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setIsStatsModalVisible(true)}>
          <Image source={require('../../assets/img/img.png')} style={styles.footerButtonImage} />
        </TouchableOpacity>
        <View style={styles.footerButtonStatic}>
          <Image source={require('../../assets/img/img.png')} style={styles.footerButtonImage} />
        </View>
        <TouchableOpacity style={styles.footerButton} onPress={() => setIsAdviceModalVisible(true)}>
          <Image source={require('../../assets/img/img.png')} style={styles.footerButtonImage} />
        </TouchableOpacity>
      </View>
      <StatsModal
        visible={isStatsModalVisible}
        onClose={() => setIsStatsModalVisible(false)}
        country={scenario.name}
        pib={scenario.details.pib}
        flagImage={scenario.images.flag}
      />
      <AdviceModal
        visible={isAdviceModalVisible}
        onClose={() => setIsAdviceModalVisible(false)}
      />
    </View>
  );
};

export default GameMain;
