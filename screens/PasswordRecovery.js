import React, {useState, useEffect} from 'react';
import {InputWithText} from '../components/Input';
import {ButtonDefault} from '../components/Button';
import {ModalWindowWithKeyboard, ModalWindow} from '../components/ModalWindow';
import BackgroundHeader from '../components/BackgroundHeader';
import {FORGOT_PASSWORD, UPDATE_FORGOTTEN_PASSWORD} from '../QUERYES';
import {useMutation} from 'react-apollo';

import {Text, View, StyleSheet, Image, Keyboard, KeyboardAvoidingView,
TouchableWithoutFeedback} from 'react-native';

const PasswordRecovery = ({navigation}) => {
  const {
    container,
    topText,
    instruction,
    image,
    textWrap,
    helpText,
    questionText,
    inputContainer,
    btnContainer,
  } = styles;

  const [address, setAddress] = useState(''),
    [code, setCode] = useState(''),
    [password, setPassword] = useState(''),
    [btnText, setBtnText] = useState(''),
    [activeBtn, setActiveBtn] = useState(false),
    [savePass, setSavePass] = useState(false),
    [newPass, setNewPass] = useState(false),
    [validationErr, setValidationError] = useState(false);

  useEffect(() => {
    if (address.length > 0) {
      setBtnText('Восстановить пароль');
      setActiveBtn(true);
    } else {
      setBtnText('');
      setActiveBtn(false);
    }
  }, [address, btnText]);

  const [FORGOT_PASSWORD_mutation] = useMutation(FORGOT_PASSWORD),
    [UPDATE_FORGOTTEN_PASSWORD_mutation] = useMutation(
      UPDATE_FORGOTTEN_PASSWORD,
    );

  const saveNewData = () => {
      UPDATE_FORGOTTEN_PASSWORD_mutation({
        variables: {
          email: address,
          code: code,
          password: password,
          password_confirmation: password,
        },
        optimisticResponse: null,
      })
        .then(res => {
          Keyboard.dismiss();
          navigation.navigate('Login');
          setNewPass(false);
        })
        .catch(err => {
          // setValidationError(true);
          console.log(err, '--err password');
        });
    },
    sendMessage = () => {
      FORGOT_PASSWORD_mutation({
        variables: {
          email: address,
        },
        optimisticResponse: null,
      })
        .then(res => {
          console.log(res, '--res pasword');
          Keyboard.dismiss();
          setSavePass(true);
        })
        .catch(err => console.log(JSON.stringify(err), '--err password'));
    };

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <BackgroundHeader title="Восстановление пароля" navigation={navigation} />
        <KeyboardAvoidingView
          style={{flex:1}}
          // style={[Platform.OS === 'ios' ? keyboardIos : keyboardAndroid]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        >

          <View style={container}>
            <View style={[inputContainer, {zIndex: 0}]}>
              <Text style={topText}>Восстановить пароль</Text>
              <InputWithText
                text="Введите адрес электронной почты"
                placeholder="example@site.com"
                keyboardType="email-address"
                onChangeText={setAddress}
              />
            </View>
            <View style={instruction}>
              <View style={image}>
                <Image source={require('../img/girl.png')} />
              </View>
              <View style={textWrap}>
                <Text style={questionText}>Как восстановить пароль?</Text>
                <Text style={helpText}>
                  Введите адрес электронной почты, на которую мы отправим ссылку для
                  восстановления пароля
                </Text>
              </View>
            </View>
            <View style={btnContainer}>
              {!!btnText && (
                <ButtonDefault
                  title={btnText}
                  active={activeBtn}
                  onPress={() => sendMessage()}
                />
              )}
            </View>
          </View>
      
        </KeyboardAvoidingView>
      
        {savePass && (
          <ModalWindow>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
              }}>
              <Text style={{textAlign: 'center', fontSize: 13}}>
                Мы отправили вам письмо с ссылкой для восстановления пароля на
                адрес
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: 8,
                  fontSize: 13,
                }}>
                {address}
              </Text>
              <Image
                style={{marginVertical: 16}}
                source={require('../img/girl.png')}
              />
              <View style={{width: '100%'}}>
                <ButtonDefault
                  title="спасибо, закрыть окно"
                  active={true}
                  onPress={() => {
                    setAddress('');
                    setSavePass(false);
                    setNewPass(true);
                  }}
                />
              </View>
            </View>
          </ModalWindow>
        )}

        {newPass && (
          <ModalWindowWithKeyboard contaynerStyle={{}} style={{}}>
            <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '90%',
                }}>
                <Text style={{textAlign: 'center', fontSize: 13, marginBottom: 20}}>
                  Заполните форму
                </Text>

                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#eee',
                    padding: 10,
                    paddingVertical: 5,
                    marginBottom: 10,
                  }}>
                  <InputWithText
                    style={{width: '100%'}}
                    text="Введите адрес электронной почты"
                    placeholder="example@site.com"
                    keyboardType="email-address"
                    onChangeText={text => {
                      // setValidationError(false);
                      setAddress(text);
                    }}
                    validationErr={validationErr}
                  />
                  <InputWithText
                    style={{width: '100%'}}
                    text="Код с вашей почты"
                    placeholder="code"
                    keyboardType="numeric"
                    onChangeText={text => {
                      // setValidationError(false);
                      setCode(text);
                    }}
                    validationErr={validationErr}
                  />
                  <InputWithText
                    style={{width: '100%'}}
                    text="Введите новый пароль"
                    placeholder="password"
                    onChangeText={text => {
                      // setValidationError(false);
                      setPassword(text);
                    }}
                    validationErr={validationErr}
                  />
                </View>

                <View style={{width: '100%', marginBottom:10}}>
                  <ButtonDefault
                    title="Сохранить"
                    active={true}
                    onPress={() => saveNewData()}
                  />
                </View>

                <View style={{width: '100%'}}>
                  <ButtonDefault
                    title="Закрыть"
                    active={true}
                    onPress={() => 
                      setNewPass(false)
                    }
                  />
                </View>
              </View>
          </ModalWindowWithKeyboard>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  topText: {
    paddingLeft: 8,
    textTransform: 'uppercase',
    color: '#011627',
    opacity: 0.35,
  },
  instruction: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 25,
  },
  image: {
    paddingRight: 15,
  },
  textWrap: {
    flex: 1,
  },
  questionText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  helpText: {fontSize: 13},
  modal: {
    backgroundColor: 'pink',
    width: '90%',
    height: 290,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 200,
  },
});

export default PasswordRecovery;
