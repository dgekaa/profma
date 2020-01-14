import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';

import {Text, Modal, View, StyleSheet, Image} from 'react-native';

const ChangePassword = ({navigation}) => {
  const {blockTitle, groupBlock} = styles;

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title={`Изменить пароль`} />
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <View style={{flex: 3}}>
          <Text style={blockTitle}>изменить пароль</Text>
          <View style={groupBlock}>
            <InputWithPassword
              text="Введите новый пароль"
              withoutShadow={true}
              secureTextEntry={true}
            />
            <View
              style={{height: 0.5, backgroundColor: '#aaa', marginLeft: 16}}
            />
            <InputWithPassword
              text="Повторите новый пароль"
              withoutShadow={true}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={{flex: 4}}>
          <View
            style={{
              flexDirection: 'row',
              height: 75,
              width: '90%',
              alignSelf: 'center',
            }}>
            <View style={{width: '20%', marginRight: 5}}>
              <Image
                style={{height: 75, width: 75}}
                source={require('../../img/girl4.png')}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                paddingHorizontal: 5,
                width: '80%',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 13}}>
                Мы советуем вам
              </Text>
              <Text style={{fontSize: 13}}>
                Использовать пароль, содержащий не менее 6-ти знаков и хотя бы с
                одним специальным символом
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{padding: 16}}>
        {false && <ButtonDisabled title="введённые пароли не совпадают" />}
        {true && (
          <ButtonDefault
            title="Сохранить новый пароль"
            active={true}
            onPress={() => {
              navigation.state.params.onGoBack(true);
              navigation.goBack();
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    borderRadius: 2,
    shadowOpacity: 4,
    backgroundColor: '#fff',
    elevation: 2,
    // paddingLeft: 18,
  },
  blockTitle: {
    marginTop: 20,
    marginBottom: 8,
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 8,
  },
});

export default ChangePassword;
