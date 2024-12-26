import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333', // Fundo cinza escuro
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#444444',
  },
  flag: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  leader: {
    width: 50,
    height: 50,
  },
  pib: {
    fontSize: 10,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  dateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    backgroundColor: '#222222',
    position: 'absolute',
    bottom: 70,
  },
  date: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  advanceButton: {
    position: 'absolute',
    bottom: 120,
    right: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  advanceButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  title: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#444444',
    padding: 10,
  },
  footerButton: {
    marginHorizontal: 10,
  },
  footerButtonImage: {
    width: 50,
    height: 50,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  gridButton: {
    width: '30%',
    alignItems: 'center',
    margin: 5,

  },
  gridButtonImage: {
    width: 50,
    height: 50,
  },
  gridButtonText: {
    fontSize: 10,
    color: '#FFFFFF',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 60,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default styles;
