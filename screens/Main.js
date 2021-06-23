import React, {useState, useEffect, useRef} from 'react';
import SvgUri from 'react-native-svg-uri';
import CalendarColorIcon from '../img/CalendarColor.svg';
import UserWhiteIcon from '../img/UserWhite.svg';
import CrossIcon from '../img/cross.svg';
import CalendarSvgIcon from '../img/CalendarSVG.svg';
import ErrorInternetProblems from './ErrorInternetProblems';
import CalendarCustom from '../components/Calendar';
import ModalWindow from '../components/ModalWindow';
import {ButtonDefault} from '../components/Button';
import {shortMonthName, shortMonthName12Changed} from '../constants';
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
  PermissionsAndroid,
  TextInput,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import {useQuery} from 'react-apollo';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import {GET_USERS, ME, FIND_MASTER, NEXT_APPOINTMENTS} from '../QUERYES';

const screen = Dimensions.get('window');

const requestLocationPermission = async () => {
  const chckLocationPermission = PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
    console.log(chckLocationPermission, '___chckLocationPermission');
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Location App required Location permission',
          message:
            'We required Location permission in order to get device location ' +
            'Please grant us.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          info => {
            console.log(info, '___INFO___');

            const {longitude, latitude} = info.coords;

            fetch(
              'https://geocode-maps.yandex.ru/1.x/?geocode={53.9094331718573,27.497328563590926}&kind=metro&format=json&results=1',
            )
              .then(res => res.json())
              .then(data => {
                console.log(data, '_DATA.yandex');
              })
              .catch(err => console.log(err, '__err.yandex'));
            // Geocoder.from(latitude, longitude)
            //   .then(json => {
            //     console.log(json, '___JSON____');
            //   })
            //   .catch(error => console.log(error, 'GEO'));
          },
          error => {
            console.log(error, '__ERR GEOLOCATION');
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
        console.log(granted, '___granted 1');
      } else {
        console.log(granted, '___granted 2');
      }
    } catch (err) {
      console.log(err, '___err');
    }
  }
};

const Block = ({el, navigation, dates, reload, photoArr, nextFreeTime}) => {
    const {
      block,
      blockImg,
      timeBlock,
      timeBlockWrapp,
      blockIos,
      blockAndroid,
      priceWrap,
      nameWrap,
      nameText,
      dateNextFreeTimeText,
    } = styles;

    const width = Dimensions.get('window').width;

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
          <View style={nameWrap}>
            <Text style={nameText}>
              {dates
                ? el.user.profile && el.user.profile.name
                : (el.profile && el.profile.name) || 'Имя не задано'}
            </Text>
          </View>
          <View style={priceWrap}>
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
            </View>
          </View>
          <View style={timeBlockWrapp}>
            {nextFreeTime.map(item =>
              item.times.map((time, i) => (
                <View key={i} style={timeBlock}>
                  <Text style={dateNextFreeTimeText}>
                    {item.date.split('-')[2]}{' '}
                    {shortMonthName[+item.date.split('-')[1]].toLowerCase()}
                  </Text>
                  <Text style={{color: '#B986DA', fontSize: 10}}>
                    {time.slice(0, 5)}
                  </Text>
                </View>
              )),
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  NearestSeansBlock = ({el, navigation, type, reload, photoArr}) => {
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
        style={[
          Platform.OS === 'ios' ? nearestSeansBlockIos : nearestSeansBlock,
        ]}
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
                  {el.date.split('-')[2]}{' '}
                  {shortMonthName[+el.date.split('-')[1]]} в{' '}
                  {el.time.slice(0, 5)}
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
  },
  Header = ({blockPress}) => (
    <View style={{overflow: 'hidden'}}>
      <ImageBackground
        style={styles.header}
        source={require('../img/headerBGBig.png')}>
        <TouchableOpacity
          style={styles.prifileBtn}
          onPress={() => blockPress()}>
          <SvgUri svgXmlData={UserWhiteIcon} />
          <Text style={{color: '#fff', marginLeft: 5}}>Мой профиль</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  ),
  FoundMasters = ({findMaster, plural, dates, setDates}) => (
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
              {shortMonthName12Changed[+el.split('-')[1] - 1].toLowerCase()},{' '}
            </Text>
          ))}
        </Text>
      </View>
      <TouchableOpacity style={styles.closeBtn} onPress={() => setDates()}>
        <SvgUri svgXmlData={CrossIcon} />
      </TouchableOpacity>
    </View>
  ),
  NextAppointments = ({
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
  },
  Main = ({navigation}) => {
    const {
      openCalendarIos,
      openCalendarAndroid,
      allMasters,
      allMastersText,
      metroWrap,
    } = styles;

    const [dates, setDates] = useState(),
      [refreshing, setRefreshing] = useState(false),
      [first, setFirst] = useState(6),
      [isCalendarVisible, setIsCalendarVisible] = useState(false),
      [hasMorePages, setHasMorePages] = useState(true),
      [isClickedAllMasters, setIsClickedAllMasters] = useState(false);

    const USER = useQuery(ME),
      users = useQuery(GET_USERS, {
        variables: {first: first, type: 'Master'},
      }),
      findMaster = useQuery(FIND_MASTER, {
        variables: {
          dates: dates || null,
        },
      }),
      nextAppointments = useQuery(NEXT_APPOINTMENTS, {
        variables: {
          count: 5,
        },
      });

    useEffect(() => {
      users.data &&
        setHasMorePages(users.data.users.paginatorInfo.hasMorePages);
    }, [USER, users]);

    const showMasters = masters => {
        const arr = [];
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
        users.client.resetStore();
        users
          .refetch()
          .then(res => {
            console.log(res, '___REFRESH');
            nextAppointments
              .refetch()
              .then(res => {
                !res.loading && res.data && setRefreshing(false);
              })
              .catch(err => setRefreshing(false));
          })
          .catch(err => setRefreshing(false));
      },
      blockPress = () => {
        if (USER.data) {
          const ME = USER.data.me;
          ME.type === 'Client'
            ? navigation.navigate('ClientProfile', {
                ID: ME.id,
                reloadNearest: reloadAppointments,
              })
            : navigation.navigate('MasterProfile', {
                ID: ME.id,
                refetchMasters: users.refetch,
              });
        }
      },
      refetchUsers = () => {
        if (hasMorePages) {
          setFirst(prev => prev + 6);
          users.refetch();
        }
      };

    useEffect(() => {
      Geocoder.init('AIzaSyAAcvrFmEi8o7u-zXHe6geXvjRey4Qj6tg', {
        language: 'ru',
      });
      requestLocationPermission();
    }, []);

    if (USER.error) {
      return <ErrorInternetProblems reload={() => reload()} />;
    } else {
      return (
        <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
          {users && users.loading && (
            <View style={styles.actIndicator}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          )}
          <View>
            {!dates ? (
              !!users &&
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
                      <TouchableOpacity
                        onPress={() => setIsClickedAllMasters(prev => !prev)}
                        style={allMasters}>
                        <Text style={allMastersText}>Все мастера</Text>
                        {isClickedAllMasters && (
                          <View style={metroWrap}>
                            {/* <ScrollView> */}
                            <TouchableOpacity>
                              <Text>Метро1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Text>Метро2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Text>Метро3</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Text>Метро4</Text>
                            </TouchableOpacity>
                            {/* </ScrollView> */}
                          </View>
                        )}
                      </TouchableOpacity>
                    </>
                  }
                  renderItem={({item, index}) => (
                    <>
                      <Block
                        navigation={navigation}
                        el={item}
                        reload={reloadAppointments}
                        photoArr={item.master_appointments}
                        blockId={index}
                        nextFreeTime={item.nextFreeTime}
                      />
                      {users.data.users.data.length - 1 === index && (
                        <View style={{height: 80}} />
                      )}
                    </>
                  )}
                  keyExtractor={item =>
                    dates ? item.user.id : item.id.toString()
                  }
                />
              )
            ) : !!findMaster.data && !!findMaster.data.findMaster ? (
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
                        plural={plural}
                        setDates={setDates}
                      />
                    )}
                  </>
                }
                renderItem={({item, index}) => (
                  <>
                    <Block
                      navigation={navigation}
                      el={item}
                      dates={dates}
                      reload={reloadAppointments}
                      photoArr={item.user.master_appointments}
                      blockId={index}
                      nextFreeTime={item.user.nextFreeTime}
                    />
                    {users.data.users.data.length - 1 === index && (
                      <View style={{height: 80}} />
                    )}
                  </>
                )}
                keyExtractor={item =>
                  dates ? item.user.id : item.id.toString()
                }
              />
            ) : findMaster.loading ? (
              <>
                <Header blockPress={blockPress} />
                <View style={styles.actIndicator}>
                  <ActivityIndicator size="large" color="#00ff00" />
                </View>
              </>
            ) : (
              <>
                <Header blockPress={blockPress} />
                <Text style={{padding: 10}}>{findMaster.error.message}</Text>
              </>
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
              <Text style={{fontSize: 13}}>
                {' '}
                геолокацией на этом устройстве.
              </Text>
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
  actIndicator: {
    position: 'absolute',
    width: '100%',
    height: screen.height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  priceWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  nameWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  dateNextFreeTimeText: {
    color: '#B986DA',
    fontSize: 10,
    fontWeight: 'bold',
  },
  allMasters: {},
  allMastersText: {
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  metroWrap: {
    flex: 1,
    position: 'absolute',
    zIndex: 4,
    backgroundColor: 'red',
    top: 20,
    width: 200,
    left: 10,
    elevation: 5,
  },
});

export default Main;
