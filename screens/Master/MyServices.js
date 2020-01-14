import React, {useState, useEffect} from 'react';

import {Header} from '../../components/BackgroundHeader';
import {InputWithText, InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';

import {Text, View, StyleSheet} from 'react-native';

const MyServices = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} />
      {false && (
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: 8, flex: 1}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              Вы пока не предоставляете ни одной услуги😞
            </Text>
            <Text style={{fontSize: 13, marginTop: 15}}>
              Создайте свою первую услугу.
            </Text>
          </View>
          <ButtonDefault
            onPress={() => {
              alert('Добавить услугу');
            }}
            title="Добавить услугу"
            active={true}
            style={{margin: 8}}
          />
        </View>
      )}
      {true && (
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: 8, flex: 1}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              Вы пока не предоставляете ни одной услуги😞
            </Text>
            <Text style={{fontSize: 13, marginTop: 15}}>
              Создайте свою первую услугу.
            </Text>
          </View>
          <ButtonDefault
            onPress={() => {
              navigation.navigate('SelectSpecialization');
            }}
            title="Добавить услугу"
            active={true}
            style={{margin: 8}}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyServices;
