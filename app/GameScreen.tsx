import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { loadGame, saveGame, advanceTurn, saveSliderValues, loadSliderValues, calculateEconomy } from './gamelogic/gameLogic';
import ImpostoModal from './modals/impostoMo';
import EducacaoModal from './modals/EducacaoMo';
import EstatisticasModal from './modals/EstatisticasModal';
import ConselhoModal from './modals/ConselhoModal';
import styles from '../styles/GameS_styles';

type RootStackParamList = {
  GameScreen: { country: any; leader: any };
};

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;
type GameData = {
  date: { year: number; month: number };
  country: any;
  leader: any;
  saldoEconomia: number;
  popularidade: number;
};

const GameScreen = () => {
  const route = useRoute<GameScreenRouteProp>();
  const { country = { flag: '', pib: 0 }, leader = { image: '' } } = route.params || {};

  if (!country || !leader) {
    console.error('Parâmetros "country" e "leader" não foram fornecidos.');
    return (
      <View style={styles.container}>
        <Text>Erro: Dados do jogo estão incompletos.</Text>
      </View>
    );
  }

  const [gameData, setGameData] = useState<GameData>({
    date: { year: 1940, month: 1 },
    country,
    leader,
    saldoEconomia: 0,
    popularidade: 15,
  });
  const [date, setDate] = useState({ year: 1940, month: 1 });
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [councilModalVisible, setCouncilModalVisible] = useState(false);
  const [impostoModalVisible, setImpostoModalVisible] = useState(false);
  const [educacaoModalVisible, setEducacaoModalVisible] = useState(false);
  const [receitaImposto, setReceitaImposto] = useState(0);
  const [despesaEducacao, setDespesaEducacao] = useState(0);
  const [impactoPopularidadeImposto, setImpactoPopularidadeImposto] = useState(0);
  const [impactoPopularidadeEducacao, setImpactoPopularidadeEducacao] = useState(0);
  const [popularidadeTotal, setPopularidadeTotal] = useState(51);
  const [impostoPobre, setImpostoPobre] = useState(0);
  const [impostoMedio, setImpostoMedio] = useState(0);
  const [impostoRico, setImpostoRico] = useState(0);
  const [educacaoPrimaria, setEducacaoPrimaria] = useState(0);
  const [ensinoMedio, setEnsinoMedio] = useState(0);
  const [ensinoSuperior, setEnsinoSuperior] = useState(0);
  const [impostoSliderLocked, setImpostoSliderLocked] = useState(false);
  const [educacaoSliderLocked, setEducacaoSliderLocked] = useState(false);
  const [saldoEconomia, setSaldoEconomia] = useState(0);
  const [popularidade, setPopularidade] = useState(51);

  useEffect(() => {
    const initializeGame = async () => {
      const savedGame = await loadGame();
      const savedSliders = await loadSliderValues();
      if (savedGame) {
        setGameData(savedGame);
        setDate(savedGame.date || { year: 1940, month: 1 });
        setSaldoEconomia(savedGame.saldoEconomia || 0);
        setPopularidade(savedGame.popularidade || 0);
      }
      setImpostoPobre(savedSliders.impostoPobre);
      setImpostoMedio(savedSliders.impostoMedio);
      setImpostoRico(savedSliders.impostoRico);
      setEducacaoPrimaria(savedSliders.educacaoPrimaria);
      setEnsinoMedio(savedSliders.ensinoMedio);
      setEnsinoSuperior(savedSliders.ensinoSuperior);

      // Executar a função de cada modal contida no botão "Salvar"
      calcularReceitaImpactoPopularidadeImposto(savedSliders.impostoPobre * 5 + savedSliders.impostoMedio * 10 + savedSliders.impostoRico * 15, 5 - (savedSliders.impostoPobre * 0.5 + savedSliders.impostoMedio * 0.75 + savedSliders.impostoRico * 1));
      calcularDespesaImpactoPopularidadeEducacao(savedSliders.educacaoPrimaria * -5 + savedSliders.ensinoMedio * -10 + savedSliders.ensinoSuperior * -15, savedSliders.educacaoPrimaria * 2 + savedSliders.ensinoMedio * 3 + savedSliders.ensinoSuperior * 4 - 5);
    };

    initializeGame();
  }, []);


  const handleAdvanceTurn = async () => {
    const newDate = advanceTurn(date);
    setDate(newDate);

    const updatedGameData = { ...gameData, date: newDate };
    const { saldoFinal, popularidade } = calculateEconomy(saldoEconomia, receitaImposto, despesaEducacao, popularidadeTotal + impactoPopularidadeImposto + impactoPopularidadeEducacao);
    updatedGameData.saldoEconomia = saldoFinal;
    updatedGameData.popularidade = popularidade;

    setSaldoEconomia(saldoFinal);
    setPopularidadeTotal(popularidade);
    setGameData(updatedGameData);
    await saveGame(updatedGameData);

    setImpostoSliderLocked(false);
    setEducacaoSliderLocked(false);
  };



  const handleSaveImposto = async (pobre: number, medio: number, rico: number) => {
    setImpostoPobre(pobre);
    setImpostoMedio(medio);
    setImpostoRico(rico);
    await saveSliderValues(pobre, medio, rico, educacaoPrimaria, ensinoMedio, ensinoSuperior);
    setImpostoSliderLocked(true);
  };

  const calcularReceitaImpactoPopularidadeImposto = (receita: number, impactoPopularidade: number) => {
    setReceitaImposto(receita);
    setImpactoPopularidadeImposto(impactoPopularidade);
  };


  const handleSaveEducacao = async (primaria: number, medio: number, superior: number) => {
    setEducacaoPrimaria(primaria);
    setEnsinoMedio(medio);
    setEnsinoSuperior(superior);
    await saveSliderValues(impostoPobre, impostoMedio, impostoRico, primaria, medio, superior);
    setEducacaoSliderLocked(true);
  };

  const calcularDespesaImpactoPopularidadeEducacao = (despesa: number, impactoPopularidade: number) => {
    setDespesaEducacao(despesa);
    setImpactoPopularidadeEducacao(impactoPopularidade);
  };





  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Image source={gameData.country.flag} style={styles.flag} />
        <Image source={gameData.leader.image} style={styles.leader} />
        <Text style={styles.pib}>PIB: {gameData.country.pib}</Text>
      </View>
      <View style={styles.dateBar}>
        <Text style={styles.date}> {saldoEconomia}</Text>
        <Text style={styles.date}> {popularidade}%</Text>
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
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.gridButton} onPress={() => setImpostoModalVisible(true)}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Imposto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Economia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Trabalho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton} onPress={() => setEducacaoModalVisible(true)}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Educação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Saúde</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Segurança</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Política Externa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Infraestrutura</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Meio Ambiente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Agricultura</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Indústria e Energia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Image source={require('../assets/images/img.jpg')} style={styles.gridButtonImage} />
          <Text style={styles.gridButtonText}>Social</Text>
        </TouchableOpacity>
      </View>
      {/* Modal de Estatísticas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={statsModalVisible}
        onRequestClose={() => setStatsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <EstatisticasModal
            visible={statsModalVisible}
            onClose={() => setStatsModalVisible(false)}
            country={country}
          />
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
          <ConselhoModal
            visible={councilModalVisible}
            onClose={() => setCouncilModalVisible(false)}
          />
        </View>
      </Modal>

      {/* Modal de Imposto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={impostoModalVisible}
        onRequestClose={() => setImpostoModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ImpostoModal
            visible={impostoModalVisible}
            onClose={() => setImpostoModalVisible(false)}
            onSave={handleSaveImposto}
            onCalculate={calcularReceitaImpactoPopularidadeImposto}
            initialPobre={impostoPobre}
            initialMedio={impostoMedio}
            initialRico={impostoRico}
            sliderLocked={impostoSliderLocked}
          />
        </View>
      </Modal>

      {/* Modal de Educação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={educacaoModalVisible}
        onRequestClose={() => setEducacaoModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <EducacaoModal
            visible={educacaoModalVisible}
            onClose={() => setEducacaoModalVisible(false)}
            onSave={handleSaveEducacao}
            onCalculate={calcularDespesaImpactoPopularidadeEducacao}
            initialPrimaria={educacaoPrimaria}
            initialMedio={ensinoMedio}
            initialSuperior={ensinoSuperior}
            sliderLocked={educacaoSliderLocked}
          />
        </View>
      </Modal>






    </View>
  );
};

export default GameScreen;
