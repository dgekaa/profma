import React, {useState, useEffect} from 'react';

import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {ButtonDefault} from '../components/Button';

const ErrorInternetProblems = ({navigation}) => {
  const {
    container,
    img,
    topText,
    bottomText,
    topTextContainer,
    imgContainer,
    buttonGroup,
  } = styles;

  return (
    <View style={container}>
      <View style={topTextContainer}>
        <Text style={topText}>Ой-ёй..</Text>
        <Text style={topText}>кажется, вы не подключены к интернету😵</Text>
      </View>
      <Text style={bottomText}>
        Проверьте соединение с сетью и попробуйте обновить страницу.
      </Text>
      <View style={imgContainer}>
        <Image style={img} source={require('../img/girl3.png')} />
      </View>

      <View style={buttonGroup}>
        <ButtonDefault title="обновить страницу" active={true} />
        <ButtonDefault title="обратиться в поддержку Prof.ma" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topTextContainer: {
    flex: 2,
  },
  topText: {
    fontFamily: 'Futura PT',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomText: {
    flex: 1.5,
    width: '80%',
    marginTop: 16,
    lineHeight: 17,
    fontSize: 13,
  },
  imgContainer: {
    flex: 5.5,
  },
  buttonGroup: {
    flex: 2,
  },
  img: {},
});

export default ErrorInternetProblems;
