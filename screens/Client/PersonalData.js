import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithText, InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';

import {Text, View, StyleSheet} from 'react-native';

const Border = () => (
  <View
    style={{height: 0.5, backgroundColor: '#aaa', marginLeft: 16, opacity: 0.5}}
  />
);

const PersonalData = ({navigation}) => {
  const {blockTitle, groupBlock} = styles;

  const [showBtn, setShowBtn] = useState(false);
  const [name, setName] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    name ? setShowBtn(true) : setShowBtn(false);
  }, [name]);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} />
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <View style={{flex: 1}}>
          <Text style={blockTitle}>персональные данные</Text>
          <View style={groupBlock}>
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
              longText={true}
              text="Домашний адрес (необходим для мастеров, которые работают с выездом)"
              placeholder="Начните вводить домашний адрес"
              withoutShadow={true}
            />
            {showBtn && (
              <View style={{padding: 16}}>
                <ButtonDefault
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
          </View>
        </View>
        {savedSuccess && (
          <SaveSuccess
            title="👍 Изменения успешно сохранены."
            style={{marginBottom: 8}}
          />
        )}
      </View>
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

export default PersonalData;
