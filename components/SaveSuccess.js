import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SaveSuccess = ({title, style}) => {
  const {alert, textStyle} = styles;
  return (
    <View style={[alert, style]}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    backgroundColor: '#011627',
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignSelf: 'center',
    zIndex: 999,
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default SaveSuccess;
