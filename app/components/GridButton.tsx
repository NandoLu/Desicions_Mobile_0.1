import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

interface GridButtonProps {
  title: string;
  onPress: () => void;
}

const GridButton: React.FC<GridButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.gridButton} onPress={onPress}>
      <Image source={require('../../assets/images/img.jpg')} style={styles.gridButtonImage} />
      <Text style={styles.gridButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridButton: {
    width: '30%',
    alignItems: 'center',
    margin: 5,
  },
  gridButtonImage: {
    width: 50,
    height: 50,
  },
  gridButtonText: {
    fontSize: 10,
    color: '#FFFFFF',
    marginTop: 5,
  },
});

export default GridButton;
