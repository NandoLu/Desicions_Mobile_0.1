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

export const calculateEconomy = (impostoPobre: number, educacaoPrimaria: number) => {
  const receitaImposto = impostoPobre * 5;
  const despesaEducacao = educacaoPrimaria * -5;
  const popularidadeImposto = 5 - (impostoPobre * 0.5);
  const popularidadeEducacao = educacaoPrimaria * 2 - 5;

  const receita = receitaImposto;
  const despesas = despesaEducacao;
  const saldoFinal = receita + despesas;
  const popularidade = 51 + popularidadeImposto + popularidadeEducacao;

  return {
    receita,
    despesas,
    saldoFinal,
    popularidade: Math.max(0, Math.min(100, popularidade)), // Limitar entre 0 e 100
  };
};

export const saveSliderValues = async (impostoPobre: number, educacaoPrimaria: number) => {
  const sliderValues = { impostoPobre, educacaoPrimaria };
  await AsyncStorage.setItem('sliderValues', JSON.stringify(sliderValues));
};

export const loadSliderValues = async () => {
  const savedValues = await AsyncStorage.getItem('sliderValues');
  if (savedValues) {
    return JSON.parse(savedValues);
  }
  return { impostoPobre: 0, educacaoPrimaria: 0 };
};
