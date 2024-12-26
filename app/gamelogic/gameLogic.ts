import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadGame = async () => {
  const savedGame = await AsyncStorage.getItem('gameSave');
  if (savedGame) {
    return JSON.parse(savedGame);
  }
  return null;
};

export const saveGame = async (gameData: any) => {
  await AsyncStorage.setItem('gameSave', JSON.stringify(gameData));
};

export const advanceTurn = (date: { year: number; month: number }) => {
  let newMonth = date.month + 1;
  let newYear = date.year;
  if (newMonth > 12) {
    newMonth = 1;
    newYear += 1;
  }
  return { year: newYear, month: newMonth };
};

export const calculateEconomy = (saldoAtual: number, receitaImposto: number, despesaEducacao: number, popularidadeTotal: number) => {
  const saldoFinal = saldoAtual + receitaImposto + despesaEducacao;
  const popularidade = Math.max(0, Math.min(100, popularidadeTotal)).toFixed(1);

  return {
    saldoFinal,
    popularidade: parseFloat(popularidade),
  };
};




export const saveSliderValues = async (impostoPobre: number, impostoMedio: number, impostoRico: number, educacaoPrimaria: number, ensinoMedio: number, ensinoSuperior: number) => {
  const sliderValues = { impostoPobre, impostoMedio, impostoRico, educacaoPrimaria, ensinoMedio, ensinoSuperior };
  await AsyncStorage.setItem('sliderValues', JSON.stringify(sliderValues));
};


export const loadSliderValues = async () => {
  const savedValues = await AsyncStorage.getItem('sliderValues');
  if (savedValues) {
    return JSON.parse(savedValues);
  }
  return { impostoPobre: 0, impostoMedio: 0, impostoRico: 0, educacaoPrimaria: 0, ensinoMedio: 0, ensinoSuperior: 0 };
};

