import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Button = ({title, active, disabled, onPress, style}) => {
  const {btn, btnWrap, btnText, notActiveBtn} = styles;
  return (
    <View style={btnWrap}>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <View
          style={[
            style,
            btn,
            active
              ? {backgroundColor: '#B986DA'}
              : disabled
              ? {backgroundColor: '#D5D8DA'}
              : notActiveBtn,
          ]}>
          <Text
            style={[
              btnText,
              active || disabled ? {color: '#fff'} : {color: '#B986DA'},
            ]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrap: {
    flex: 1,
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  notActiveBtn: {
    borderWidth: 1.5,
    borderColor: 'rgba(185, 134, 218, 0.25)',
  },
  btnText: {
    fontFamily: 'Futura PT',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Button;
