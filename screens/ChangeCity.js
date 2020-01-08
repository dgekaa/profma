import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../components/BackgroundHeader';
import {InputWithText} from '../components/Input';

import {
  Text,
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

const Border = () => (
  <View style={{height: 0.5, backgroundColor: '#aaa', marginLeft: 16}} />
);

const ChangeCity = ({navigation}) => {
  const data = ['qwe', 'asd', 'zxc'];
  const {groupBlock} = styles;

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title={`Выбрать другой город`}
      />
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <View
          style={{
            height: 60,
            padding: 10,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 10}}>Ваш город</Text>
          <Text style={{fontSize: 13, fontWeight: 'bold'}}>Питер</Text>
        </View>

        <View
          style={{
            height: 60,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 19,
            shadowColor: 'rgba(0, 0, 0, 0.17)',
            elevation: 2,
          }}>
          <Image
            style={{marginRight: 10}}
            source={require('../img/Search.png')}
          />
          <TextInput placeholder="Найти город.." />
        </View>

        <View style={[groupBlock]}>
          <ScrollView>
            {data.map(el => (
              <View>
                <TouchableOpacity
                  style={{
                    height: 50,
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 13, fontWeight: 'bold'}}>{el}</Text>
                </TouchableOpacity>
                <Border />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    borderRadius: 2,
    shadowColor: 'red',
    shadowOpacity: 4,
    backgroundColor: '#fff',
    elevation: 2,
    marginTop: 20,
    paddingLeft: 16,
  },
});

export default ChangeCity;
