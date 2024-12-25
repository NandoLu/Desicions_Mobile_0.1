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
