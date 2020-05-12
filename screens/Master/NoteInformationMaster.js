import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';
import {people} from '../../data';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
const shortMonthName = [
  'Янв',
  'Фев',
  'Март',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сент',
  'Окт',
  'Нояб',
  'Дек',
];
const NoteInformationMaster = ({navigation}) => {
  const {
    first,
    text,
    blockTitle,
    groupBlock,
    blockInGroup,
    borderBottom,
  } = styles;

  const {client_id, services, time, day, month, year} = navigation.state.params;

  const isActive = true;
  const [isCompleted, setIsCompleted] = useState(false);

  const [price, setPrice] = useState();

  useEffect(() => {
    services.length > 1
      ? services.reduce((el, i) =>
          setPrice(Number(el.how_mach) + Number(i.how_mach)),
        )
      : services.length && setPrice(services[0].how_mach);
  }, []);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title={isCompleted ? 'Сеанс завершён' : 'Вы записаны к мастеру'}
      />
      <ScrollView style={{}}>
        <View style={{flex: 1, paddingHorizontal: 8, paddingTop: 15}}>
          <Text style={blockTitle}>персональные данные</Text>
          <View style={groupBlock}>
            <View style={[blockInGroup, borderBottom]}>
              <Text style={{fontSize: 10}}>Имя клиента</Text>
              {people
                .filter(index => index.id == client_id)
                .map(index => (
                  <Text key={index.id} style={text}>
                    {index.client_name}
                  </Text>
                ))}
            </View>
            <View style={blockInGroup}>
              <Text style={{fontSize: 10}}>Мобильный телефон клиента</Text>
              {people
                .filter(index => index.id == client_id)
                .map(index => (
                  <Text key={index.id} style={text}>
                    {index.phone_number}
                  </Text>
                ))}
            </View>
          </View>
          {/* УСЛУГИ */}
          <View>
            <Text style={blockTitle}>Услуги</Text>
            <View>
              <View style={groupBlock}>
                {services.map((el, i) => (
                  <View
                    key={i}
                    style={[
                      borderBottom,
                      {
                        height: 60,
                        flexDirection: 'row',
                      },
                    ]}>
                    <View
                      style={{
                        flex: 4,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <SvgUri source={require('../../img/Default.svg')} />
                      <View style={{paddingHorizontal: 5}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                          {el.name}
                        </Text>
                        <Text style={{fontSize: 10}}>{el.how_long} час.</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 10}}>Стоимость услуги</Text>
                      <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                        {el.how_mach} руб.
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
                  <SvgUri source={require('../../img/Plus.svg')} />
                  <Text
                    style={{fontSize: 13, fontWeight: 'bold', paddingLeft: 5}}>
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
              <Text style={{fontWeight: 'bold'}}>
                {day} {shortMonthName[+month - 1].toLowerCase()} {year}
              </Text>
              <Text> в {time}</Text>
            </View>
          </View>
          {/* АДРЕС ПРОВЕДЕНИЯ СЕАНСА */}
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
              <Text style={{fontSize: 10}}>!!!!!!!!!!!!</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 13, fontWeight: 'bold', flex: 1}}>
                  !!!!!!!!!!!!!!
                </Text>
                <Text style={{fontSize: 10, flex: 1}}>!!!!!!!!!!!!!!!!!</Text>
              </View>
            </View>
          </View>
        </View>
        {isActive && (
          <View style={{marginBottom: 20, paddingHorizontal: 16}}>
            <Text>Итоговая стоимость сеанса</Text>
            <Text style={{fontWeight: 'bold'}}>{price} руб</Text>
          </View>
        )}
        <View style={{paddingHorizontal: 8, paddingBottom: 8}}>
          {isActive && (
            <View>
              <ButtonDefault
                style={{marginBottom: 8}}
                active={true}
                title="завершить сеанс"
                onPress={() => {
                  navigation.navigate('CompleteSeance', {
                    complete: bool => {
                      setIsCompleted(bool);
                      // setTimeout(() => {
                      //   setIsCompleted(false);
                      // }, 1000);
                    },
                    price,
                    data: navigation.state.params,
                  });
                }}
              />
              {isCompleted && (
                <SaveSuccess title="👍 Сеанс был успешно завершён." />
              )}
              {!isCompleted && (
                <ButtonDefault
                  title="отменить запись"
                  onPress={() => {
                    alert('Отмена записи');
                  }}
                />
              )}
            </View>
          )}
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
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  blockTitle: {
    fontSize: 10,
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
    elevation: 1,
    flexDirection: 'column',
    paddingLeft: 18,
  },
  blockInGroup: {
    height: 50,
    borderRadius: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 8,
  },
  borderBottom: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.3,
  },
});

export default NoteInformationMaster;
