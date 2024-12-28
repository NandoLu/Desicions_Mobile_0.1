import React from 'react';
import { View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importação correta
import styles from './CountrySelector.styles';

interface CountrySelectorProps {
  countries: { [key: string]: string[] };
  selectedCountry: string | null;
  onCountryChange: (country: string | null) => void;
  selectedLeader: string | null;
  onLeaderChange: (leader: string | null) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selectedCountry,
  onCountryChange,
  selectedLeader,
  onLeaderChange,
}) => {
  const leaders = selectedCountry ? countries[selectedCountry] : [];

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCountry}
        style={styles.picker}
        onValueChange={(itemValue) => onCountryChange(itemValue)}
      >
        <Picker.Item label="Selecione um país" value={null} />
        {Object.keys(countries).map((country) => (
          <Picker.Item label={country} value={country} key={country} />
        ))}
      </Picker>
      {selectedCountry && (
        <>
          <Image source={require('../../assets/img/img.png')} style={styles.image} />
          <Picker
            selectedValue={selectedLeader}
            style={styles.picker}
            onValueChange={(itemValue) => onLeaderChange(itemValue)}
          >
            <Picker.Item label="Selecione um líder" value={null} />
            {leaders.map((leader) => (
              <Picker.Item label={leader} value={leader} key={leader} />
            ))}
          </Picker>
        </>
      )}
    </View>
  );
};

export default CountrySelector;
