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
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useMutation, useQuery} from 'react-apollo';

const Border = () => (
  <View
    style={{height: 0.5, backgroundColor: '#aaa', marginLeft: 16, opacity: 0.5}}
  />
);

const PersonalDataMaster = ({navigation, handleChangeLoginState}) => {
  const {blockTitle, groupBlock, groupBlockIos} = styles;

  const USER = useQuery(ME);

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
    setIsLoading(true);
    UPDATE_PROFILE_WITHOUT_CITY_mutation({
      variables: {
        id: USER.data.me.profile.id,
        name: nameLocal,
        email: emailLocal,
        mobile_phone: mobilePhoneLocal,
        addition_phone: additionPhoneLocal,
        home_address: homeAddressLocal,
        work_address: workAddressLocal,
        site: siteLocal,
        about_me: aboutMeLocal,
      },
      optimisticResponse: null,
    })
      .then(res => {
        setIsLoading(false);
        console.log(res, '__RES');
        setSavedSuccess(true);
        navigation.state.params.refetchMasters();
        setTimeout(() => {
          setSavedSuccess(false);
          // setShowBtn(false);
        }, 1000);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err, '__ERR');
      });
  };

  const [showBtn, setShowBtn] = useState(false),
    [nameLocal, setNameLocal] = useState(null),
    [emailLocal, setEmailLocal] = useState(null),
    [mobilePhoneLocal, setMobilePhoneLocal] = useState(null),
    [additionPhoneLocal, setAdditionPhoneLocal] = useState(null),
    [homeAddressLocal, setHomeAddressLocal] = useState(null),
    [workAddressLocal, setWorkAddressLocal] = useState(null),
    [siteLocal, setSitelocal] = useState(null),
    [aboutMeLocal, setAboutMeLocal] = useState(null),
    [inputLength, setInputLength] = useState(0),
    [savedSuccess, setSavedSuccess] = useState(false),
    [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (USER.data) {
      const me = USER.data.me;
      setNameLocal(me.profile.name);
      setEmailLocal(me.profile.email);
      setMobilePhoneLocal(me.profile.mobile_phone);
      setAdditionPhoneLocal(me.profile.addition_phone);
      setSitelocal(me.profile.site);
      setHomeAddressLocal(me.profile.home_address);
      setWorkAddressLocal(me.profile.work_address);
      setAboutMeLocal(me.profile.about_me);
      setInputLength(me.profile.about_me ? me.profile.about_me.length : 0);
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
      {(USER.loading || isLoading) && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            flex: 1,
            zIndex: 1000,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      {USER.data && (
        <ScrollView style={{backgroundColor: '#fff'}}>
          <KeyboardAvoidingView
            style={{flex: 1, backgroundColor: '#fff'}}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
            behavior={Platform.OS === 'ios' ? 'position' : 'position'}>
            <View
              style={{flex: 1, paddingHorizontal: 8, backgroundColor: '#fff'}}>
              <Text style={blockTitle}>персональные данные</Text>

              <View
                style={[Platform.OS === 'ios' ? groupBlockIos : groupBlock]}>
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

              <View
                style={[Platform.OS === 'ios' ? groupBlockIos : groupBlock]}>
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
                style={[
                  Platform.OS === 'ios' ? groupBlockIos : groupBlock,
                  {paddingHorizontal: 16},
                ]}>
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
          </KeyboardAvoidingView>

          <View style={{paddingHorizontal: 8}}>
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
    marginBottom: 16,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 4,
    backgroundColor: '#fff',
    elevation: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  groupBlockIos: {
    marginBottom: 16,
    borderRadius: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 0.1,
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
