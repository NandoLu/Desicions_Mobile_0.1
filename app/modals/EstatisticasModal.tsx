import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from '../../styles/ModalStyles';

interface EstatisticasModalProps {
  visible: boolean;
  onClose: () => void;
  country: any;
}

const EstatisticasModal: React.FC<EstatisticasModalProps> = ({ visible, onClose, country }) => {
  if (!visible) return null;

  return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Estatísticas</Text>
        <Image source={country.flag} style={styles.modalImage} />
        <Text style={styles.modalText}>País: {country.name}</Text>
        <Text style={styles.modalText}>PIB: {country.pib}</Text>
        <Button title="Fechar" onPress={onClose} />
      </View>
  );
};

export default EstatisticasModal;
