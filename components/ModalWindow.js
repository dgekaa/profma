import React from 'react';
import {ButtonDefault} from '../components/Button';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

const ModalWindow = ({modalVisible, onPress, mail}) => {
  const {modal, img, text} = styles;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      presentationStyle="fullScreen"
      onRequestClose={() => {}}>
      <View style={modal}>
        <View>
          <Text style={text}>
            Мы отправили вам письмо с ссылкой для восстановления пароля на адрес
          </Text>
          <Text style={[text, {fontWeight: 'bold'}]}>{mail}</Text>
          <Image style={img} source={require('../img/girl1.png')} />
          <ButtonDefault
            title="спасибо, закрыть окно"
            active={true}
            onPress={() => onPress(false)}
          />
          <TouchableOpacity
            onPress={() => {
              onPress(false);
            }}>
            <Text>спасибо, закрыть окно</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'pink',
    width: '90%',
    height: 290,
    padding: 25,
    alignSelf: 'center',
    marginTop: 200,
  },
  img: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Futura PT',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ModalWindow;
