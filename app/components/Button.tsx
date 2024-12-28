import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, title, disabled }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, disabled && styles.disabled]} disabled={disabled}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#cccccc',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Button;
