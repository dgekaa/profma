import React, {useState, useRef} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';
import SvgUri from 'react-native-svg-uri';
import CalendarSvgIcon from '../../img/CalendarSVG.svg';
import UserIcon from '../../img/User.svg';
import PasswordIcon from '../../img/Password.svg';

import {signOut, getToken, signIn} from '../../util';

import {Query, useMutation, useQuery} from 'react-apollo';
import {LOGOUT, ME} from '../../QUERYES';

const ClientProfile = ({navigation, handleChangeLoginState}) => {
  const {first, text, groupBlock, blockInGroup, borderBottom} = styles;

  const [isChangePassword, setIsChangePassword] = useState();

  const onGoBackFromPasword = isSuccess => {
    if (isSuccess) {
      setIsChangePassword(true);
    } else {
      setIsChangePassword(false);
    }
    setTimeout(() => {
      setIsChangePassword(false);
    }, 1000);
  };

  const USER = useQuery(ME);
  const [LOGOUT_mutation] = useMutation(LOGOUT);

  if (USER.error) {
    return <Text>Error</Text>;
  } else if (USER.loading) {
    return <Text>Loading</Text>;
  } else if (USER.data) {
    return (
      <View style={{flex: 1}}>
        <BackgroundHeader navigation={navigation} title="Мой профиль" />
        <View style={{paddingHorizontal: 10, flex: 1}}>
          <View style={{}}>
            {/* МОИ ЗАПИСИ */}
            <TouchableOpacity
              style={first}
              onPress={() => {
                navigation.navigate('MyNotes', {ID: USER.data.me.id});
              }}>
              <SvgUri width="13" height="13" svgXmlData={CalendarSvgIcon} />
              <Text style={text}>Мои записи</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <View style={groupBlock}>
              {/* ПЕРСОНАЛЬНЫЕ ДАННЫЕ*/}
              <TouchableOpacity
                style={[blockInGroup, borderBottom]}
                onPress={() => {
                  navigation.navigate('PersonalData', USER.data.me);
                }}>
                <SvgUri
                  style={{marginRight: 10}}
                  width="13"
                  height="13"
                  svgXmlData={UserIcon}
                />
                <Text style={text}>Персональные данные</Text>
              </TouchableOpacity>
              {/* ИЗМЕНИТЬ ПАРОЛЬ*/}
              <TouchableOpacity
                style={blockInGroup}
                onPress={() => {
                  navigation.navigate('ChangePassword', {
                    onGoBack: isSuccess => onGoBackFromPasword(isSuccess),
                    // person: navigation.state.params,
                  });
                }}>
                <SvgUri width="13" height="13" svgXmlData={PasswordIcon} />
                <Text style={text}>Изменить пароль</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{}}>
            <View style={groupBlock}>
              {/* ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ*/}
              <TouchableOpacity
                style={[blockInGroup, borderBottom]}
                onPress={() => {
                  alert('Политика конфиденциальности');
                }}>
                <Text style={{fontSize: 13}}>
                  Политика конфиденциальности и Условия использования
                </Text>
              </TouchableOpacity>
              {/* ВАШ ГОРОД*/}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChangeCity', {
                    city: USER.data.me.profile.city
                      ? USER.data.me.profile.city
                      : '',
                    id: USER.data.me.profile.id,
                  });
                }}>
                <View
                  style={[
                    blockInGroup,
                    borderBottom,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  ]}>
                  <Text style={{fontSize: 13}}>Ваш город</Text>
                  <Text style={{fontWeight: 'bold'}}>
                    {USER && USER.data.me.profile.city
                      ? USER.data.me.profile.city.name
                      : ''}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* СВЯЗЬ С ПООДЕРЖКОЙ*/}
              <TouchableOpacity
                style={blockInGroup}
                onPress={() => {
                  alert('Связь с поддержкой');
                }}>
                <Text style={{fontSize: 13}}>
                  Связаться с поддержкой Prof.Ma
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{margin: 8}}>
          {isChangePassword && (
            <SaveSuccess title="👍 Новый пароль успешно сохранён." />
          )}
          {!isChangePassword && (
            <ButtonDefault
              title="выйти из профиля"
              onPress={() => {
                LOGOUT_mutation()
                  .then(res => {
                    console.log(res);
                    handleChangeLoginState(false);
                    navigation.navigate('Start');
                  })
                  .catch(err => console.log(err));
              }}
            />
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  first: {
    marginTop: 10,
    height: 50,
    borderRadius: 0.2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 13,
    marginLeft: 13,
    fontFamily: 'FuturaPT-Bold',
  },
  groupBlock: {
    marginTop: 20,
    borderRadius: 0.2,

    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 0.4,
    flexDirection: 'column',
    paddingLeft: 18,
  },
  blockInGroup: {
    height: 50,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 8,
  },
  borderBottom: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.4,
  },
});

export default ClientProfile;
