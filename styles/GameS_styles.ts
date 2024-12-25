import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333', // Fundo cinza escuro
    justifyContent: 'center',
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
    fontSize: 18,
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
    bottom: 60,
  },
  date: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  advanceButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  advanceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
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
});

export default styles;
