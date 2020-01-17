import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithText, InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';

import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const Border = () => (
  <View
    style={{height: 0.5, backgroundColor: '#aaa', marginLeft: 16, opacity: 0.5}}
  />
);

const PersonalDataMaster = ({navigation}) => {
  const {blockTitle, groupBlock} = styles;

  const [showBtn, setShowBtn] = useState(false);
  const [name, setName] = useState(false);
  const [inputLength, setInputLength] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    name ? setShowBtn(true) : setShowBtn(false);
  }, [name]);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} />
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 8}}>
          <View style={{flex: 1}}>
            <Text style={blockTitle}>персональные данные</Text>
            <View style={[groupBlock, {marginBottom: 16}]}>
              <InputWithText
                text="Ваше имя"
                placeholder="Начните вводить имя"
                withoutShadow={true}
                onChangeText={text => {
                  setName(text);
                }}
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
                text="Дополнительный номер телефона"
                placeholder="Начните вводить номер мобильного телефона"
                withoutShadow={true}
              />
            </View>
            <View style={[groupBlock, {marginBottom: 16}]}>
              <InputWithText
                text="Город, в котором вы работаете"
                placeholder="Начните вводить город"
                withoutShadow={true}
                onChangeText={text => {
                  setName(text);
                }}
              />
              <Border />
              <InputWithText
                text="Домашний адрес (необходим для мастеров, которые работают с выездом)"
                placeholder="Начните вводить адрес"
                withoutShadow={true}
              />
              <Border />
              <InputWithText
                text="Рабочий адрес (необходим для ваших клиентов)"
                placeholder="Начните вводить адрес"
                withoutShadow={true}
              />
              <Border />
              <InputWithText
                style={{fontSize: 13}}
                text="Ваш персональный сайт или страничка с портфолио"
                placeholder="Укажите адрес странички с вашими работами"
                withoutShadow={true}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={blockTitle}>немного о себе</Text>
              <View
                style={{marginTop: 20, paddingRight: 8, flexDirection: 'row'}}>
                <Text style={{color: '#ff3d48'}}>{inputLength}</Text>
                <Text style={{color: '#D4D7DA'}}>\140</Text>
              </View>
            </View>
            <View
              style={[groupBlock, {marginBottom: 16, paddingHorizontal: 16}]}>
              <TextInput
                maxLength={140}
                onChangeText={text => {
                  setInputLength(text.length);
                }}
                returnKeyLabel="go"
                multiline={true}
                placeholder="Расскажите о себе, своих навыках и способностях.."
              />
            </View>
          </View>
          {showBtn && (
            <View style={{marginBottom: 8}}>
              <ButtonDefault
                active={true}
                title="Сохранить изменения"
                onPress={() => {
                  setSavedSuccess(true);
                  setTimeout(() => {
                    setSavedSuccess(false);
                  }, 1000);
                }}
              />
            </View>
          )}
          {savedSuccess && (
            <SaveSuccess
              title="👍 Изменения успешно сохранены."
              style={{marginBottom: 8}}
            />
          )}
          <ButtonDefault title="выйти из профиля" style={{marginBottom: 8}} />
        </View>
      </ScrollView>
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
    fontSize: 10,
  },
  block: {
    justifyContent: 'center',
    height: 60,
  },
});

export default PersonalDataMaster;
