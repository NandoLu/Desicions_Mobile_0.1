import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './ModalsFooterStyles';

interface StatsModalProps {
  visible: boolean;
  onClose: () => void;
  country: string;
  pib: string;
  flagImage: any;
}

const StatsModal: React.FC<StatsModalProps> = ({ visible, onClose, country, pib, flagImage }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={flagImage} style={styles.flagImage} />
          <Text style={styles.infoText}>PIB: {pib}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default StatsModal;
