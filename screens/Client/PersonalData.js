import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithText, InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';

import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import {useMutation, useQuery} from 'react-apollo';
import {ME, UPDATE_PROFILE_WITHOUT_CITY} from '../../QUERYES';

const Border = () => (
  <View
    style={{height: 0.5, backgroundColor: '#aaa', marginLeft: 16, opacity: 0.5}}
  />
);

const PersonalData = ({navigation}) => {
  const {blockTitle, groupBlock, groupBlockIos, keyboardWrap} = styles;

  const USER = useQuery(ME);

  const [showBtn, setShowBtn] = useState(false),
    [nameLocal, setNameLocal] = useState(''),
    [emailLocal, setEmailLocal] = useState(''),
    [phoneNumberLocal, setPhoneNumberLocal] = useState(''),
    [homeAddressLocal, setHomeAddressLocal] = useState(''),
    [savedSuccess, setSavedSuccess] = useState(false),
    [isLoading, setIsLoading] = useState(false);

  const refreshObject = {
    refetchQueries: [
      {
        query: ME,
      },
    ],
    awaitRefetchQueries: true,
  };

  const [UPDATE_PROFILE_WITHOUT_CITY_mutation] = useMutation(
    UPDATE_PROFILE_WITHOUT_CITY,
    refreshObject,
  );

  const SAVE = () => {
    setIsLoading(true);
    UPDATE_PROFILE_WITHOUT_CITY_mutation({
      variables: {
        id: USER.data.me.profile.id,
        name: nameLocal,
        email: emailLocal,
        mobile_phone: phoneNumberLocal,
        home_address: homeAddressLocal,
      },
      optimisticResponse: null,
    })
      .then(res => {
        console.log(res, '__RES');
        setIsLoading(false);
        setSavedSuccess(true);
        setShowBtn(false);
        setTimeout(() => {
          setSavedSuccess(false);
        }, 1000);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err, '__ERR');
      });
  };

  useEffect(() => {
    console.log(USER.data, '----data');
    if (USER.data) {
      const me = USER.data.me;
      setNameLocal(me.profile.name);
      setEmailLocal(me.profile.email);
      setPhoneNumberLocal(me.profile.mobile_phone);
      setHomeAddressLocal(me.profile.home_address);
    }
  }, [USER.data]);

  useEffect(() => {
    nameLocal || emailLocal || phoneNumberLocal || homeAddressLocal
      ? setShowBtn(true)
      : setShowBtn(false);
  }, [nameLocal, emailLocal, phoneNumberLocal, homeAddressLocal]);

  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <BackgroundHeader
          navigation={navigation}
          title="Персональные данные"
          zInd={100}
        />

        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          style={[keyboardWrap]}
          behavior={Platform.OS === 'ios' ? 'position' : 'position'}>
          <Text style={[blockTitle]}>персональные данные</Text>

          <View style={[Platform.OS === 'ios' ? groupBlockIos : groupBlock]}>
            <InputWithText
              value={nameLocal}
              text="Ваше имя"
              placeholder="Начните вводить имя"
              withoutShadow={true}
              onChangeText={text => setNameLocal(text)}
            />
            <Border />
            <InputWithText
              text="Ваш e-mail"
              placeholder="Начните вводить e-mail"
              withoutShadow={true}
              value={emailLocal}
              onChangeText={text => setEmailLocal(text)}
            />
            <Border />
            <InputWithText
              text="Ваш мобильный телефон"
              placeholder="Начните вводить номер телефона"
              withoutShadow={true}
              value={phoneNumberLocal}
              onChangeText={text => setPhoneNumberLocal(text)}
            />
            <Border />
            <InputWithText
              style={{fontSize: 13}}
              longText={true}
              text="Домашний адрес (необходим для мастеров, которые работают с выездом)"
              placeholder="Начните вводить домашний адрес"
              withoutShadow={true}
              value={homeAddressLocal}
              onChangeText={text => setHomeAddressLocal(text)}
            />
          </View>

          {savedSuccess && (
            <SaveSuccess title="👍 Изменения успешно сохранены." />
          )}
        </KeyboardAvoidingView>

        {showBtn && USER.data && (
          <View style={{padding: 16}}>
            <ButtonDefault title="Сохранить изменения" onPress={() => SAVE()} />
          </View>
        )}

        {(isLoading || USER.loading) && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  keyboardWrap: {
    height: 363,
    width: '100%',
  },
  groupBlockIos: {
    height: 315,
    borderRadius: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  groupBlock: {
    borderRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 4,
    backgroundColor: '#fff',
    elevation: 1,
  },
  blockTitle: {
    height: 20,
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
