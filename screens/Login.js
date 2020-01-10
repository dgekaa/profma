import React, {useState, useEffect} from 'react';

import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {ButtonDefault, ButtonDisabled, ButtonError} from '../components/Button';
import {InputWithText, InputWithPassword} from '../components/Input';
import BackgroundHeader from '../components/BackgroundHeader';

const Login = ({navigation}) => {
  const {
    container,
    topTextWrap,
    ProfMa,
    topText,
    inputGroup,
    login,
    politic,
    politicText,
    specialText,
  } = stylesClientRegistration;

  const [iconName, setIconName] = useState('openedEye');
  const [hidePassword, setHidePassword] = useState(true);
  const [fillErr, setFillErr] = useState('');
  const [validationErr, setValidationErr] = useState('');
  const [regBtnText, setRegBtnText] = useState('');

  const openCloseEye = () => {
    if (iconName === 'openedEye') {
      setIconName('closedEye');
      setHidePassword(true);
    } else {
      setIconName('openedEye');
      setHidePassword(false);
    }
  };

  useEffect(() => {
    fillErr
      ? setRegBtnText('Не достаточно данных для регистрации')
      : validationErr
      ? setRegBtnText('проверьте введённые данные')
      : setRegBtnText('Войти');
  }, [fillErr, validationErr]);

  const onChangeText = text => {
    console.log(text);
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader blackArrow={true} navigation={navigation} />
      <View style={container}>
        <View style={topTextWrap}>
          <Text style={ProfMa}>Prof.Ma</Text>
          <Text style={topText}>
            Войдите в свой аккаунт, чтобы начать использовать приложение😎
          </Text>
        </View>
        <View style={inputGroup}>
          <InputWithText
            text="Введите адрес электронной почты"
            placeholder="example@site.com"
            keyboardType="email-address"
            validationErr={validationErr}
            onChangeText={onChangeText}
          />
          <InputWithPassword
            text="Придумайте пароль"
            placeholder="будет PLACEHOLDER"
            secureTextEntry={hidePassword}
            icon={iconName}
            onPress={openCloseEye}
            forgetPassword={true}
            validationErr={validationErr}
            onPressPassRecovery={() => {
              navigation.navigate('PasswordRecovery');
            }}
            onChangeText={onChangeText}
          />
        </View>
        <View style={login}>
          <View style={politic}>
            <Text style={politicText}>
              <Text>Нажимая “Зарегистрироваться”, вы соглашаетесь с нашей</Text>
              <Text style={specialText}> Политикой конфиденциальности</Text> и
              <Text style={specialText}> Условиями использования</Text>
            </Text>
          </View>
          {!!fillErr && !validationErr && <ButtonDisabled title={regBtnText} />}
          {!fillErr && !validationErr && (
            <ButtonDefault
              title={regBtnText}
              active={true}
              onPress={() => navigation.navigate('Main')}
            />
          )}
          {!!validationErr && <ButtonError title={regBtnText} />}
        </View>
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
    flex: 3,
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
    width: '85%',
  },
  inputGroup: {
    flex: 5,
  },
  login: {
    flex: 2.5,
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

export default Login;
