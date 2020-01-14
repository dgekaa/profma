import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithText, InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

const ServiceDescription = ({navigation}) => {
  const {groupBlock, blockTitle, blockInGroup, borderBottom} = styles;

  const [howPay, setHowPay] = useState('time');

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Описание услуги (1\4)" />
      <ScrollView>
        <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
          <Text style={blockTitle}>ваша специализация</Text>
          <View style={[groupBlock, blockInGroup]}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              Мастер маникюра
            </Text>
          </View>
          <Text style={blockTitle}>ваша услуга</Text>
          <View style={[groupBlock, blockInGroup]}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              Европейский маникюр
            </Text>
          </View>
          <View
            style={[
              groupBlock,
              {paddingLeft: 8, paddingTop: 8, marginTop: 20, marginBottom: 10},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <ButtonDefault
                onPress={() => {
                  setHowPay('time');
                }}
                style={{marginRight: 5}}
                flex={true}
                title="оплата по времени"
                active={howPay === 'time' ? true : false}
              />
              <ButtonDefault
                onPress={() => {
                  setHowPay('nail');
                }}
                flex={true}
                style={{marginRight: 8}}
                active={howPay === 'nail' ? true : false}
                title="оплата за ноготь"
              />
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 8,
                }}>
                <Image source={require('../../img/Default.png')} />
                <InputWithText
                  err="Поле обязательно для заполнения"
                  text={
                    howPay == 'time'
                      ? `Продолжительность услуги (в часах)`
                      : 'Количество ногтей'
                  }
                  placeholder={`Укажите продолжительность сеанса`}
                  withoutShadow={true}
                  style={[borderBottom, {flex: 1}]}
                  onChangeText={text => {
                    console.log(text);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                }}>
                <Image source={require('../../img/Default.png')} />
                <InputWithText
                  text={`Стоимость услуги`}
                  placeholder={`Укажите стоимость сеанса`}
                  withoutShadow={true}
                  onChangeText={text => {
                    console.log(text);
                  }}
                  style={{flex: 1}}
                />
                <Text
                  style={{
                    paddingHorizontal: 8,
                    paddingTop: 20,
                    fontSize: 13,
                    color: 'rgba(0,0,0,.2)',
                    fontWeight: 'bold',
                  }}>
                  руб
                </Text>
              </View>
            </View>
          </View>
          <Text style={blockTitle}>Описание услуги</Text>
          <View style={[groupBlock, blockInGroup]}>
            <TextInput placeholder="Расскажите об услуге поподробнее" />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '85%',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 16,
          }}>
          <View>
            <Image source={require('../../img/girl6.png')} />
          </View>
          <View style={{marginLeft: 8}}>
            <Text style={{fontSize: 13, paddingRight: 25}}>
              Чтобы клиенты могли начать пользоваться вашей услугой,
              <Text style={{fontWeight: 'bold'}}>
                {' '}
                сначала укажите её детали.
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{margin: 8}}>
        <ButtonDefault title={`удалить услугу`} style={{marginBottom: 8}} />
        <ButtonDefault title={`ВЫ не указали детали услуги`} active={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    marginTop: 8,
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 1,
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
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 13,
    fontFamily: 'Futura PT',
  },
  blockTitle: {
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 18,
    marginTop: 15,
    fontSize: 10,
  },
});

export default ServiceDescription;
