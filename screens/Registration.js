import React, {useState, useEffect} from 'react';

import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {Query, useMutation, useQuery} from 'react-apollo';

import {ButtonDefault, ButtonDisabled} from '../components/Button';
import {InputWithText, InputWithPassword} from '../components/Input';
import {Header} from '../components/BackgroundHeader';

import {REGISTER, CREATE_PROFILE} from '../QUERYES';
import {signIn} from '../util';
import {set} from 'react-native-reanimated';

const Registration = ({navigation, handleChangeLoginState}) => {
  const {
    container,
    topText,
    ProfMa,
    topTextWrap,
    specialText,
    politicText,
    politic,
    btnGroup,
    registrtionWrap,
  } = stylesClientRegistration;

  const [textAd, setTextAd] = useState(
    'Лучшие мастера маникюра по самой низкой цене + Кэшбэк☝',
  );
  const [personType, setPersonType] = useState('Client');
  const [fillErr, setFillErr] = useState(null);
  const [validationErr, setValidationErr] = useState('');
  const [regBtnText, setRegBtnText] = useState('');
  const [iconName, setIconName] = useState('closedEye');
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [REGISTER_mutation] = useMutation(REGISTER);
  const [CREATE_PROFILE_mutation] = useMutation(CREATE_PROFILE);

  useEffect(() => {
    fillErr
      ? setRegBtnText('Недостаточно данных для регистрации')
      : validationErr
      ? setRegBtnText('проверьте введённые данные')
      : setRegBtnText('Зарегистрироваться');
  }, [fillErr]);

  useEffect(() => {
    fillErr
      ? setRegBtnText('Недостаточно данных для регистрации')
      : validationErr
      ? setRegBtnText('проверьте введённые данные')
      : setRegBtnText('Зарегистрироваться');
  }, [fillErr, validationErr]);

  useEffect(() => {
    !password || !email ? setFillErr(true) : setFillErr(false);
  }, [password, email]);

  useEffect(() => {
    personType === 'Client'
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

  const whoObj = {
    Master: 'Master',
    Client: 'Client',
  };

  const createProfile = token => {
    CREATE_PROFILE_mutation({
      variables: {},
      optimisticResponse: null,
    })
      .then(result => {
        console.log(result, '_____res CREATE PROFILE');
        console.log(token, '_____CREATE PROFILE token');
        navigation.navigate('Main', {ME: token});
      })
      .catch(err => console.log(err, '__!!!!ERR'));
  };

  const register = () => {
    REGISTER_mutation({
      variables: {
        type: whoObj[personType],
        email: email,
        password: password,
        password_confirmation: password,
      },
      optimisticResponse: null,
    })
      .then(res => {
        console.log(res, '__RES REGISTER');
        handleChangeLoginState(true, res.data.register.tokens.access_token);
        createProfile(res);
      })
      .catch(err => {
        console.log(err, '__ERR');
        setValidationErr(true);
      });
  };

  return (
    <View style={registrtionWrap}>
      <Header navigation={navigation} />

      <View style={[container, {flex: 1}]}>
        <View style={[topTextWrap]}>
          <Text style={ProfMa}>Prof.Ma</Text>
          <Text style={topText}>{textAd}</Text>
        </View>

        <View>
          <View style={[btnGroup]}>
            <ButtonDefault
              flex={true}
              title="Я - КЛИЕНТ"
              active={personType === 'Client'}
              onPress={() => selectPersonType('Client')}
              style={{marginRight: 5, opacity: 0.8}}
            />
            <ButtonDefault
              flex={true}
              title="Я - МАСТЕР"
              active={personType === 'Master'}
              onPress={() => selectPersonType('Master')}
              style={{opacity: 0.8}}
            />
          </View>
          <View style={{backgroundColor: '#fff'}}>
            <InputWithText
              onChangeText={text => {
                setValidationErr('');
                setEmail(text);
              }}
              value={email}
              autoFocus={true}
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
              text="Придумайте пароль"
              secureTextEntry={hidePassword}
              icon={iconName}
              onPress={openCloseEye}
              validationErr={validationErr}
            />
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={politic}>
            <Text style={politicText}>
              Нажимая “Зарегистрироваться”, вы соглашаетесь с нашей
              <Text style={specialText}> Политикой конфиденциальности</Text> и
              <Text style={specialText}> Условиями использования</Text>
            </Text>
          </View>

          {!!fillErr ||
            (!!validationErr && (
              <ButtonDisabled
                onPress={() => {}}
                title={regBtnText}
                style={{marginBottom: 8}}
              />
            ))}
          {!fillErr && !validationErr && (
            <ButtonDefault
              onPress={() => register()}
              title={regBtnText}
              active={true}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const stylesClientRegistration = StyleSheet.create({
  registrtionWrap: {
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
    paddingHorizontal: 12,
    marginBottom: 40,
  },
  ProfMa: {
    fontSize: 23,
    color: '#B986DA',
    width: '75%',
    fontFamily: 'FuturaPT-Bold',
  },
  topText: {
    color: '#011627',
    fontSize: 23,
    marginTop: 16,
    width: '81%',
    fontFamily: 'FuturaPT-Bold',
  },

  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  politic: {
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingBottom: 32,
  },
  politicText: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'FuturaPT-Medium',
  },
  specialText: {
    fontSize: 13,
    color: '#B986DA',
  },
});

export default Registration;
