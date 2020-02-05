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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneMumber, setPhoneMumber] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    name || email || phoneMumber || homeAddress
      ? setShowBtn(true)
      : setShowBtn(false);
  }, [name, email, phoneMumber, homeAddress]);

  const {client_name, e_mail, phone_number, address} = navigation.state.params;
  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} />
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <View style={{flex: 1}}>
          <Text style={blockTitle}>персональные данные</Text>
          <View style={groupBlock}>
            <InputWithText
              value={name || client_name}
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
              value={email || e_mail}
              onChangeText={text => {
                setEmail(text);
              }}
            />
            <Border />
            <InputWithText
              text="Ваш мобильный телефон"
              placeholder="Начните вводить номер телефона"
              withoutShadow={true}
              value={phoneMumber || phone_number}
              onChangeText={text => {
                setPhoneMumber(text);
              }}
            />
            <Border />
            <InputWithText
              style={{fontSize: 13}}
              longText={true}
              text="Домашний адрес (необходим для мастеров, которые работают с выездом)"
              placeholder="Начните вводить домашний адрес"
              withoutShadow={true}
              value={homeAddress || address}
              onChangeText={text => {
                setHomeAddress(text);
              }}
            />
            {showBtn && (
              <View style={{padding: 16}}>
                <ButtonDefault
                  title="Сохранить изменения"
                  onPress={() => {
                    setSavedSuccess(true);
                    setShowBtn(false);
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
    elevation: 1,
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
