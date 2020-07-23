import React, {useState, useEffect} from 'react';
import {useMutation} from 'react-apollo';
import {signOut, signIn, getToken} from '../util';

import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {ButtonDefault, ButtonDisabled, ButtonError} from '../components/Button';
import {InputWithText, InputWithPassword} from '../components/Input';
import {Header} from '../components/BackgroundHeader';

import {LOGIN} from '../QUERYES';

const Login = ({navigation, handleChangeLoginState}) => {
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
    loginWrap,
  } = stylesClientRegistration;

  const [iconName, setIconName] = useState('closedEye');
  const [hidePassword, setHidePassword] = useState(true);
  const [fillErr, setFillErr] = useState('');
  const [validationErr, setValidationErr] = useState('');
  const [regBtnText, setRegBtnText] = useState('');

  const [LOGIN_mutation] = useMutation(LOGIN);

  const toLogin = () => {
    LOGIN_mutation({
      variables: {
        username: email,
        password: password,
      },
      optimisticResponse: null,
    })
      .then(res => {
        console.log(res, '______________LOGIN___________RES');
        handleChangeLoginState(true, res.data.login.access_token);

        navigation.navigate('Main', {ID: res.data.login.user.id});
      })
      .catch(err => {
        alert(JSON.stringify(err));
        setValidationErr(true);
        console.log(err, '___Err');
      });
  };

  const openCloseEye = () => {
    if (iconName === 'openedEye') {
      setIconName('closedEye');
      setHidePassword(true);
    } else {
      setIconName('openedEye');
      setHidePassword(false);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fillErr
      ? setRegBtnText('Недостаточно данных для входа')
      : validationErr
      ? setRegBtnText('проверьте введённые данные')
      : setRegBtnText('Войти');
  }, [fillErr, validationErr]);

  useEffect(() => {
    if (email && password) {
      setFillErr('');
    } else {
      setFillErr('Поля не заполнены');
    }
  }, [email, password]);

  useEffect(() => {
    getToken()
      .then(res => console.log(res, 'getToken TOKEN RES'))
      .catch(err => console.log(res, 'getToken TOKEN ERR'));
  }, []);

  return (
    <View style={loginWrap}>
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
            autoFocus={true}
            onChangeText={text => {
              setValidationErr('');
              setEmail(text);
            }}
            value={email}
            text="Введите адрес электронной почты"
            placeholder="example@site.com"
            keyboardType="email-address"
            validationErr={validationErr}
          />
          <InputWithPassword
            onChangeText={text => {
              setValidationErr('');
              setPassword(text);
            }}
            value={password}
            text="Введите пароль"
            secureTextEntry={hidePassword}
            icon={iconName}
            onPress={openCloseEye}
            forgetPassword={true}
            validationErr={validationErr}
            onPressPassRecovery={() => navigation.navigate('PasswordRecovery')}
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
              onPress={() => toLogin()}
            />
          )}
          {!!validationErr && (
            <ButtonError
              title={regBtnText}
              style={{marginBottom: 8}}
              onPress={() => {}}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const stylesClientRegistration = StyleSheet.create({
  loginWrap: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('window').height,
    bottom: 0,
  },
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
    fontFamily: 'FuturaPT-Bold',
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
    fontFamily: 'FuturaPT-Medium',
  },
  specialText: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 13,
    color: '#B986DA',
  },
});

export default Login;
