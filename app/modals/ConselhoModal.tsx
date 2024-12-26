import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../../styles/ModalStyles';

interface ConselhoModalProps {
  visible: boolean;
  onClose: () => void;
}

const ConselhoModal: React.FC<ConselhoModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (

      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Conselho</Text>
        <Text style={styles.modalText}>Aqui vai o conselho...</Text>
        <Button title="Fechar" onPress={onClose} />
      </View>

  );
};

export default ConselhoModal;
