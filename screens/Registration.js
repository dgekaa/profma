import React, {useState, useEffect} from 'react';

import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,ActivityIndicator
} from 'react-native';
import {useMutation} from 'react-apollo';

import {ButtonDefault, ButtonDisabled} from '../components/Button';
import {InputWithText, InputWithPassword} from '../components/Input';
import {Header} from '../components/BackgroundHeader';

import {REGISTER, CREATE_PROFILE} from '../QUERYES';

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
    bottomTextBtn,
  } = stylesClientRegistration;

  const width = Dimensions.get('window').width,
    height = Dimensions.get('window').height;

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
  const [email, setEmail] = useState(''),
    [loading, setLoading] = useState(false);

  const [REGISTER_mutation] = useMutation(REGISTER);
  const [CREATE_PROFILE_mutation] = useMutation(CREATE_PROFILE);

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
      .then(result => navigation.navigate('Main', {ME: token}))
      .catch(err => {});
  };

  const register = () => {
    setLoading(true)
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
        setLoading(false)
        handleChangeLoginState(true, res.data.register.tokens.access_token);
        createProfile(res);
      })
      .catch(err => {setLoading(false);setValidationErr(true)});
  };

  return (
    <View  style={registrtionWrap}>
      <KeyboardAvoidingView
      style={registrtionWrap}
      keyboardVerticalOffset={Platform.select({ ios: 60 })}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header navigation={navigation} />
      <View style={[container, {flex: 1}]}>
          <View style={[topTextWrap, height < 650 && {marginBottom: 10}]}>
            <Text style={[ProfMa, height < 650 && {fontSize: 20}]}>
              Prof.Ma
            </Text>
            <Text
              style={[
                topText,
                width < 340 && {width: '100%'},
                height < 650 && {fontSize: 20},
              ]}>
              {textAd}
            </Text>
          </View>
          <View style={[{flex: 1}]}>
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
          <View style={{backgroundColor: '#fff', height: 200}}>
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
        </View>

        <View style={bottomTextBtn}>
          {height < 650  && (
            <View style={([politic], height < 650 && {paddingBottom: 16})}>
              <Text style={politicText}>
                Нажимая “Зарегистрироваться”, вы соглашаетесь с нашей
                <Text style={specialText}> Политикой конфиденциальности</Text> и
                <Text style={specialText}> Условиями использования</Text>
              </Text>
            </View>
          )}

{!!fillErr ||
            (!!validationErr && (
              <ButtonDisabled
                onPress={() => {}}
                title={regBtnText}
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
      
    </KeyboardAvoidingView>
       {loading && <View style={{
            flex:1, justifyContent:"center", alignItems:"center"}}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>}
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
  bottomTextBtn: {
    position:"absolute",
    bottom:8,
    width:"100%",
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 8,
    paddingHorizontal:8
  },
});

export default Registration;
