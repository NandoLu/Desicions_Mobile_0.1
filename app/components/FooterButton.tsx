import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface FooterButtonProps {
  onPress: () => void;
}

const FooterButton: React.FC<FooterButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.footerButton} onPress={onPress}>
      <Image source={require('../../assets/images/img.jpg')} style={styles.footerButtonImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footerButton: {
    marginHorizontal: 10,
  },
  footerButtonImage: {
    width: 50,
    height: 50,
  },
});

export default FooterButton;
