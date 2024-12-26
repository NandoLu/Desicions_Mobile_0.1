import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../styles/ModalStyles';

interface ImpostoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (impostoPobre: number) => void;
  initialValue: number;
}

const ImpostoModal: React.FC<ImpostoModalProps> = ({ visible, onClose, onSave, initialValue }) => {
  const [impostoPobre, setImpostoPobre] = React.useState(initialValue);

  if (!visible) return null;

  return (
      <View style={styles.modalContent}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.modalTitle}>Imposto</Text>
          <Text style={styles.modalText}>Imposto sobre os pobres</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={impostoPobre}
            onValueChange={setImpostoPobre}
            disabled={initialValue !== 0}
          />
          <Text style={styles.modalText}>Valor: {impostoPobre}</Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button title="Salvar" onPress={() => onSave(impostoPobre)} />
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
  );
};

export default ImpostoModal;
