import React, {useState, useEffect} from 'react';

import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

const ClientRegistration = ({}) => {
  const {
    container,
    topText,
    ProfMa,
    topTextWrap,
    inputGroup,
    registration,
    specialText,
    politicText,
    politic,
    btnGroup,
  } = stylesClientRegistration;

  const [textAd, setTextAd] = useState(
    'Лучшие мастера маникюра по самой низкой цене + Кэшбэк☝',
  );
  const [personType, setPersonType] = useState('client');
  const [validationErr, setValidationErr] = useState('some err');
  const [regBtnText, setRegBtnText] = useState('');
  const [iconName, setIconName] = useState('openedEye');
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    validationErr
      ? setRegBtnText('Не достаточно данных для регистрации')
      : setRegBtnText('Зарегистрироваться');
  }, [validationErr]);

  useEffect(() => {
    personType === 'client'
      ? setTextAd('Лучшие мастера маникюра по самой низкой цене + Кэшбэк☝')
      : setTextAd(
          'Удобная запись клиентов + Мы́ доплачиваем вам, а не вы нам😉',
        );
  }, [personType]);

  const selectPersonType = type => setPersonType(type);

  const openCloseEye = () => {
    if (iconName === 'openedEye') {
      setIconName('closedEye');
      setHidePassword(true);
    } else {
      setIconName('openedEye');
      setHidePassword(false);
    }
  };

  return (
    <View style={container}>
      <View style={topTextWrap}>
        <Text style={ProfMa}>Prof.Ma</Text>
        <Text style={topText}>{textAd}</Text>
      </View>
      <View style={btnGroup}>
        <Button
          title="Я - КЛИЕНТ"
          active={personType === 'client'}
          onPress={() => {
            selectPersonType('client');
          }}
          style={{marginRight: 5}}
        />
        <Button
          title="Я - МАСТЕР"
          active={personType === 'master'}
          onPress={() => {
            selectPersonType('master');
          }}
        />
      </View>
      <View style={inputGroup}>
        <Input
          text="Введите адрес электронной почты"
          placeholder="example@site.com"
          keyboardType="email-address"
        />
        <Input
          text="Придумайте пароль"
          placeholder="PLACEHOLDER"
          secureTextEntry={hidePassword}
          icon={iconName}
          onPress={openCloseEye}
        />
      </View>
      <View style={registration}>
        <View style={politic}>
          <Text style={politicText}>
            Нажимая “Зарегистрироваться”, вы соглашаетесь с нашей
            <Text style={specialText}> Политикой конфиденциальности</Text> и
            <Text style={specialText}> Условиями использования</Text>
          </Text>
        </View>
        <Button
          title={regBtnText}
          disabled={!!validationErr}
          active={!validationErr}
        />
      </View>
    </View>
  );
};

const stylesClientRegistration = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  topTextWrap: {
    flex: 2.5,
    paddingHorizontal: 12,
  },
  ProfMa: {
    fontFamily: 'Futura PT',
    fontSize: 23,
    color: '#B986DA',
    fontWeight: 'bold',
    width: '75%',
  },
  topText: {
    color: '#011627',
    fontWeight: 'bold',
    fontFamily: 'Futura PT',
    fontSize: 23,
    marginTop: 16,
    width: '81%',
  },
  btnGroup: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 3,
  },
  registration: {
    flex: 2,
  },
  politic: {
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingBottom: 15,
  },
  politicText: {
    textAlign: 'center',
    fontFamily: 'Futura PT',
  },
  specialText: {
    fontFamily: 'Futura PT',
    fontSize: 13,
    color: '#B986DA',
  },
});

export default ClientRegistration;
