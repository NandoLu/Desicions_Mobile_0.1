import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    width: '100%',
    height: 80, // Altura fixa em pixels
    marginBottom: 10,
  },
  flagImage: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  countryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
  },
  leaderImage: {
    width: 40,
    height: 60,
    marginLeft: 10,
  },
  infoBar: {
    width: '100%',
    height: 35, // Altura ajustada para 35 pixels
    backgroundColor: '#eee',
    justifyContent: 'center', // Centraliza as informações verticalmente
    alignItems: 'center', // Centraliza as informações horizontalmente
    position: 'absolute',
    bottom: 80, // Distância da parte inferior da tela ajustada para 80 pixels
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    width: '100%',
    height: 80, // Altura fixa em pixels
    position: 'absolute',
    bottom: 0,
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonStatic: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5, // Tornar o botão estático visualmente diferente
  },
  footerButtonImage: {
    width: 40,
    height: 40,
  },
});

export default styles;
