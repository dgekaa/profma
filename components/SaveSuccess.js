import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SaveSuccess = ({title, style}) => {
  const {alert} = styles;
  return (
    <View style={[alert, style]}>
      <Text style={{color: '#fff'}}>{title}</Text>
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
  },
});

export default SaveSuccess;
