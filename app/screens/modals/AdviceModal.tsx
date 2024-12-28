import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from './ModalsFooterStyles';

interface AdviceModalProps {
  visible: boolean;
  onClose: () => void;
}

const AdviceModal: React.FC<AdviceModalProps> = ({ visible, onClose }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.infoText}>Aqui vai um conselho</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AdviceModal;
