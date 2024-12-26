import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%', // Cobrir a tela inteira horizontalmente
    height: '80%', // Tamanho fixo
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden', // Para garantir que o conteúdo não ultrapasse a modal
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage:{
    height: 50,
    width: 70,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  scrollView: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default styles;

// modalImage:{
//   height: 50,
//   width: 70,
// },