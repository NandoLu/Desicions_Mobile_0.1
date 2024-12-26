import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../styles/ModalStyles';

interface ImpostoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (impostoPobre: number, impostoMedio: number, impostoRico: number) => void;
  onCalculate: (receita: number, impactoPopularidade: number) => void;
  initialPobre: number;
  initialMedio: number;
  initialRico: number;
  sliderLocked: boolean;
}

const ImpostoModal: React.FC<ImpostoModalProps> = ({ visible, onClose, onSave, onCalculate, initialPobre, initialMedio, initialRico, sliderLocked }) => {
  const [impostoPobre, setImpostoPobre] = React.useState(initialPobre);
  const [impostoMedio, setImpostoMedio] = React.useState(initialMedio);
  const [impostoRico, setImpostoRico] = React.useState(initialRico);

  if (!visible) return null;

  const calcularReceitaImpactoPopularidade = () => {
    const receita = impostoPobre * 5 + impostoMedio * 10 + impostoRico * 15;
    const impactoPopularidade = 5 - (impostoPobre * 0.5 + impostoMedio * 0.75 + impostoRico * 1);
    onCalculate(receita, impactoPopularidade);
  };

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
          disabled={sliderLocked}
        />
        <Text style={styles.modalText}>Valor: {impostoPobre}</Text>

        <Text style={styles.modalText}>Imposto sobre a classe média</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={impostoMedio}
          onValueChange={setImpostoMedio}
          disabled={sliderLocked}
        />
        <Text style={styles.modalText}>Valor: {impostoMedio}</Text>

        <Text style={styles.modalText}>Imposto sobre os ricos</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={impostoRico}
          onValueChange={setImpostoRico}
          disabled={sliderLocked}
        />
        <Text style={styles.modalText}>Valor: {impostoRico}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Salvar" onPress={() => { onSave(impostoPobre, impostoMedio, impostoRico); calcularReceitaImpactoPopularidade(); }} disabled={sliderLocked} />
        <Button title="Fechar" onPress={onClose} />
      </View>
    </View>
  );
};

export default ImpostoModal;
