import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import colorConstant from '../constant/colorConstant';

const Button = props => {
  return (
    <TouchableOpacity style={styles.touchables} onPress={props.onPress}>
      <Text style={styles.touchableText}>{props?.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  touchables: {
    width: '100%',
    height: 50,
    backgroundColor: colorConstant.colorPrimary,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 10,
  },
  touchableText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 25,
    color: '#ffffff',
  },
});
