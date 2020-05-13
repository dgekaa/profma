import React, {useState, useEffect} from 'react';

import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {ButtonDefault} from '../components/Button';

const ErrorDepartmentConstruction = ({navigation}) => {
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
        <Text style={topText}>
          кажется, этот раздел находится в разработке 🚧
        </Text>
      </View>
      <Text style={bottomText}>
        Не переживайте, совсем скоро вы сможете пользоваться данным разделом.
      </Text>
      <View style={imgContainer}>
        <Image style={img} source={require('../img/man.png')} />
      </View>

      <View style={buttonGroup}>
        <ButtonDefault title="вернуться назад" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
  },
  topTextContainer: {
    flex: 2,
  },
  topText: {
    fontFamily: 'FuturaPT-Bold',
    fontSize: 24,
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
    marginBottom: 8,
  },
  img: {},
});

export default ErrorDepartmentConstruction;
