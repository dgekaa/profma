import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {ButtonDefault} from '../components/Button';

const screen = Dimensions.get('window');

const Start = ({navigation}) => {
  const {topText, bottomText} = styles;
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../img/startBG.png')}
        style={{width: '100%', height: '100%', flex: 1}}>
        <View style={{flex: 2.5, paddingLeft: 20}}>
          <Text style={topText}>
            Удобная запись клиентов + Мы́ доплачиваем вам, а не вы нам😉
          </Text>
          <Text style={bottomText}>
            Лучшие мастера маникюрного сервиса по самой низкой цене + кэшбэк с
            каждого сеанса
          </Text>
        </View>
        <Image
          source={require('../img/startImg.png')}
          style={{
            width: screen.width - 150,
            height: (screen.width - 150) * 1.7,
            flex: 5.5,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        />
        <View style={{flex: 2, padding: 5}}>
          <ButtonDefault
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  topText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Futura PT',
    fontSize: 23,
    marginTop: 16,
    width: '81%',
  },
  bottomText: {
    fontFamily: 'Futura PT',
    fontSize: 13,
    color: '#fff',
    width: '60%',
    paddingTop: 10,
  },
});

export default Start;
