import React, {useState, useEffect} from 'react';
import {useMutation} from 'react-apollo';

import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {ButtonDefault, ButtonDisabled, ButtonError} from '../components/Button';
import {InputWithText, InputWithPassword} from '../components/Input';
import {Header} from '../components/BackgroundHeader';

import {LOGIN} from '../QUERYES';

const Login = ({navigation, handleChangeLoginState}) => {
  const {
    ProfMa,
    topText,
    login,
    politic,
    politicText,
    specialText,
    btnAndroid,
    keyboardIos,
    keyboardAndroid,
    topTextWrapIos,
    topTextWrapAndrod,
  } = stylesClientRegistration;

  const height = Dimensions.get('window').height,
    width = Dimensions.get('window').width;

  const [iconName, setIconName] = useState('closedEye'),
    [hidePassword, setHidePassword] = useState(true),
    [fillErr, setFillErr] = useState(''),
    [validationErr, setValidationErr] = useState(''),
    [regBtnText, setRegBtnText] = useState(''),
    [loading, setLoading] = useState(false),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const [LOGIN_mutation] = useMutation(LOGIN);

  const toLogin = () => {
      setLoading(true);
      LOGIN_mutation({
        variables: {
          username: email,
          password: password,
        },
        optimisticResponse: null,
      })
        .then(res => {
          setLoading(false);
          handleChangeLoginState(true, res.data.login.access_token);
          navigation.navigate('Main', {ID: res.data.login.user.id});
        })
        .catch(err => {
          setLoading(false);
          setValidationErr(true);
        });
    },
    openCloseEye = () => {
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
      ? setRegBtnText('Недостаточно данных для входа')
      : validationErr
      ? setRegBtnText('проверьте введённые данные')
      : setRegBtnText('Войти');
  }, [fillErr, validationErr]);

  useEffect(() => {
    email && password ? setFillErr('') : setFillErr('Поля не заполнены');
  }, [email, password]);

  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Header navigation={navigation} />
        <View
          style={[Platform.OS === 'ios' ? topTextWrapIos : topTextWrapAndrod]}>
          <Text style={[ProfMa, height < 650 && {fontSize: 20}]}>Prof.Ma</Text>
          <Text
            style={[
              topText,
              height < 650 && {fontSize: 20},
              width < 340 && {width: '100%'},
            ]}>
            Войдите в свой аккаунт, чтобы начать использовать приложение😎
          </Text>
        </View>

        <KeyboardAvoidingView
          keyboardVerticalOffset={-30}
          style={[
            Platform.OS === 'ios' ? keyboardIos : keyboardAndroid,
            {backgroundColor: '#fff'},
          ]}
          behavior={Platform.OS === 'ios' ? 'position' : 'padding'}>
          <View
            style={[
              {
                // height: 190,
                backgroundColor: '#fff',
                paddingHorizontal: 8,
              },
            ]}>
            <InputWithText
              autoFocus={false}
              onChangeText={text => {
                setValidationErr('');
                setEmail(text);
              }}
              value={email}
              text="Введите адрес электронной почты"
              placeholder="example@site.com"
              keyboardType="email-address"
              validationErr={validationErr}
              onSubmitEditing={Keyboard.dismiss}
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
              validationErr={validationErr}
              forgetPassword={true}
              onPressPassRecovery={() =>
                navigation.navigate('PasswordRecovery')
              }
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View
            style={[
              login,
              {
                justifyContent: 'flex-end',
                backgroundColor: '#fff',
              },
              Platform.OS === 'ios'
                ? {height: 150}
                : {height: height < 650 ? 150 : 210},
            ]}>
            <View style={[politic, height < 650 && {paddingHorizontal: 10}]}>
              <Text style={politicText}>
                Нажимая “Зарегистрироваться”, вы соглашаетесь с нашей
                <Text style={specialText}> Политикой конфиденциальности</Text> и
                <Text style={specialText}> Условиями использования</Text>
              </Text>
            </View>

            {!!fillErr && !validationErr && (
              <ButtonDisabled title={regBtnText} style={btnAndroid} />
            )}
            {!fillErr && !validationErr && (
              <ButtonDefault
                style={btnAndroid}
                title={regBtnText}
                active={true}
                onPress={() => toLogin()}
              />
            )}
            {!!validationErr && (
              <ButtonError
                title={regBtnText}
                style={btnAndroid}
                onPress={() => {}}
              />
            )}
          </View>
        </KeyboardAvoidingView>

        {loading && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const stylesClientRegistration = StyleSheet.create({
  ProfMa: {
    fontSize: 23,
    color: '#B986DA',
    fontWeight: 'bold',
    width: '75%',
  },
  topTextWrapIos: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topTextWrapAndrod: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  topText: {
    color: '#011627',
    fontFamily: 'FuturaPT-Bold',
    fontSize: 23,
    marginTop: 16,
    width: '85%',
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
    color: '#B986DA',
  },
  login: {
    paddingHorizontal: 8,
    width: '100%',
  },
  keyboardIos: {
    height: 350,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  keyboardAndroid: {
    height: 400,
    backgroundColor: 'gold',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  btnAndroid: {
    marginBottom: 8,
  },
});

export default Login;
