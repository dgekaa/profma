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

  const {
    e_mail,
    master_name,
    phone_number_second,
    phone_number,
    city,
    address,
    work_address,
    website,
    about_me,
  } = navigation.state.params;

  const [showBtn, setShowBtn] = useState(false);
  const [name, setName] = useState('');
  const [e_mailText, setE_mail] = useState('');
  const [phone_number_secondText, setPhone_number_second] = useState('');
  const [phone_numberText, setPhone_number] = useState('');
  const [cityText, setCity] = useState('');
  const [addressText, setAddress] = useState('');
  const [workAddressText, setWorkAddress] = useState('');
  const [about_meText, setAbout_me] = useState('');
  const [websiteText, setWebsiteText] = useState('');
  const [inputLength, setInputLength] = useState(
    about_me.length > 140 ? 140 : about_me.length,
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    websiteText ||
    name ||
    e_mailText ||
    phone_number_secondText ||
    phone_numberText ||
    cityText ||
    addressText ||
    workAddressText ||
    about_meText
      ? setShowBtn(true)
      : setShowBtn(false);
  }, [
    websiteText,
    name,
    e_mailText,
    phone_number_secondText,
    phone_numberText,
    cityText,
    addressText,
    workAddressText,
    about_meText,
  ]);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Персональные данные" />
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 8}}>
          <View style={{flex: 1}}>
            <Text style={blockTitle}>персональные данные</Text>
            <View style={[groupBlock, {marginBottom: 16}]}>
              <InputWithText
                text="Ваше имя"
                placeholder="Начните вводить имя"
                withoutShadow={true}
                value={name || master_name}
                onChangeText={text => {
                  setName(text);
                }}
              />
              <Border />
              <InputWithText
                text="Ваш e-mail"
                placeholder="Начните вводить e-mail"
                withoutShadow={true}
                value={e_mailText || e_mail}
                onChangeText={text => {
                  setE_mail(text);
                }}
              />
              <Border />
              <InputWithText
                text="Ваш мобильный телефон"
                placeholder="Начните вводить номер телефона"
                withoutShadow={true}
                value={phone_numberText || phone_number}
                onChangeText={text => {
                  setPhone_number(text);
                }}
              />
              <Border />
              <InputWithText
                style={{fontSize: 13}}
                text="Дополнительный номер телефона"
                placeholder="Начните вводить номер мобильного телефона"
                withoutShadow={true}
                value={phone_number_secondText || phone_number_second}
                onChangeText={text => {
                  setPhone_number_second(text);
                }}
              />
            </View>
            <View style={[groupBlock, {marginBottom: 16}]}>
              <InputWithText
                text="Город, в котором вы работаете"
                placeholder="Начните вводить город"
                withoutShadow={true}
                value={cityText || city}
                onChangeText={text => {
                  setCity(text);
                }}
              />
              <Border />
              <InputWithText
                text="Домашний адрес (необходим для мастеров, которые работают с выездом)"
                placeholder="Начните вводить адрес"
                withoutShadow={true}
                value={addressText || address}
                onChangeText={text => {
                  setAddress(text);
                }}
              />
              <Border />
              <InputWithText
                text="Рабочий адрес (необходим для ваших клиентов)"
                placeholder="Начните вводить адрес"
                withoutShadow={true}
                value={workAddressText || work_address}
                onChangeText={text => {
                  setWorkAddress(text);
                }}
              />
              <Border />
              <InputWithText
                style={{fontSize: 13}}
                text="Ваш персональный сайт или страничка с портфолио"
                placeholder="Укажите адрес странички с вашими работами"
                withoutShadow={true}
                value={websiteText || website}
                onChangeText={text => {
                  setWebsiteText(text);
                }}
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
                value={about_meText || about_me}
                onChangeText={text => {
                  setAbout_me(text);
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
                    // setShowBtn(false);
                  }, 1000);
                }}
              />
            </View>
          )}
          {savedSuccess && (
            <SaveSuccess title="👍 Изменения успешно сохранены." />
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

export default PersonalDataMaster;
