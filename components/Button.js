import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export const ButtonDefault = ({
  title,
  active,
  onPress,
  style,
  flex,
  rightTitle,
}) => {
  const {btn, btnText, notActiveBtn} = styles;
  return (
    <View style={flex ? {flex: 1} : null}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            btn,
            style,
            active ? {backgroundColor: '#B986DA'} : notActiveBtn,
          ]}>
          <Text
            style={[btnText, active ? {color: '#fff'} : {color: '#B986DA'}]}>
            {title}
          </Text>
          {rightTitle && (
            <Text
              style={[btnText, active ? {color: '#fff'} : {color: '#B986DA'}]}>
              {rightTitle}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const ButtonDisabled = ({title, onPress, style}) => {
  const {btn, btnText} = styles;
  return (
    <View>
      <TouchableOpacity disabled={true} onPress={onPress}>
        <View style={[style, btn, {backgroundColor: '#D5D8DA'}]}>
          <Text style={[btnText, {color: '#fff'}]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const ButtonError = ({title, onPress, style}) => {
  const {btn, btnText} = styles;
  return (
    <View>
      <TouchableOpacity disabled={true} onPress={onPress}>
        <View style={[style, btn, {backgroundColor: '#FF3D4B'}]}>
          <Text style={[btnText, {color: '#fff'}]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 50,
    paddingHorizontal: 16,
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
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
