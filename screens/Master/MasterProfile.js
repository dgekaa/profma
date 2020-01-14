import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';

const ClientProfile = ({navigation}) => {
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

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} />
      <View style={{paddingHorizontal: 10, flex: 1}}>
        <View>
          {/* МОИ ЗАПИСИ */}
          <TouchableOpacity
            style={first}
            onPress={() => {
              navigation.navigate('MyNotes', navigation.state.params[0].notes);
            }}>
            <Image
              style={{height: 13, width: 13}}
              source={require('../../img/calendar.png')}
            />
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
                // navigation.navigate('PersonalData');
              }}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Image
                  style={{height: 13, width: 13}}
                  source={require('../../img/calendar.png')}
                />
                <Text style={text}>Мой календарь мастера</Text>
              </View>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 12,
                  backgroundColor: '#DCC3EC',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#B986DA',
                    width: 4,
                    height: 4,
                    borderRadius: 4,
                  }}></View>
              </View>
            </TouchableOpacity>
            {/* МОИ УСЛУГИ*/}
            <TouchableOpacity
              style={[blockInGroup, borderBottom]}
              onPress={() => {
                console.log(navigation, 'navigation MyServices');

                navigation.navigate('MyServices');
              }}>
              <Image
                style={{height: 13, width: 13}}
                source={require('../../img/Manicure.png')}
              />
              <Text style={text}>Мои услуги (0)</Text>
            </TouchableOpacity>
            {/* НАСТРОИТЬ РАСПИСАНИЕ*/}
            <TouchableOpacity
              style={blockInGroup}
              onPress={() => {
                // navigation.navigate('ChangePassword', {
                //   onGoBack: isSuccess => onGoBackFromPasword(isSuccess),
                // });
              }}>
              <Image
                style={{height: 13, width: 13}}
                source={require('../../img/calendar.png')}
              />
              <Text style={text}>Настроить рабочее расписание</Text>
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
                navigation.navigate('ChangeCity');
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
                <Text style={{fontWeight: 'bold', paddingRight: 18}}>
                  {navigation.state.params[0].city}
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
                <Text style={{color: '#B986DA'}}>Prof.Ma</Text>
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
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 13,
    fontFamily: 'Futura PT',
  },
  groupBlock: {
    marginTop: 20,
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 2,
    flexDirection: 'column',
    paddingLeft: 18,
    paddingRight: 8,
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
