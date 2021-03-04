import React, {useState} from 'react';
import {useMutation, useQuery} from 'react-apollo';
import ErrorInternetProblems from '../ErrorInternetProblems';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Platform,
} from 'react-native';
import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';
import {ScrollView} from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import CalendarSvgIcon from '../../img/CalendarSVG.svg';
import ManicureIcon from '../../img/Manicure.svg';
import UserIcon from '../../img/UserNew.svg';
import PasswordIcon from '../../img/Password.svg';

import {LOGOUT, ME} from '../../QUERYES';

const MasterProfile = ({navigation, handleChangeLoginState}) => {
  const {
    first,
    text,
    groupBlock,
    blockInGroup,
    borderBottom,
    outsideCircle,
    insideCircle,
    firstIos,
    groupBlockIos,
  } = styles;

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

  const [LOGOUT_mutation] = useMutation(LOGOUT);
  const USER = useQuery(ME);

  const reload = () => USER.refetch();

  if (USER.error) {
    return <ErrorInternetProblems reload={() => reload()} />;
  } else {
    return (
      <View style={{flex: 1}}>
        <BackgroundHeader navigation={navigation} title={`Мой профиль`} />
        <ScrollView>
          <View style={{paddingHorizontal: 10, flex: 1}}>
            <View>
              {/* МОИ ЗАПИСИ */}
              <TouchableOpacity
                style={Platform.OS === 'ios' ? firstIos : first}
                onPress={() =>
                  USER.data &&
                  navigation.navigate('MyNotesMaster', USER.data.me.profile)
                }>
                <SvgUri width="16" height="16" svgXmlData={CalendarSvgIcon} />
                <Text style={text}>Мои записи</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={Platform.OS === 'ios' ? groupBlockIos : groupBlock}>
                {/* КАЛЕНДАРЬ*/}
                <TouchableOpacity
                  style={[
                    blockInGroup,
                    borderBottom,
                    {justifyContent: 'space-between', alignItems: 'center'},
                  ]}
                  onPress={() => navigation.navigate('MasterCalendar')}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <SvgUri
                      width="16"
                      height="16"
                      svgXmlData={CalendarSvgIcon}
                    />
                    <Text style={text}>Мой календарь мастера</Text>
                  </View>
                  <View style={outsideCircle}>
                    <View style={insideCircle} />
                  </View>
                </TouchableOpacity>
                {/* МОИ УСЛУГИ*/}
                <TouchableOpacity
                  style={[blockInGroup, borderBottom]}
                  onPress={() =>
                    USER.data &&
                    navigation.navigate('MyServices', {
                      ID: USER.data.me.id,
                      reload,
                      reloadUserData: USER.refetch,
                    })
                  }>
                  <SvgUri width="16" height="16" svgXmlData={ManicureIcon} />
                  <Text style={text}>
                    Мои услуги {!!USER.data && USER.data.me.offers.length}
                  </Text>
                </TouchableOpacity>
                {/* НАСТРОИТЬ РАСПИСАНИЕ*/}
                <TouchableOpacity
                  style={blockInGroup}
                  onPress={() => {
                    navigation.navigate(
                      'WorkTimeSettings',
                      navigation.state.params,
                    );
                  }}>
                  <SvgUri width="16" height="16" svgXmlData={CalendarSvgIcon} />
                  <Text style={text}>Настроить рабочее расписание</Text>
                </TouchableOpacity>
              </View>
              <View style={Platform.OS === 'ios' ? groupBlockIos : groupBlock}>
                {/* ПЕРСОНАЛЬНЫЕ ДАННЫЕ*/}
                <TouchableOpacity
                  style={[blockInGroup, borderBottom]}
                  onPress={() => navigation.navigate('PersonalDataMaster')}>
                  <SvgUri width="16" height="16" svgXmlData={UserIcon} />
                  <Text style={text}>Персональные данные</Text>
                </TouchableOpacity>
                {/* ИЗМЕНИТЬ ПАРОЛЬ*/}
                <TouchableOpacity
                  style={[blockInGroup]}
                  onPress={() => {
                    navigation.navigate('ChangePassword', {
                      onGoBack: isSuccess => onGoBackFromPasword(isSuccess),
                      person: navigation.state.params,
                    });
                  }}>
                  <SvgUri width="16" height="16" svgXmlData={PasswordIcon} />
                  <Text style={text}>Изменить пароль</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginBottom: 8}}>
              <View style={Platform.OS === 'ios' ? groupBlockIos : groupBlock}>
                {/* ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ*/}
                <TouchableOpacity
                  style={[blockInGroup, borderBottom]}
                  onPress={() => alert('Политика конфиденциальности')}>
                  <Text style={{fontSize: 13}}>
                    Политика конфиденциальности и Условия использования
                  </Text>
                </TouchableOpacity>
                {/* ВАШ ГОРОД*/}
                <TouchableOpacity
                  onPress={() => {
                    USER.data &&
                      navigation.navigate('ChangeCity', {
                        city: USER.data.me.profile.city
                          ? USER.data.me.profile.city
                          : '',
                        id: USER.data.me.profile.id,
                        reload,
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
                      {USER.data && USER.data.me.profile.city
                        ? USER.data.me.profile.city.name
                        : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={blockInGroup}
                  onPress={() => alert('Связь с поддержкой')}>
                  <Text style={{fontSize: 13}}>
                    Связаться с поддержкой{' '}
                    <Text style={{color: '#B986DA'}}> Prof.Ma</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{margin: 8, marginBottom: 30}}>
          {isChangePassword && (
            <SaveSuccess title="👍 Новый пароль успешно сохранён." />
          )}
          {!isChangePassword && (
            <ButtonDefault
              title="выйти из профиля"
              onPress={() => {
                LOGOUT_mutation()
                  .then(res => {
                    handleChangeLoginState();
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    borderRadius: 0.2,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 0.4,
  },
  firstIos: {
    backgroundColor: '#fff',
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    borderRadius: 0.2,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  text: {
    fontSize: 13,
    marginLeft: 8,
    fontFamily: 'FuturaPT-Bold',
  },
  groupBlock: {
    marginTop: 20,
    flexDirection: 'column',
    paddingLeft: 18,
    paddingRight: 0,
    borderRadius: 0.2,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 0.4,
  },
  groupBlockIos: {
    backgroundColor: '#fff',
    marginTop: 20,
    flexDirection: 'column',
    paddingLeft: 18,
    paddingRight: 0,
    borderRadius: 0.2,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
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
    borderBottomWidth: 0.3,
  },
  outsideCircle: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#DCC3EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideCircle: {
    backgroundColor: '#B986DA',
    width: 4,
    height: 4,
    borderRadius: 4,
  },
});

export default MasterProfile;
