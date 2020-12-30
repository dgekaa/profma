import React, {useEffect, useState} from 'react';
import SvgUri from 'react-native-svg-uri';
import CalendarGrayIcon from '../../img/calendarGray.svg';
import CalendarColorIcon from '../../img/CalendarColor.svg';

import {Query, useMutation, useQuery} from 'react-apollo';
import {
  LOGOUT,
  ME,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,
} from '../../QUERYES';

import BackgroundHeader, {Header} from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

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

const Block = ({el, navigation, archive, refetch}) => {
  const {block, topBlock, img, textBold, dateText, bottomBlock} = styles;

  const [price, setPrice] = useState(0);
  const [offersAll, setOffersAll] = useState([]);

  useEffect(() => {
    let count = 0;
    el.offers.length &&
      el.offers.forEach((elem, i) => {
        count += elem.price_by_pack.price;
      });
    setPrice(count);

    let offersAllLocal = [];
    el.offers.length &&
      el.offers.forEach(
        (elem, i) => i < 2 && offersAllLocal.push(elem.service.name),
      );
    setOffersAll(offersAllLocal);
  }, []);

  const isArchColore = archive ? '#A6ADB3' : 'black';

  return (
    <TouchableOpacity
      style={block}
      onPress={() =>
        navigation.navigate('NoteInformationMaster', {
          el: el,
          refetch: refetch,
        })
      }>
      <View style={topBlock}>
        <View style={{flexDirection: 'row', flex: 6, alignItems: 'center'}}>
          <SvgUri
            style={{marginRight: 8}}
            svgXmlData={archive ? CalendarGrayIcon : CalendarColorIcon}
          />
          <Text style={[dateText, {color: isArchColore}]}>
            {el.date.split('-')[2]} {shortMonthName[+el.date.split('-')[1]]} в{' '}
            {el.time.slice(0, 5)}
          </Text>
        </View>
        <View style={{flex: 4}}>
          <Text style={[textBold, {color: isArchColore}]}>
            {!!price && price + ' руб.'}
          </Text>
        </View>
      </View>
      <View style={bottomBlock}>
        <Image
          style={img}
          source={{
            uri: 'https://hornews.com/upload/images/blank-avatar.jpg',
          }}
        />
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10, color: isArchColore}}>Клиент</Text>

            <Text style={[textBold, {color: isArchColore}]}>
              {el.client.profile.name}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[textBold, {color: isArchColore}]}>
              {el.client.profile.home_address}
            </Text>

            <Text style={{fontSize: 10}}>?метро?</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10, color: isArchColore}}>Услуга</Text>
            {console.log(offersAll, '---offersAll')}
            {!!offersAll.length &&
              offersAll.map((el, i) => (
                <Text style={[textBold, {color: isArchColore}]}>{el}</Text>
              ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MyNotesMaster = ({navigation}) => {
  const {bigText, smallText, textBold, blockTitle, block} = styles;

  const USER = useQuery(ME);

  console.log(USER, ' USER MY NOTES MASTER');

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      {USER.data && !USER.data.me.master_appointments.length && (
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
              <ButtonDefault title="Найти мастера" style={{marginBottom: 8}} />
            </View>
          </View>
        </View>
      )}
      {USER.loading && <ActivityIndicator size="large" color="#00ff00" />}
      {!!USER.data && !!USER.data.me.master_appointments.length && (
        <View style={{flex: 1}}>
          <BackgroundHeader navigation={navigation} title="Мои записи" />
          <ScrollView style={{flex: 1, paddingHorizontal: 8, marginTop: 10}}>
            <Text style={blockTitle}>Активные записи</Text>
            {USER.data.me.master_appointments.map((el, i) => {
              if (el.status === 'Pending') {
                return (
                  <View key={i}>
                    <Block
                      el={el}
                      navigation={navigation}
                      index={i}
                      refetch={USER.refetch}
                    />
                  </View>
                );
              }
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
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
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    marginBottom: 8,
    paddingLeft: 8,
    marginHorizontal: 8,
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
  },
  blockTitle: {
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 18,
    marginTop: 15,
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

export default MyNotesMaster;
