import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../styles/ModalStyles';

interface EducacaoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (educacaoPrimaria: number) => void;
  initialValue: number;
  sliderLocked: boolean; // Adicione esta linha
}

const EducacaoModal: React.FC<EducacaoModalProps> = ({ visible, onClose, onSave, initialValue, sliderLocked }) => {
  const [educacaoPrimaria, setEducacaoPrimaria] = React.useState(initialValue);

  if (!visible) return null;

  return (
    <View style={styles.modalContent}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.modalTitle}>Educação</Text>
        <Text style={styles.modalText}>Educação Primária</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={educacaoPrimaria}
          onValueChange={setEducacaoPrimaria}
          disabled={sliderLocked}
        />
        <Text style={styles.modalText}>Valor: {educacaoPrimaria}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Salvar" onPress={() => onSave(educacaoPrimaria)} disabled={sliderLocked} />
        <Button title="Fechar" onPress={onClose} />
      </View>
    </View>
  );
};

export default EducacaoModal;
