import React, {useEffect} from 'react';
import {ButtonDefault} from '../components/Button';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  AsyncStorage,
} from 'react-native';
import {getToken} from '../util';

const screen = Dimensions.get('window');

const Start = ({navigation}) => {
  const {topText, bottomText} = styles;
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../img/startBG.png')}
        style={{flex: 1, marginTop: -400}}>
        <View style={{paddingLeft: 20, marginBottom: 8, marginTop: 400}}>
          <Text style={topText}>
            Удобная запись клиентов + Мы́ доплачиваем вам, а не вы нам😉
          </Text>
          <Text style={bottomText}>
            Лучшие мастера маникюрного сервиса по самой низкой цене + кэшбэк с
            каждого сеанса
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../img/startImg.png')}
            style={{
              width: screen.width - 140,
              height: (screen.width - 200) * 1.7,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
      </ImageBackground>
      <View style={{margin: 8}}>
        <ButtonDefault
          style={{marginBottom: 8}}
          title="Войти"
          active={false}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
        <ButtonDefault
          title="Зарегистрироваться"
          active={true}
          onPress={() => {
            navigation.navigate('Registration');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topText: {
    color: '#fff',
    fontFamily: 'FuturaPT-Bold',
    fontSize: 23,
    marginTop: 16,
    width: '85%',
  },
  bottomText: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 13,
    color: '#fff',
    width: '60%',
    paddingTop: 10,
  },
});

export default Start;
