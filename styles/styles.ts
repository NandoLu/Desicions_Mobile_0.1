import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333', // Fundo cinza escuro
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Cinza escuro
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  picker: {
    width: '80%',
    color: '#FFFFFF',
    backgroundColor: '#444444',
    marginBottom: 20,
  },
  flag: {
    width: 100,
    height: 60,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  leader: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  error:{
    fontSize: 15,
  },
});

export default styles;
