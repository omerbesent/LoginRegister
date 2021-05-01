import React from 'react';
import { View, TextInput, StyleSheet, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const EmailInput = ({ value, onChange, ...props }) => {
  return <View>
    <TextInput  {...props}
      value={value}
      onChangeText={onChange}
      style={styles.email_input}
      placeholder="E-posta" />
    <Icon style={styles.input_icon} name="envelope" size={15} />
  </View>
};

export default EmailInput;

const styles = StyleSheet.create({
  email_input: {
    width: 280,
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    paddingLeft: 35,
    borderColor: 'gray',
  },
  input_icon: {
    position: 'absolute', left: 0, padding: 15, paddingLeft: 12, color: 'gray'
  },
});