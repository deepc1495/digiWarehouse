import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const InputField = props => {
  return (
    <View>
      <TextInput
        style={styles.inputText}
        placeholder={props?.text}
        value={props?.value}
        onChangeText={props?.onChangeText}
        keyboardType={props.keyboardType}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputText: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#000000',
    width: '100%',
    height: 50,
    paddingStart: 25,
    marginBottom: 20,
  },
});
