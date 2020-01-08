import React from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import BackgroundHeader from '../components/BackgroundHeader';
import {ButtonDefault} from '../components/Button';

const ClientProfile = ({navigation}) => {
  const {first, text, groupBlock, blockInGroup, borderBottom} = styles;

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title={``} />
      <View style={{paddingHorizontal: 10, flex: 1}}>
        <View style={{flex: 1}}>
          {/* МОИ ЗАПИСИ */}
          <TouchableOpacity
            style={first}
            onPress={() => {
              navigation.navigate('MyNotes', navigation.state.params[0].notes);
            }}>
            <Image
              style={{height: 13, width: 13}}
              source={require('../img/calendar.png')}
            />
            <Text style={text}>Мои записи</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 2}}>
          <View style={groupBlock}>
            {/* ПЕРСОНАЛЬНЫЕ ДАННЫЕ*/}
            <TouchableOpacity
              style={[blockInGroup, borderBottom]}
              onPress={() => {
                navigation.navigate(
                  'PersonalData',
                  navigation.state.params[0].bonus,
                );
              }}>
              <Image
                style={{height: 13, width: 13}}
                source={require('../img/user.png')}
              />
              <Text style={text}>Персональные данные</Text>
            </TouchableOpacity>
            {/* ИЗМЕНИТЬ ПАРОЛЬ*/}
            <TouchableOpacity
              style={blockInGroup}
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}>
              <Image
                style={{height: 13, width: 13}}
                source={require('../img/password.png')}
              />
              <Text style={text}>Изменить пароль</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 6}}>
          <View style={groupBlock}>
            <TouchableOpacity style={[blockInGroup, borderBottom]}>
              <Text>Политика конфиденциальности и Условия использования</Text>
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
                <Text>Ваш город</Text>
                <Text style={{fontWeight: 'bold', paddingRight: 18}}>
                  {navigation.state.params[0].city}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={blockInGroup}>
              <Text>Связаться с поддержкой Prof.Ma</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <ButtonDefault
            title="выйти из профиля"
            onPress={() => {
              alert('Выход из профиля');
            }}
          />
        </View>
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
    fontSize: 15,
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
  },
  blockInGroup: {
    height: 50,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomColor: '#011627',
    borderBottomWidth: 0.4,
  },
});

export default ClientProfile;
