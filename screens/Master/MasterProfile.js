import React, {useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';
import {ScrollView} from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import CalendarSvgIcon from '../../img/CalendarSVG.svg';
import ManicureIcon from '../../img/Manicure.svg';
import UserIcon from '../../img/User.svg';
import PasswordIcon from '../../img/Password.svg';

const MasterProfile = ({navigation}) => {
  const {
    first,
    text,
    groupBlock,
    blockInGroup,
    borderBottom,
    outsideCircle,
    insideCircle,
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

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title={`Мой профиль`} />
      <ScrollView>
        <View style={{paddingHorizontal: 10, flex: 1}}>
          <View>
            {/* МОИ ЗАПИСИ */}
            <TouchableOpacity
              style={first}
              onPress={() => {
                navigation.navigate('MyNotesMaster', navigation.state.params);
              }}>
              <SvgUri width="13" height="13" svgXmlData={CalendarSvgIcon} />
              <Text style={text}>Мои записи</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={groupBlock}>
              {/* КАЛЕНДАРЬ*/}
              <TouchableOpacity
                style={[
                  blockInGroup,
                  borderBottom,
                  {justifyContent: 'space-between', alignItems: 'center'},
                ]}
                onPress={() => {
                  navigation.navigate(
                    'MasterCalendar',
                    navigation.state.params,
                  );
                }}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <SvgUri width="13" height="13" svgXmlData={CalendarSvgIcon} />
                  <Text style={text}>Мой календарь мастера</Text>
                </View>
                <View style={outsideCircle}>
                  <View style={insideCircle} />
                </View>
              </TouchableOpacity>
              {/* МОИ УСЛУГИ*/}
              <TouchableOpacity
                style={[blockInGroup, borderBottom]}
                onPress={() => {
                  navigation.navigate('MyServices', navigation.state.params);
                }}>
                <SvgUri width="13" height="13" svgXmlData={ManicureIcon} />
                <Text style={text}>
                  Мои услуги ({navigation.state.params.my_services.length})
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
                <SvgUri width="13" height="13" svgXmlData={CalendarSvgIcon} />
                <Text style={text}>Настроить рабочее расписание</Text>
              </TouchableOpacity>
            </View>
            <View style={groupBlock}>
              {/* ПЕРСОНАЛЬНЫЕ ДАННЫЕ*/}
              <TouchableOpacity
                style={[blockInGroup, borderBottom]}
                onPress={() => {
                  navigation.navigate(
                    'PersonalDataMaster',
                    navigation.state.params,
                  );
                }}>
                <SvgUri style={{height: 13, width: 13}} svgXmlData={UserIcon} />
                <Text style={text}>Персональные данные</Text>
              </TouchableOpacity>
              {/* ИЗМЕНИТЬ ПАРОЛЬ*/}
              <TouchableOpacity
                style={[blockInGroup, borderBottom]}
                onPress={() => {
                  navigation.navigate('ChangePassword', {
                    onGoBack: isSuccess => onGoBackFromPasword(isSuccess),
                    person: navigation.state.params,
                  });
                }}>
                <SvgUri
                  style={{height: 13, width: 13}}
                  svgXmlData={PasswordIcon}
                />
                <Text style={text}>Изменить пароль</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom: 8}}>
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
                    city: navigation.state.params.city,
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
                    {navigation.state.params.city}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={blockInGroup}
                onPress={() => {
                  alert('Связь с поддержкой');
                }}>
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
              alert('Выход из профиля');
            }}
          />
        )}
      </View>
    </View>
  );
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
  text: {
    fontSize: 13,
    marginLeft: 13,
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
