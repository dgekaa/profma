import React, {useState, useEffect} from 'react';
import {InputWithText} from '../components/Input';
import {ButtonDefault} from '../components/Button';
import ModalWindow from '../components/ModalWindow';
import BackgroundHeader from '../components/BackgroundHeader';

import {
  Text,
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

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

  const [address, setAddress] = useState('');
  const [btnText, setBtnText] = useState('');
  const [activeBtn, setActiveBtn] = useState(false);
  const [savePass, setSavePass] = useState(false);

  useEffect(() => {
    if (address.length > 0) {
      setBtnText('Восстановить пароль');
      setActiveBtn(true);
    } else {
      setBtnText('');
      setActiveBtn(false);
    }
  }, [address, btnText]);

  return (
    <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <BackgroundHeader title="Восстановление пароля" navigation={navigation} />
      <View style={container}>
        <View style={inputContainer}>
          <Text style={topText}>Восстановить пароль</Text>
          <View>
            <InputWithText
              text="Введите адрес электронной почты"
              placeholder="example@site.com"
              keyboardType="email-address"
              onChangeText={setAddress}
            />
          </View>
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
              onPress={() => {
                setSavePass(true);
              }}
            />
          )}
        </View>
      </View>
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
              myadress@gmail.com
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
                  setSavePass(false);
                }}
              />
            </View>
          </View>
        </ModalWindow>
      )}
    </View>
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
