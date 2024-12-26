import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../styles/ModalStyles';

interface EducacaoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (educacaoPrimaria: number, ensinoMedio: number, ensinoSuperior: number) => void;
  onCalculate: (despesa: number, impactoPopularidade: number) => void;
  initialPrimaria: number;
  initialMedio: number;
  initialSuperior: number;
  sliderLocked: boolean;
}

const EducacaoModal: React.FC<EducacaoModalProps> = ({ visible, onClose, onSave, onCalculate, initialPrimaria, initialMedio, initialSuperior, sliderLocked }) => {
  const [educacaoPrimaria, setEducacaoPrimaria] = React.useState(initialPrimaria);
  const [ensinoMedio, setEnsinoMedio] = React.useState(initialMedio);
  const [ensinoSuperior, setEnsinoSuperior] = React.useState(initialSuperior);

  if (!visible) return null;

  const calcularDespesaImpactoPopularidade = () => {
    const despesa = educacaoPrimaria * -5 + ensinoMedio * -10 + ensinoSuperior * -15;
    const impactoPopularidade = educacaoPrimaria * 2 + ensinoMedio * 3 + ensinoSuperior * 4 - 5;
    onCalculate(despesa, impactoPopularidade);
  };

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

        <Text style={styles.modalText}>Ensino Médio</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={ensinoMedio}
          onValueChange={setEnsinoMedio}
          disabled={sliderLocked}
        />
        <Text style={styles.modalText}>Valor: {ensinoMedio}</Text>

        <Text style={styles.modalText}>Ensino Superior</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={ensinoSuperior}
          onValueChange={setEnsinoSuperior}
          disabled={sliderLocked}
        />
        <Text style={styles.modalText}>Valor: {ensinoSuperior}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Salvar" onPress={() => { onSave(educacaoPrimaria, ensinoMedio, ensinoSuperior); calcularDespesaImpactoPopularidade(); }} disabled={sliderLocked} />
        <Button title="Fechar" onPress={onClose} />
      </View>
    </View>
  );
};

export default EducacaoModal;
