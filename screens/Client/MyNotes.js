import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';

import BackgroundHeader, {Header} from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import CalendarGrayIcon from '../../img/calendarGray.svg';
import CalendarColorIcon from '../../img/CalendarColor.svg';
import {shortMonthName} from '../../constants';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import {useQuery} from 'react-apollo';

import {ME, GET_USER} from '../../QUERYES';

const Block = ({el, navigation, archive, reload}) => {
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
    [offersAll, setOffersAll] = useState([]);

  useEffect(() => {
    let count = 0;
    el.offers.length &&
      el.offers.forEach((elem, i) => {
        count += elem.price_by_pack.price;
      });
    setPrice(count);

    let offersAllLocal = [];
    el.offers.length &&
      el.offers.forEach((elem, i) => {
        offersAllLocal.push(elem.service.name);
      });
    setOffersAll(offersAllLocal);
  }, []);

  const MASTER = useQuery(GET_USER, {
    variables: {id: +el.master.id},
  });

  const [photo, setPhoto] = useState(
    'https://hornews.com/upload/images/blank-avatar.jpg',
  );

  useEffect(() => {
    if (
      MASTER.data &&
      MASTER.data.user &&
      MASTER.data.user.master_appointments &&
      MASTER.data.user.master_appointments.length
    ) {
      MASTER.data.user.master_appointments.forEach(el => {
        el.photos.forEach(
          photo =>
            photo.src && setPhoto('http://194.87.145.192/storage/' + photo.src),
        );
      });
    }
  }, [MASTER]);

  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? blockIos : block}
      onPress={() =>
        navigation.navigate('NoteInformation', {
          person: el,
          reload: reload,
          reloadNearest: navigation.state.params.reloadNearest,
        })
      }>
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
            <Text style={{fontSize: 10}} />
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10, color: archive ? '#A6ADB3' : 'black'}}>
              Услуга
            </Text>
            {!!offersAll.length &&
              offersAll.map((el, i) => (
                <Text
                  key={i}
                  style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
                  {el}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MyNotes = ({navigation}) => {
  const {bigText, smallText, blockTitle} = styles;

  const USER = useQuery(ME);

  const reload = () => USER.refetch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    USER.refetch().then(res => {
      !res.loading && res.data && setRefreshing(false);
    });
  };

  return (
    <View style={{flex: 1}}>
      {USER.data && !USER.data.me.client_appointments.length && (
        <View style={{flex: 1}}>
          <Header navigation={navigation} />
          <View
            style={{
              flex: 1,
              paddingHorizontal: 18,
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 7}}>
              <Text style={bigText}>
                У вас пока нет ни одной активной записи😞
              </Text>
              <Text style={smallText}>
                Сделайте вашу первую запись уже сегодня.
              </Text>
            </View>
            <View style={{flex: 2}}>
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
      <View style={{flex: 1}}>
        <BackgroundHeader navigation={navigation} title="Мои записи" />
        {USER.loading && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
        {USER.data && !!USER.data.me.client_appointments.length && (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }
            style={{flex: 1, marginTop: 10}}>
            <Text style={blockTitle}>Активные записи</Text>
            {USER.data.me.client_appointments.map((el, i) => {
              if (el.status) {
                return (
                  <View key={i}>
                    <Block
                      el={el}
                      navigation={navigation}
                      key={i}
                      reload={reload}
                    />
                  </View>
                );
              }
            })}
            {/* <Text style={blockTitle}>Архив записей</Text>
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
        })} */}
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
    backgroundColor: '#fff',
    shadowOpacity: 0.5,
    marginBottom: 8,
    paddingLeft: 8,
    marginHorizontal: 8,
  },
  blockIos: {
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    shadowRadius: 0.2,
    marginBottom: 8,
    paddingLeft: 8,
    marginHorizontal: 8,
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
