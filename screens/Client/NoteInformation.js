import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import ModalWindow from '../../components/ModalWindow';
import SvgUri from 'react-native-svg-uri';
import DefaultIcon from '../../img/Default.svg';

import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';

const shortMonthName = [
  'Янв',
  'Фев',
  'Март',
  'Апр',
  'Май',
  'Июнь',
  'Июль',
  'Авг',
  'Сент',
  'Окт',
  'Нояб',
  'Дек',
];

const NoteInformation = ({navigation}) => {
  const {first, text, blockTitle, groupBlock} = styles;
  console.log(navigation.state.params, 'PARAMS');

  const [cancelNote, setCancelNote] = useState(false);
  const [canceledNote, setCanceledNote] = useState(false);

  const isActive = true;
  const isCompleted = false;
  const isAbort = false;

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title={isAbort ? `Запись к мастеру завершена` : `Вы записаны к мастеру`}
      />
      <ScrollView style={{}}>
        <View style={{flex: 1, paddingHorizontal: 8, paddingTop: 15}}>
          <View style={first}>
            <Text style={text}>
              {navigation.state.params.person.master.profile.name}
            </Text>
          </View>
          {/* УСЛУГИ */}
          <View style={{}}>
            <Text style={blockTitle}>Услуги</Text>
            <View>
              <View style={groupBlock}>
                {navigation.state.params.person.offers.length &&
                  navigation.state.params.person.offers.map((el, i) => (
                    <View
                      key={i}
                      style={[
                        {
                          height: 60,
                          flexDirection: 'row',
                        },
                        navigation.state.params.person.offers.length - 1 === i
                          ? {}
                          : {
                              borderBottomColor: 'rgba(0,0,0,0.2)',
                              borderBottomWidth: 0.3,
                            },
                      ]}>
                      <View
                        style={{
                          flex: 4,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <SvgUri svgXmlData={DefaultIcon} />
                        <View style={{paddingHorizontal: 5}}>
                          <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                            {el.service.name}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            {el.price_by_pack.duration} час.
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          paddingRight: 16,
                        }}>
                        <Text style={{fontSize: 10, textAlign: 'right'}}>
                          Стоимость услуги
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            textAlign: 'right',
                          }}>
                          {el.price_by_pack.price} руб
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </View>
          {/* ДАТА И ВРЕМЯ */}
          <View>
            <Text style={blockTitle}>дата и время сеанса</Text>
            <View style={[first, {flexDirection: 'row'}]}>
              <Text style={{fontWeight: 'bold'}}>
                {navigation.state.params.person.date.split('-')[2]}{' '}
                {
                  shortMonthName[
                    +navigation.state.params.person.date.split('-')[1]
                  ]
                }{' '}
                {navigation.state.params.person.date.split('-')[0]}
              </Text>
              <Text> в {navigation.state.params.person.time.slice(0, 5)}</Text>
            </View>
          </View>
          {/* АДРЕС ПРОВЕДЕНИЯ СЕАНСА */}
          {/* <View style={{marginBottom: 20}}>
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
              <Text>У мастера на дому ? !!!!</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 10, flex: 1}}>!!!!!!!!!</Text>
              </View>
            </View>
          </View> */}
        </View>
        {isActive ||
          (isAbort && (
            <View style={{marginBottom: 20, paddingHorizontal: 8}}>
              <Text>Итоговая стоимость сеанса</Text>
              <Text style={{fontWeight: 'bold'}}>!!!!!!!!!!1 руб.</Text>
            </View>
          ))}
      </ScrollView>
      <View style={{paddingHorizontal: 8, paddingBottom: 8}}>
        {isCompleted && (
          <ButtonDefault
            title="Повторить запись"
            onPress={() => {
              alert('Будет повтор записи');
            }}
          />
        )}
        {isActive && (
          <ButtonDefault
            title="Хочу отменить запись к мастеру"
            onPress={() => {
              setCancelNote(true);
            }}
          />
        )}
      </View>
      {cancelNote && (
        <ModalWindow>
          <Text style={{width: '70%', textAlign: 'center', fontSize: 13}}>
            Вы собираетесь отменить запись на
            <Text style={{fontWeight: 'bold'}}> дата</Text>в время к мастеру
          </Text>
          <Text style={{paddingVertical: 8, fontWeight: 'bold', fontSize: 13}}>
            <Text style={text}>el.master_name</Text>
          </Text>
          <Image source={require('../../img/girl5.png')} />
          <Text style={{paddingVertical: 8, fontSize: 13}}>
            Вы уверены в своём решении?
          </Text>
          <View style={{width: '100%'}}>
            <ButtonDefault
              title="нет, не отменять запись"
              active={true}
              style={{marginVertical: 8}}
              onPress={() => {
                setCancelNote(false);
              }}
            />
            <ButtonDefault
              title="отменить запись к мастеру"
              onPress={() => {
                setCancelNote(false);
                setCanceledNote(true);
              }}
            />
          </View>
        </ModalWindow>
      )}
      {canceledNote && (
        <ModalWindow>
          <Text style={{width: '85%', textAlign: 'center', fontSize: 13}}>
            Ваша запись успешно отменена.
          </Text>
          <View style={{width: '100%', marginTop: 16}}>
            <ButtonDefault
              title="Благодарю"
              onPress={() => {
                setCanceledNote(false);
              }}
            />
          </View>
        </ModalWindow>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  first: {
    height: 50,
    borderRadius: 0.2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 15,
    fontFamily: 'FuturaPT-Bold',
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
    borderRadius: 0.2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 0.4,
    flexDirection: 'column',
    paddingLeft: 18,
  },
});

export default NoteInformation;
