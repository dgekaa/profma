import React, {useState, useEffect} from 'react';

import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {ButtonDefault} from '../components/Button';

const ErrorSomethingWentWrong = ({navigation}) => {
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
        <Text style={topText}>Что-то пошло не так😱</Text>
      </View>

      <Text style={bottomText}>
        Мы делаем всё возможное, чтобы разобраться в возникшей проблеме.
        Попробуйте обновить страницу или перезагрузить приложение.
      </Text>
      <View style={imgContainer}>
        <Image style={img} source={require('../img/girl2.png')} />
      </View>

      <View style={buttonGroup}>
        <ButtonDefault
          style={{marginBottom: 8}}
          title="обновить страницу"
          active={true}
        />
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
    flex: 1,
  },
  topText: {
    fontFamily: 'Futura PT',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomText: {
    flex: 2,
    width: '80%',
    marginTop: 16,
    lineHeight: 17,
    fontSize: 13,
  },
  imgContainer: {
    flex: 5,
  },
  buttonGroup: {
    marginBottom: 8,
  },
});

export default ErrorSomethingWentWrong;
