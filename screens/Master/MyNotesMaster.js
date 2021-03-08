import React, {useEffect, useState} from 'react';
import SvgUri from 'react-native-svg-uri';
import CalendarGrayIcon from '../../img/calendarGray.svg';
import CalendarColorIcon from '../../img/CalendarColor.svg';

import {useQuery} from 'react-apollo';
import {ME} from '../../QUERYES';

import BackgroundHeader, {Header} from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import {shortMonthName} from '../../constants';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from 'react-native';

const Block = ({el, navigation, archive, reload, me}) => {
  const {
    block,
    blockIos,
    topBlock,
    img,
    textBold,
    dateText,
    bottomBlock,
  } = styles;

  const [price, setPrice] = useState(0),
    [offersAll, setOffersAll] = useState([]),
    [photo, setPhoto] = useState(
      'https://hornews.com/upload/images/blank-avatar.jpg',
    );

  useEffect(() => {
    if (me.master_appointments && me.master_appointments.length) {
      me.master_appointments.forEach(el => {
        el.photos.forEach(
          photo =>
            photo.src && setPhoto('http://194.87.145.192/storage/' + photo.src),
        );
      });
    }

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
      style={Platform.OS === 'ios' ? blockIos : block}
      onPress={() =>
        navigation.navigate('NoteInformationMaster', {
          el: el,
          reload: reload,
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
            uri: photo,
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
            {!!offersAll.length &&
              offersAll.map((el, i) => (
                <Text key={i} style={[textBold, {color: isArchColore}]}>
                  {el}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MyNotesMaster = ({navigation}) => {
  const {bigText, smallText, blockTitle} = styles;

  const USER = useQuery(ME);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    USER.refetch().then(res => {
      !res.loading && res.data && setRefreshing(false);
    });
  };

  const reload = () => USER.refetch();

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
              {/* <ButtonDefault
                title="Записаться на сеанс"
                active={true}
                style={{marginBottom: 8}}
              /> */}
              <ButtonDefault
                title="Найти мастера"
                style={{marginBottom: 8}}
                onPress={() => navigation.navigate('Main', {})}
              />
            </View>
          </View>
        </View>
      )}

      <View
        style={{
          flex:
            !!USER.data && !!USER.data.me.master_appointments.length ? 1 : 0,
        }}>
        {!!USER.data && !!USER.data.me.master_appointments.length && (
          <BackgroundHeader navigation={navigation} title="Мои записи" />
        )}

        {USER.loading && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: Dimensions.get('window').height,
              top: 0,
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
        {!!USER.data && !!USER.data.me.master_appointments.length && (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }
            style={{flex: 1, paddingHorizontal: 8, marginTop: 10}}>
            <Text style={blockTitle}>Активные записи</Text>
            {USER.data.me.master_appointments.map((el, i) => {
              if (el.status === 'Pending') {
                return (
                  <View key={i}>
                    <Block
                      me={USER.data.me}
                      el={el}
                      navigation={navigation}
                      index={i}
                      reload={reload}
                    />
                  </View>
                );
              }
            })}
          </ScrollView>
        )}
      </View>
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
  blockIos: {
    backgroundColor: '#fff',
    marginBottom: 8,
    paddingLeft: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
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
