import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithText, InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';
import {UPDATE_PROFILE_WITHOUT_CITY, LOGOUT, ME} from '../../QUERYES';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useMutation, useQuery} from 'react-apollo';

const Border = () => (
  <View
    style={{height: 0.5, backgroundColor: '#aaa', marginLeft: 16, opacity: 0.5}}
  />
);

const PersonalDataMaster = ({navigation, handleChangeLoginState}) => {
  const {blockTitle, groupBlock} = styles;

  const USER = useQuery(ME);

  console.log(USER.data, 'USER MASTER CALENDAR');

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
  const [LOGOUT_mutation] = useMutation(LOGOUT);

  const SAVE = () => {
    UPDATE_PROFILE_WITHOUT_CITY_mutation({
      variables: {
        id: USER.data.me.profile.id,
        name: nameLocal || USER.data.me.profile.name,
        email: emailLocal || USER.data.me.profile.email,
        mobile_phone: mobilePhoneLocal || USER.data.me.profile.mobile_phone,
        addition_phone:
          additionPhoneLocal || USER.data.me.profile.addition_phone,
        home_address: homeAddressLocal || USER.data.me.profile.home_address,
        work_address: workAddressLocal || USER.data.me.profile.work_address,
        site: siteLocal || USER.data.me.profile.site,
        about_me: aboutMeLocal || USER.data.me.profile.about_me,
      },
      optimisticResponse: null,
    })
      .then(res => {
        console.log(res, '__RES');
        setSavedSuccess(true);
        setTimeout(() => {
          setSavedSuccess(false);
          // setShowBtn(false);
        }, 1000);
      })
      .catch(err => console.log(err, '__ERR'));
  };

  const [showBtn, setShowBtn] = useState(false);
  const [nameLocal, setNameLocal] = useState(null);
  const [emailLocal, setEmailLocal] = useState(null);
  const [mobilePhoneLocal, setMobilePhoneLocal] = useState(null);
  const [additionPhoneLocal, setAdditionPhoneLocal] = useState(null);
  const [homeAddressLocal, setHomeAddressLocal] = useState(null);
  const [workAddressLocal, setWorkAddressLocal] = useState(null);
  const [siteLocal, setSitelocal] = useState(null);
  const [aboutMeLocal, setAboutMeLocal] = useState(null);

  const [inputLength, setInputLength] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (USER.data) {
      setNameLocal(USER.data.me.profile.name);
      setEmailLocal(USER.data.me.profile.email);
      setMobilePhoneLocal(USER.data.me.profile.mobile_phone);
      setAdditionPhoneLocal(USER.data.me.profile.addition_phone);
      setHomeAddressLocal(USER.data.me.profile.home_address);
      setWorkAddressLocal(USER.data.me.profile.work_address);
      setAboutMeLocal(USER.data.me.profile.about_me);
    }
  }, [USER]);

  useEffect(() => {
    nameLocal ||
    emailLocal ||
    mobilePhoneLocal ||
    additionPhoneLocal ||
    homeAddressLocal ||
    workAddressLocal ||
    siteLocal ||
    aboutMeLocal
      ? setShowBtn(true)
      : setShowBtn(false);
  }, [
    nameLocal,
    emailLocal,
    mobilePhoneLocal,
    additionPhoneLocal,
    homeAddressLocal,
    workAddressLocal,
    siteLocal,
    aboutMeLocal,
  ]);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Персональные данные" />
      {USER.loading && <ActivityIndicator size="large" color="#00ff00" />}
      {USER.data && (
        <ScrollView>
          <View style={{flex: 1, paddingHorizontal: 8}}>
            <View style={{flex: 1}}>
              <Text style={blockTitle}>персональные данные</Text>
              <View style={[groupBlock, {marginBottom: 16}]}>
                <InputWithText
                  text="Ваше имя"
                  placeholder="Начните вводить имя"
                  withoutShadow={true}
                  value={nameLocal}
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
                  value={mobilePhoneLocal}
                  onChangeText={text => setMobilePhoneLocal(text)}
                />
                <Border />
                <InputWithText
                  style={{fontSize: 13}}
                  text="Дополнительный номер телефона"
                  placeholder="Начните вводить номер мобильного телефона"
                  withoutShadow={true}
                  value={additionPhoneLocal}
                  onChangeText={text => setAdditionPhoneLocal(text)}
                />
              </View>
              <View style={[groupBlock, {marginBottom: 16}]}>
                {/* <InputWithText
                text="Город, в котором вы работаете"
                placeholder="Начните вводить город"
                withoutShadow={true}
                value={cityText || city}
                onChangeText={text => {
                  setCity(text);
                }}
              /> */}
                <Border />
                <InputWithText
                  text="Домашний адрес (необходим для мастеров, которые работают с выездом)"
                  placeholder="Начните вводить адрес"
                  withoutShadow={true}
                  value={homeAddressLocal}
                  onChangeText={text => setHomeAddressLocal(text)}
                />
                <Border />
                <InputWithText
                  text="Рабочий адрес (необходим для ваших клиентов)"
                  placeholder="Начните вводить адрес"
                  withoutShadow={true}
                  value={workAddressLocal}
                  onChangeText={text => setWorkAddressLocal(text)}
                />
                <Border />
                <InputWithText
                  style={{fontSize: 13}}
                  text="Ваш персональный сайт или страничка с портфолио"
                  placeholder="Укажите адрес странички с вашими работами"
                  withoutShadow={true}
                  value={siteLocal}
                  onChangeText={text => setSitelocal(text)}
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
                  style={{
                    marginTop: 20,
                    paddingRight: 8,
                    flexDirection: 'row',
                  }}>
                  <Text style={{color: '#ff3d48'}}>{inputLength}</Text>
                  <Text style={{color: '#D4D7DA'}}>\140</Text>
                </View>
              </View>
              <View
                style={[groupBlock, {marginBottom: 16, paddingHorizontal: 16}]}>
                <TextInput
                  maxLength={140}
                  value={aboutMeLocal}
                  onChangeText={text => {
                    setAboutMeLocal(text);
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
                  onPress={() => SAVE()}
                />
              </View>
            )}
            {savedSuccess && (
              <SaveSuccess title="👍 Изменения успешно сохранены." />
            )}
            <ButtonDefault
              onPress={() => {
                LOGOUT_mutation()
                  .then(res => {
                    console.log(res);
                    handleChangeLoginState();

                    navigation.navigate('Start');
                  })
                  .catch(err => console.log(err));
              }}
              title="выйти из профиля"
              style={{marginBottom: 8}}
            />
          </View>
        </ScrollView>
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
