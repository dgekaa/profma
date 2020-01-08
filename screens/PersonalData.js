import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../components/BackgroundHeader';
import {InputWithText, InputWithPassword} from '../components/Input';
import {ButtonDisabled, ButtonDefault} from '../components/Button';

import {
  Text,
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Border = () => (
  <View style={{height: 0.5, backgroundColor: '#aaa', marginLeft: 16}} />
);

const PersonalData = ({navigation}) => {
  const {blockTitle, groupBlock} = styles;

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} />
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <View style={{flex: 3}}>
          <Text style={blockTitle}>персональные данные</Text>
          <View style={groupBlock}>
            <InputWithText
              text="Ваше имя"
              placeholder="Начните вводить имя"
              withoutShadow={true}
            />
            <Border />
            <InputWithText
              text="Ваш e-mail"
              placeholder="Начните вводить e-mail"
              withoutShadow={true}
            />
            <Border />
            <InputWithText
              text="Ваш мобильный телефон"
              placeholder="Начните вводить номер телефона"
              withoutShadow={true}
            />
            <Border />
            <InputWithText
              style={{fontSize: 13}}
              text="Домашний адрес (необходим для мастеров, которые работают с выездом)"
              placeholder="Начните вводить домашний адрес"
              withoutShadow={true}
            />
          </View>
        </View>
        <View style={{flex: 4}}></View>
      </View>
      {true && (
        <View style={{padding: 16}}>
          <ButtonDefault
            sr
            title="Сохранить изменения"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    borderRadius: 2,
    shadowColor: 'red',
    shadowOpacity: 4,
    backgroundColor: '#fff',
    elevation: 2,
  },
  blockTitle: {
    marginTop: 20,
    marginBottom: 8,
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 8,
  },
  block: {
    justifyContent: 'center',
    height: 60,
  },
});

export default PersonalData;
