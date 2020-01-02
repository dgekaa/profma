import React from 'react';
import {ImageBackground, Text, StyleSheet, View} from 'react-native';
import {LeftArrowWhite} from './LeftArrow';

const BackgroundHeader = ({navigation}) => {
  const {bg, container, headerTitle} = styles;
  console.log(navigation);
  return (
    <ImageBackground source={require('../img/headerBG.png')} style={bg}>
      <View style={container}>
        <LeftArrowWhite onPress={() => navigation.goBack(null)} />
        <Text style={headerTitle}>Восстановление пароля</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 100,
  },
  container: {
    marginHorizontal: 8,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Futura PT',
    fontSize: 18,
    fontWeight: 'bold',
    width: '95%',
    textAlign: 'center',
  },
});

export default BackgroundHeader;
