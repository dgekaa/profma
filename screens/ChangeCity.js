import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../components/BackgroundHeader';

import {
  Text,
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
  const {groupBlock} = styles;
  const data = [
    'qwe',
    'asd',
    'zxc',
    'qwe',
    'asd',
    'zxc',
    'qwe',
    'asd',
    'zxc',
    'qwe',
    'asd',
    'zxc',
  ];
  const [city, setCity] = useState('Укажите город');

  return (
    <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
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
          <Text style={{fontSize: 13, fontWeight: 'bold'}}>{city}</Text>
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
            {data.map((el, i) => (
              <View key={i}>
                <TouchableOpacity
                  onPress={e => {
                    setCity(data[i]);
                  }}
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
    flex: 1,
    borderRadius: 2,
    shadowColor: 'red',
    shadowOpacity: 4,
    backgroundColor: '#fff',
    elevation: 2,
    marginTop: 20,
    paddingLeft: 16,
    marginBottom: 8,
  },
});

export default ChangeCity;
