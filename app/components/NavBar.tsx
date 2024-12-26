import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface NavButtonProps {
  country: any;
  leader: any;
}

const NavButton: React.FC<NavButtonProps> = ({ country, leader }) => {
  return (
    <View style={styles.nav}>
      <Image source={country.flag} style={styles.flag} />
      <Image source={leader.image} style={styles.leader} />
      <Text style={styles.pib}>PIB: {country.pib}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#444444',
  },
  flag: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  leader: {
    width: 50,
    height: 50,
  },
  pib: {
    fontSize: 10,
    color: '#FFFFFF',
    marginLeft: 10,
  },
});

export default NavButton;
