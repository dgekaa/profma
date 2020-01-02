import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export const ButtonDefault = ({title, active, onPress, style}) => {
  const {btn, btnWrap, btnText, notActiveBtn} = styles;
  return (
    <View style={btnWrap}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            style,
            btn,
            active ? {backgroundColor: '#B986DA'} : notActiveBtn,
          ]}>
          <Text
            style={[btnText, active ? {color: '#fff'} : {color: '#B986DA'}]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const ButtonDisabled = ({title, onPress, style}) => {
  const {btn, btnWrap, btnText} = styles;
  return (
    <View style={btnWrap}>
      <TouchableOpacity disabled={true} onPress={onPress}>
        <View style={[style, btn, {backgroundColor: '#D5D8DA'}]}>
          <Text style={[btnText, {color: '#fff'}]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const ButtonError = ({title, onPress, style}) => {
  const {btn, btnWrap, btnText} = styles;
  return (
    <View style={btnWrap}>
      <TouchableOpacity disabled={true} onPress={onPress}>
        <View style={[style, btn, {backgroundColor: '#FF3D4B'}]}>
          <Text style={[btnText, {color: '#fff'}]}>{title}</Text>
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
