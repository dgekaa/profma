import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';
import CalendarColorIcon from '../img/CalendarColor.svg';
import UserWhiteIcon from '../img/UserWhite.svg';
import CrossIcon from '../img/cross.svg';
import CalendarSvgIcon from '../img/CalendarSVG.svg';
import ErrorInternetProblems from './ErrorInternetProblems';

import CalendarCustom from '../components/Calendar';
import ModalWindow from '../components/ModalWindow';
import {ButtonDefault} from '../components/Button';
import {shortMonthName} from '../constants';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import {useQuery} from 'react-apollo';

import {
  GET_USERS,
  ME,
  FIND_MASTER,
  NEXT_APPOINTMENTS,
  NEXT_FREE_TIME_BY_MASTER,
} from '../QUERYES';

const screen = Dimensions.get('window');

const Block = ({el, navigation, dates, reload, photoArr}) => {
  const {
    block,
    blockImg,
    timeBlock,
    timeBlockWrapp,
    blockIos,
    blockAndroid,
  } = styles;

  const width = Dimensions.get('window').width;

  const nextFreeTimeByMaster = useQuery(NEXT_FREE_TIME_BY_MASTER, {
    variables: {
      master_id: +el.id || +el.user.id,
      count: 6,
    },
  });

  const getMinimalPrice = () => {
    let minimalPrice = Infinity;
    const getPrice = data => {
      data.forEach(index => {
        if (index.price_by_pack.price < minimalPrice)
          minimalPrice = index.price_by_pack.price;
      });
    };
    if (el.offers && el.offers.length) {
      getPrice(el.offers);
      return minimalPrice;
    } else if (el.user && el.user.offers && el.user.offers.length) {
      getPrice(el.user.offers);
      return minimalPrice;
    } else {
      return '';
    }
  };

  const [photo, setPhoto] = useState(
    'https://hornews.com/upload/images/blank-avatar.jpg',
  );

  useEffect(() => {
    photoArr &&
      photoArr.length &&
      photoArr.forEach(obj => {
        obj.photos.length &&
          setPhoto('http://194.87.145.192/storage/' + obj.photos[0].src);
      });
  }, [photoArr]);

  if (!!nextFreeTimeByMaster.data) {
    return (
      <TouchableOpacity
        style={[block, Platform.OS === 'ios' ? blockIos : blockAndroid]}
        onPress={() => {
          navigation.navigate('PublickMasterProfile', {
            dates: dates ? el.user.profile : el.profile,
            reload: reload,
            id: el.id || el.user.id,
          });
        }}>
        <View
          style={width < 340 ? {width: 100, marginRight: 10} : {width: 140}}>
          {el.img ? (
            <Image
              style={[blockImg, width < 340 && {width: 100}]}
              source={{uri: el.img}}
            />
          ) : (
            <Image
              style={[blockImg, width < 340 && {width: 100}]}
              source={require('../img/girl.png')}
              source={{
                uri: photo,
              }}
            />
          )}
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              {dates
                ? el.user.profile && el.user.profile.name
                : (el.profile && el.profile.name) || 'Имя не задано'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <View style={{flex: 1.2}}>
              <Text numberOfLines={1} style={{fontSize: 10}}>
                Стоимость сеанса
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 10}}>
                {getMinimalPrice()} {getMinimalPrice() ? 'руб' : '-'}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end', flex: 1.2}}>
              <Text style={{fontSize: 10}} numberOfLines={1}>
                {(el.profile && el.profile.work_address) || '-'}
              </Text>
              {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {el.metro && (
                  <View
                    style={{
                      height: 4,
                      width: 4,
                      borderRadius: 4,
                      backgroundColor: '#9155FF',
                      marginRight: 5,
                    }}
                  />
                )}
                <Text style={{fontSize: 10}}>{el.metro || ''}</Text>
              </View> */}
            </View>
          </View>
          <View style={timeBlockWrapp}>
            {!!nextFreeTimeByMaster.data &&
              !!nextFreeTimeByMaster.data.nextFreeTimeByMaster.length &&
              nextFreeTimeByMaster.data.nextFreeTimeByMaster[0].times.map(
                (el, index) => (
                  <View key={index} style={timeBlock}>
                    <Text
                      style={{
                        color: '#B986DA',
                        fontSize: 10,
                        fontWeight: 'bold',
                      }}>
                      {
                        nextFreeTimeByMaster.data.nextFreeTimeByMaster[0].date.split(
                          '-',
                        )[2]
                      }{' '}
                      {shortMonthName[
                        +nextFreeTimeByMaster.data.nextFreeTimeByMaster[0].date.split(
                          '-',
                        )[1]
                      ].toLowerCase()}{' '}
                    </Text>
                    <Text style={{color: '#B986DA', fontSize: 10}}>{el}</Text>
                  </View>
                ),
              )}
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return <Text> </Text>;
  }
};

const NearestSeansBlock = ({el, navigation, type, reload, photoArr}) => {
  const {nearestSeansBlock, nearestSeansBlockIos, dateText} = styles;

  const [offersAll, setOffersAll] = useState([]),
    [photo, setPhoto] = useState(
      'https://hornews.com/upload/images/blank-avatar.jpg',
    );

  useEffect(() => {
    let offersAllLocal = [];
    el.offers.length &&
      el.offers.forEach((elem, i) => offersAllLocal.push(elem.service.name));
    setOffersAll(offersAllLocal);
  }, []);

  useEffect(() => {
    photoArr &&
      photoArr.length &&
      photoArr.forEach(obj => {
        obj.photos.length &&
          setPhoto('http://194.87.145.192/storage/' + obj.photos[0].src);
      });
  }, [photoArr]);

  return (
    <TouchableOpacity
      key={el.id}
      style={[Platform.OS === 'ios' ? nearestSeansBlockIos : nearestSeansBlock]}
      onPress={() => {
        type === 'Client'
          ? navigation.navigate('NoteInformation', {el: el, reload: reload})
          : navigation.navigate('NoteInformationMaster', {
              el: el,
              reload: reload,
            });
      }}>
      <View>
        <Image
          source={{uri: photo}}
          style={{width: 47, height: 47, marginRight: 8}}
        />
      </View>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View>
          <Text style={{color: '#B986DA', fontSize: 10, fontWeight: 'bold'}}>
            💅Ближайший сеанс запланирован на
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 5,
          }}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <SvgUri svgXmlData={CalendarColorIcon} />
              <Text style={dateText}>
                {el.date.split('-')[2]} {shortMonthName[+el.date.split('-')[1]]}{' '}
                в {el.time.slice(0, 5)}
              </Text>
            </View>
            <Text style={{fontSize: 10}}>
              <Text>
                {type === 'Client'
                  ? el.master.profile.name
                  : el.client.profile.name}
              </Text>
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10, paddingLeft: 10}}>Услуга</Text>
            {!!offersAll.length &&
              offersAll.map((el, i) => {
                if (i < 2) {
                  return (
                    <Text
                      numberOfLines={1}
                      key={i}
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        paddingLeft: 10,
                      }}>
                      {el}
                    </Text>
                  );
                }
              })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Header = ({blockPress}) => (
  <ImageBackground
    style={styles.header}
    source={require('../img/headerBGBig.png')}>
    <TouchableOpacity style={styles.prifileBtn} onPress={() => blockPress()}>
      <SvgUri svgXmlData={UserWhiteIcon} />
      <Text style={{color: '#fff', marginLeft: 5}}>Мой профиль</Text>
    </TouchableOpacity>
  </ImageBackground>
);

const FoundMasters = ({
  findMaster,
  plural,
  dates,
  shortMonthName,
  setDates,
}) => (
  <View style={styles.foundMasters}>
    <View style={{flex: 1}}>
      <Text>{`Найдено ${findMaster.data.findMaster.length}  ${plural(
        findMaster.data.findMaster.length,
        ['мастер', 'мастера', 'мастеров'],
      )} на указанные даты:`}</Text>
      <Text
        style={{
          color: '#B986DA',
          fontSize: 13,
          fontWeight: 'bold',
        }}>
        {dates.map((el, i) => (
          <Text key={i}>
            {el.split('-')[2]}{' '}
            {shortMonthName[+el.split('-')[1] - 1].toLowerCase()},{' '}
          </Text>
        ))}
      </Text>
    </View>
    <TouchableOpacity style={styles.closeBtn} onPress={() => setDates()}>
      <SvgUri svgXmlData={CrossIcon} />
    </TouchableOpacity>
  </View>
);

const NextAppointments = ({
  nextAppointments,
  USER,
  navigation,
  reloadAppointments,
}) => {
  return nextAppointments.data &&
    !!nextAppointments.data.nextAppointments.length &&
    USER.data ? (
    <ScrollView
      style={styles.nearestSeans}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {nextAppointments.data.nextAppointments.map((el, i) => (
        <View key={i}>
          <NearestSeansBlock
            el={el}
            navigation={navigation}
            type={USER.data.me.type}
            reload={reloadAppointments}
            photoArr={el.master.master_appointments}
          />
        </View>
      ))}
    </ScrollView>
  ) : (
    <Text />
  );
};

const Main = ({navigation}) => {
  const {openCalendarIos, openCalendarAndroid, foundMasters, closeBtn} = styles;

  const whoObj = {
    Master: 'Master',
    Client: 'Client',
  };

  const [dates, setDates] = useState(),
    [cityid, setCityid] = useState(null),
    [refreshing, setRefreshing] = useState(false),
    [first, setFirst] = useState(6),
    [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const USER = useQuery(ME),
    users = useQuery(GET_USERS, {
      variables: {first: first, type: whoObj.Master},
    });

  const findMaster = useQuery(FIND_MASTER, {
      variables: {
        city_id: +cityid || null,
        dates: dates || null,
      },
    }),
    nextAppointments = useQuery(NEXT_APPOINTMENTS, {
      variables: {
        count: 5,
      },
    });

  useEffect(() => {
    console.log(users, '--users');
    setCityid(
      USER.data &&
        USER.data.me &&
        USER.data.me.profile &&
        USER.data.me.profile.city
        ? USER.data.me.profile.city.id
        : null,
    );
  }, [USER, users]);

  const showMasters = masters => {
      let arr = [];
      for (let key in masters) arr.push(key);
      setDates(arr);
    },
    plural = (number, titles) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    },
    reload = () => USER.refetch(),
    reloadAppointments = () => nextAppointments.refetch(),
    onRefresh = () => {
      setRefreshing(true);

      users.refetch().then(res => {
        nextAppointments.refetch().then(res => {
          !res.loading && res.data && setRefreshing(false);
        });
      });
    },
    blockPress = () => {
      if (USER.data) {
        const ME = USER.data.me;
        ME.type === 'Client'
          ? navigation.navigate('ClientProfile', {
              ID: ME.id,
              reloadNearest: reloadAppointments,
            })
          : navigation.navigate('MasterProfile', {ID: ME.id});
      }
    },
    refetchUsers = () => {
      setFirst(prev => prev + 6);
      users.refetch();
    };

  if (USER.error) {
    return <ErrorInternetProblems reload={() => reload()} />;
  } else {
    return (
      <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <View>
          {!dates
            ? !!users &&
              users.data && (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => onRefresh()}
                    />
                  }
                  nestedScrollEnabled={true}
                  data={users.data.users.data}
                  onEndReachedThreshold={0.1}
                  onEndReached={refetchUsers}
                  ListHeaderComponent={
                    <>
                      <Header blockPress={blockPress} />
                      <NextAppointments
                        nextAppointments={nextAppointments}
                        USER={USER}
                        navigation={navigation}
                        reloadAppointments={reloadAppointments}
                      />
                    </>
                  }
                  renderItem={({item, index}) => (
                    <Block
                      navigation={navigation}
                      el={item}
                      reload={reloadAppointments}
                      photoArr={item.master_appointments}
                      blockId={index}
                    />
                  )}
                  keyExtractor={item =>
                    dates ? item.user.id : item.id.toString()
                  }
                />
              )
            : !!findMaster.data &&
              !!findMaster.data.findMaster && (
                <FlatList
                  data={findMaster.data.findMaster}
                  ListHeaderComponent={
                    <>
                      <Header blockPress={blockPress} />
                      <NextAppointments
                        nextAppointments={nextAppointments}
                        USER={USER}
                        navigation={navigation}
                        reloadAppointments={reloadAppointments}
                      />
                      {dates && !!findMaster.data && (
                        <FoundMasters
                          findMaster={findMaster}
                          dates={dates}
                          shortMonthName={shortMonthName}
                          plural={plural}
                          setDates={setDates}
                        />
                      )}
                    </>
                  }
                  renderItem={({item, index}) => (
                    <Block
                      navigation={navigation}
                      el={item}
                      dates={dates}
                      reload={reloadAppointments}
                      photoArr={item.user.master_appointments}
                      blockId={index}
                    />
                  )}
                  keyExtractor={item =>
                    dates ? item.user.id : item.id.toString()
                  }
                />
              )}
          {users && users.loading && (
            <View>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          )}
        </View>

        {!isCalendarVisible && (
          <TouchableOpacity
            style={[
              Platform.OS === 'ios' ? openCalendarIos : openCalendarAndroid,
              ,
              {top: screen.height - 80},
            ]}
            onPress={() => setIsCalendarVisible(true)}>
            <SvgUri svgXmlData={CalendarSvgIcon} />
            <Text style={{marginLeft: 5}}>Выбрать дату</Text>
          </TouchableOpacity>
        )}
        {/* КАЛЕНДАРЬ !*/}
        {isCalendarVisible && (
          <CalendarCustom
            onClose={setIsCalendarVisible}
            showMasters={showMasters}
          />
        )}
        {false && (
          <ModalWindow>
            <Text style={{fontSize: 13}}>Мы хотим показать вам</Text>
            <Text style={{fontSize: 13}}>Мастеров рядом с вами.</Text>
            <Image
              source={require('../img/girl5.png')}
              style={{marginVertical: 16}}
            />
            <Text style={{fontSize: 13}}>
              Для этого разрешите нам возпользоваться
            </Text>
            <Text style={{fontSize: 13}}> геолокацией на этом устройстве.</Text>
            <View style={{width: '100%', marginTop: 16}}>
              <ButtonDefault
                title="разрешить"
                active={true}
                style={{marginBottom: 8}}
              />
              <ButtonDefault title="В другой раз" />
            </View>
          </ModalWindow>
        )}
        {false && (
          <ModalWindow>
            <Text style={{fontSize: 13}}>Вы находитесь сейчас в..</Text>
            <Text
              style={{fontSize: 13, fontWeight: 'bold', marginVertical: 16}}>
              Москве
            </Text>
            <Text style={{fontSize: 13}}>Это так?🤔</Text>
            <View style={{width: '100%', marginTop: 16}}>
              <ButtonDefault
                title="да, всё верно"
                active={true}
                style={{marginBottom: 8}}
              />
              <ButtonDefault title="нет, выбрать другой город" />
            </View>
          </ModalWindow>
        )}
        {false && (
          <ModalWindow>
            <Text style={{fontSize: 13, textAlign: 'center'}}>
              Укажите город, в котором находитесь для персонализированного
              подбора мастеров
            </Text>
            <TextInput
              placeholder="Введите ваш город.."
              style={{textAlign: 'center'}}
            />
            <View style={{width: '100%', marginTop: 16}}>
              <ButtonDefault
                title={true ? 'Введите город' : '  выбрать этот город'}
                active={true}
                style={{marginBottom: 8}}
              />
              <ButtonDefault title="в другой раз" />
            </View>
          </ModalWindow>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 420,
    marginTop: -170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prifileBtn: {
    marginTop: 100,
    height: 33,
    width: 135,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 33,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  block: {
    height: 145,
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 8,
  },
  blockIos: {
    shadowColor: '#000',
    shadowOpacity: 0.01,
    shadowRadius: 0.1,
  },
  blockAndroid: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 0.4,
  },
  blockImg: {
    width: 130,
    height: 130,
    marginRight: 10,
    borderRadius: 3,
  },
  timeBlock: {
    width: '30%',
    borderColor: 'rgba(185, 134, 218, 0.15)',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    height: 33,
  },
  timeBlockWrapp: {
    height: 75,
    overflow: 'hidden',

    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  openCalendar: {
    width: 160,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.5,
  },
  openCalendarIos: {
    width: 160,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  openCalendarAndroid: {
    width: 160,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.5,
  },
  foundMasters: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  closeBtn: {
    borderColor: 'rgba(185, 134, 218, 0.3)',
    borderWidth: 1.5,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearestSeans: {
    flexDirection: 'row',
    marginBottom: 8,
    maxHeight: 95,
  },
  nearestSeansBlock: {
    overflow: 'hidden',
    padding: 8,
    marginRight: 8,
    marginVertical: 8,
    elevation: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 1,
    flexDirection: 'row',
    width: screen.width - 50,
    height: '80%',
    alignItems: 'center',
  },
  nearestSeansBlockIos: {
    overflow: 'hidden',
    padding: 8,
    marginRight: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: screen.width - 50,
    height: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  dateText: {
    fontSize: 13,
    color: '#B986DA',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Main;
