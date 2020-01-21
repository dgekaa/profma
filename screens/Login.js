import React, {useState, useEffect} from 'react';

import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {ButtonDefault, ButtonDisabled, ButtonError} from '../components/Button';
import {InputWithText, InputWithPassword} from '../components/Input';
import {Header} from '../components/BackgroundHeader';

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

  const [iconName, setIconName] = useState('closedEye');
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

  const [mail, setMail] = useState('');

  useEffect(() => {
    fillErr
      ? setRegBtnText('Не достаточно данных для регистрации')
      : validationErr
      ? setRegBtnText('проверьте введённые данные')
      : setRegBtnText('Войти');
  }, [fillErr, validationErr]);

  return (
    <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <Header navigation={navigation} />
      <View style={[container, {flex: 1}]}>
        <View style={topTextWrap}>
          <Text style={ProfMa}>Prof.Ma</Text>
          <Text style={topText}>
            Войдите в свой аккаунт, чтобы начать использовать приложение😎
          </Text>
        </View>
        <View style={inputGroup}>
          <InputWithText
            onChangeText={text => {
              setMail(text);
            }}
            value={mail}
            text="Введите адрес электронной почты"
            placeholder="example@site.com"
            keyboardType="email-address"
            validationErr={validationErr}
          />
          <InputWithPassword
            text="Придумайте пароль"
            secureTextEntry={hidePassword}
            icon={iconName}
            onPress={openCloseEye}
            forgetPassword={true}
            validationErr={validationErr}
            onPressPassRecovery={() => {
              navigation.navigate('PasswordRecovery');
            }}
          />
        </View>
        <View style={login}>
          <View style={politic}>
            <Text style={politicText}>
              Нажимая “Зарегистрироваться”, вы соглашаетесь с нашей
              <Text style={specialText}> Политикой конфиденциальности</Text> и
              <Text style={specialText}> Условиями использования</Text>
            </Text>
          </View>
          {!!fillErr && !validationErr && (
            <ButtonDisabled title={regBtnText} style={{marginBottom: 8}} />
          )}
          {!fillErr && !validationErr && (
            <ButtonDefault
              style={{marginBottom: 8}}
              title={regBtnText}
              active={true}
              onPress={() => navigation.navigate('Main', {mail: mail})}
            />
          )}
          {!!validationErr && (
            <ButtonError title={regBtnText} style={{marginBottom: 8}} />
          )}
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
    flex: 3,
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
    fontFamily: 'Futura PT',
    fontSize: 23,
    marginTop: 16,
    width: '85%',
  },
  inputGroup: {
    flex: 5,
  },
  politic: {
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingBottom: 15,
  },
  politicText: {
    fontSize: 13,
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
