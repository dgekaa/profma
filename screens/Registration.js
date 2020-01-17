import React, {useState, useEffect} from 'react';

import {Text, StyleSheet, View} from 'react-native';
import {ButtonDefault, ButtonDisabled} from '../components/Button';
import {InputWithText, InputWithPassword} from '../components/Input';
import {Header} from '../components/BackgroundHeader';

const Registration = ({navigation}) => {
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
  const [fillErr, setFillErr] = useState('some err');
  const [regBtnText, setRegBtnText] = useState('');
  const [iconName, setIconName] = useState('closedEye');
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    fillErr
      ? setRegBtnText('Не достаточно данных для регистрации')
      : setRegBtnText('Зарегистрироваться');
  }, [fillErr]);

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
    <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <Header navigation={navigation} />
      <View style={[container, {flex: 1}]}>
        <View style={[topTextWrap, {flex: 2.5}]}>
          <Text style={ProfMa}>Prof.Ma</Text>
          <Text style={topText}>{textAd}</Text>
        </View>
        <View style={[btnGroup, {flex: 1.5}]}>
          <ButtonDefault
            flex={true}
            title="Я - КЛИЕНТ"
            active={personType === 'client'}
            onPress={() => {
              selectPersonType('client');
            }}
            style={{marginRight: 5}}
          />
          <ButtonDefault
            flex={true}
            title="Я - МАСТЕР"
            active={personType === 'master'}
            onPress={() => {
              selectPersonType('master');
            }}
          />
        </View>
        <View style={[inputGroup, {flex: 3}]}>
          <InputWithText
            text="Введите адрес электронной почты"
            placeholder="example@site.com"
            keyboardType="email-address"
          />
          <InputWithPassword
            text="Придумайте пароль"
            secureTextEntry={hidePassword}
            icon={iconName}
            onPress={openCloseEye}
          />
        </View>
        <View style={[registration, {flex: 2}]}>
          <View style={politic}>
            <Text style={politicText}>
              Нажимая “Зарегистрироваться”, вы соглашаетесь с нашей
              <Text style={specialText}> Политикой конфиденциальности</Text> и
              <Text style={specialText}> Условиями использования</Text>
            </Text>
          </View>
          {!!fillErr && <ButtonDisabled title={regBtnText} />}
          {!fillErr && <ButtonDefault title={regBtnText} active={true} />}
        </View>
      </View>
    </View>
  );
};

const stylesClientRegistration = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  topTextWrap: {
    paddingHorizontal: 12,
  },
  ProfMa: {
    fontSize: 23,
    color: '#B986DA',
    fontWeight: 'bold',
    width: '75%',
  },
  topText: {
    color: '#011627',
    fontWeight: 'bold',
    fontSize: 23,
    marginTop: 16,
    width: '81%',
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  politic: {
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingBottom: 15,
  },
  politicText: {
    textAlign: 'center',
    fontSize: 13,
  },
  specialText: {
    fontSize: 13,
    color: '#B986DA',
  },
});

export default Registration;
