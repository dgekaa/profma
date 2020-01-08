import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../components/BackgroundHeader';
import {ButtonDefault} from '../components/Button';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const NoteInformation = ({navigation}) => {
  const {first, text, blockTitle, groupBlock} = styles;
  const {name, services, date, time, address} = navigation.state.params;
  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title={`Вы записаны к мастеру`}
      />
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 8, paddingTop: 15}}>
          <View style={first}>
            <Text style={text}>{name}</Text>
          </View>
          {/* УСЛУГИ */}
          <View style={{}}>
            <Text style={blockTitle}>Услуги</Text>
            <View>
              <View style={groupBlock}>
                {services.map(el => (
                  <View
                    style={{
                      height: 60,
                      flexDirection: 'row',
                      borderBottomColor: '#aaa',
                      borderBottomWidth: 0.3,
                    }}>
                    <View
                      style={{
                        flex: 4,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image source={require('../img/Default.png')} />
                      <View style={{paddingHorizontal: 5}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                          {el.name}
                        </Text>
                        <Text style={{fontSize: 10}}>{el.howLong} мин.</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 10}}>Стоимость услуги</Text>
                      <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                        {el.howMach} руб.
                      </Text>
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => {
                    alert('Добавит новую услугу');
                  }}
                  style={{
                    height: 60,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image source={require('../img/Plus.png')} />
                  <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                    Добавить услугу
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* ДАТА И ВРЕМЯ */}
          <View>
            <Text style={blockTitle}>дата и время сеанса</Text>
            <View style={[first, {flexDirection: 'row'}]}>
              <Text>{date}</Text>
              <Text> в {time}</Text>
            </View>
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={blockTitle}>Адрес проведения сеанса</Text>
            <View
              style={[
                first,
                {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                },
              ]}>
              <Text>У мастера на дому</Text>
              <Text style={{fontWeight: 'bold'}}>{address.address}</Text>
            </View>
          </View>

          <ButtonDefault
            title="Повторить запись"
            onPress={() => {
              alert('Будет повтор записи');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  first: {
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
    fontFamily: 'Futura PT',
  },
  blockTitle: {
    marginTop: 20,
    marginBottom: 8,
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 8,
  },
  groupBlock: {
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 2,
    flexDirection: 'column',
    paddingLeft: 18,
  },
});

export default NoteInformation;
