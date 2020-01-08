import React, {useState, useEffect} from 'react';
import {InputWithText} from '../components/Input';
import {ButtonDefault} from '../components/Button';
import ModalWindow from '../components/ModalWindow';

import {
  Text,
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const PasswordRecovery = () => {
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
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (address.length > 0) {
      setBtnText('Восстановить пароль');
      setActiveBtn(true);
    } else {
      setBtnText('');
      setActiveBtn(false);
    }
  }, [address, btnText]);

  const recoveryPassword = visible => {
    setModalVisible(visible);
  };

  return (
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
              recoveryPassword(true);
            }}
          />
        )}
      </View>
      {/* <ModalWindow
        modalVisible={modalVisible}
        onPress={recoveryPassword}
        mail={address}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  inputContainer: {
    flex: 2,
  },
  topText: {
    paddingLeft: 8,
    textTransform: 'uppercase',
    color: '#011627',
    opacity: 0.35,
  },
  instruction: {
    flex: 7,
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
  btnContainer: {
    flex: 1,
  },
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
