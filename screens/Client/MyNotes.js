import React from 'react';
import SvgUri from 'react-native-svg-uri';

import BackgroundHeader, {Header} from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import {people} from '../../data';
import CalendarGrayIcon from '../../img/calendarGray.svg';
import CalendarColorIcon from '../../img/CalendarColor.svg';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Query, useMutation, useQuery} from 'react-apollo';

import {LOGOUT, ME} from '../../QUERYES';

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

const Block = ({el, navigation, key, archive}) => {
  console.log(el, 'ELLLLLLLLLLLLLLLLLll');

  const {block, topBlock, img, textBold, dateText, bottomBlock} = styles;
  return (
    <TouchableOpacity
      style={block}
      key={key}
      onPress={() => {
        navigation.navigate('NoteInformation', {
          person: el,
        });
      }}>
      <View style={topBlock}>
        <View style={{flexDirection: 'row', flex: 6, alignItems: 'center'}}>
          <SvgUri
            style={{marginRight: 5}}
            width="14"
            height="14"
            svgXmlData={archive ? CalendarGrayIcon : CalendarColorIcon}
          />
          <Text style={[dateText, {color: archive ? '#A6ADB3' : '#B986DA'}]}>
            {el.date.split('-')[2]} {shortMonthName[+el.date.split('-')[1]]} в{' '}
            {el.time.slice(0, 5)}
          </Text>
        </View>
        <View style={{flex: 4}}>
          <Text style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
            ???????????? руб.
          </Text>
        </View>
      </View>
      <View style={bottomBlock}>
        <Image
          style={img}
          source={{
            uri: el.img,
          }}
        />
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10, color: archive ? '#A6ADB3' : 'black'}}>
              Мастер
            </Text>
            <Text style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
              {el.master.profile.name}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
              {el.master.profile.work_address}
            </Text>
            <Text style={{fontSize: 10}}>Садовая</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10, color: archive ? '#A6ADB3' : 'black'}}>
              Услуга
            </Text>
            <Text style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
              {el.offers[0].service.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MyNotes = ({navigation}) => {
  const {bigText, smallText, textBold, blockTitle, block} = styles;

  const USER = useQuery(ME);

  if (USER.error) {
    return <Text>Error</Text>;
  } else if (USER.loading) {
    return <Text>Loading...</Text>;
  } else if (USER.data) {
    console.log(USER.data.me.client_appointments, '______________--USER');
    return (
      <View style={{flex: 1}}>
        {!USER.data.me.client_appointments.length && (
          <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <View style={{flex: 1, paddingHorizontal: 18}}>
              <View style={{flex: 8}}>
                <Text style={bigText}>
                  У вас пока нет ни одной активной записи😞
                </Text>
                <Text style={smallText}>
                  Сделайте вашу первую запись уже сегодня.
                </Text>
              </View>
              <View style={{}}>
                <ButtonDefault
                  title="Записаться на сеанс"
                  active={true}
                  style={{marginBottom: 8}}
                />
                <ButtonDefault
                  title="Найти мастера"
                  style={{marginBottom: 8}}
                />
              </View>
            </View>
          </View>
        )}
        {!!USER.data.me.client_appointments.length && (
          <View style={{flex: 1}}>
            <BackgroundHeader navigation={navigation} title="Мои записи" />
            <ScrollView style={{flex: 1, paddingHorizontal: 8, marginTop: 10}}>
              <Text style={blockTitle}>Активные записи</Text>
              {USER.data.me.client_appointments.map((el, i) => {
                if (el.status) {
                  return <Block el={el} navigation={navigation} key={i} />;
                }
              })}
              <Text style={blockTitle}>Архив записей</Text>
              {USER.data.me.client_appointments.map((el, i) => {
                if (el.status) {
                  return (
                    <Block
                      el={el}
                      navigation={navigation}
                      archive={true}
                      key={i}
                    />
                  );
                }
              })}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  bigText: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: 'bold',
    width: '90%',
  },
  smallText: {
    marginTop: 15,
  },
  block: {
    flex: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    marginBottom: 8,
    paddingLeft: 8,
  },
  topBlock: {
    height: 33,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E6E8E9',
    borderBottomWidth: 0.5,
    paddingRight: 8,
  },
  img: {
    height: 75,
    width: 75,
    marginRight: 8,
    borderRadius: 3,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 16,
  },
  blockTitle: {
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 18,
    marginTop: 15,
    fontSize: 13,
    marginBottom: 8,
  },
  dateText: {
    color: '#B986DA',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomBlock: {
    marginTop: 5,
    flexDirection: 'row',
    height: 92,
    paddingRight: 8,
  },
});

export default MyNotes;
