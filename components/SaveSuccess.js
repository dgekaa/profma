import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

const SaveSuccess = ({title, style}) => {
  const {alert} = styles;
  return (
    <Animated.View style={[alert, style]}>
      <Text style={{color: '#fff'}}>{title}</Text>
    </Animated.View>
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
