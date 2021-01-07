import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';
import CalendarColorIcon from '../img/CalendarColor.svg';
import UserWhiteIcon from '../img/UserWhite.svg';
import CrossIcon from '../img/cross.svg';
import Girl from '../img/girl.png';
import CalendarSvgIcon from '../img/CalendarSVG.svg';
import ErrorInternetProblems from './ErrorInternetProblems';

import CalendarCustom from '../components/Calendar';
import ModalWindow from '../components/ModalWindow';
import {ButtonDefault} from '../components/Button';
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
  Platform
} from 'react-native';
import {useQuery} from 'react-apollo';

import {
  GET_USERS,
  ME,
  FIND_MASTER,
  NEXT_APPOINTMENTS,
  NEXT_FREE_TIME_BY_MASTER,
} from '../QUERYES';

const shortMonthName = [
  'дек',
  'янв',
  'фев',
  'март',
  'апр',
  'май',
  'июнь',
  'июль',
  'авг',
  'сент',
  'окт',
  'нояб',
];

const screen = Dimensions.get('window');

const Block = ({el, navigation, dates}) => {
  const {block, blockImg, timeBlock, timeBlockWrapp,blockIos} = styles;

  const width = Dimensions.get('window').width;

  const nextFreeTimeByMaster = useQuery(NEXT_FREE_TIME_BY_MASTER, {
    variables: {
      master_id: +el.id,
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

  return (
    <TouchableOpacity
      style={[block,  Platform.OS === 'ios' ? blockIos : blockAndroid]}
      onPress={() =>
        navigation.navigate(
          'PublickMasterProfile',
          dates ? el.user.profile : el.profile,
        )
      }>
      <View style={width < 340 ? {width: 100, marginRight: 10} : {width: 140}}>
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
              uri: 'https://hornews.com/upload/images/blank-avatar.jpg',
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* {el.metro && ( */}
              <View
                style={{
                  height: 4,
                  width: 4,
                  borderRadius: 4,
                  backgroundColor: '#9155FF',
                  marginRight: 5,
                }}
              />
              {/* )} */}
              <Text style={{fontSize: 10}}>{el.metro || '-'}</Text>
            </View>
          </View>
        </View>
        <View style={timeBlockWrapp}>
          {!!nextFreeTimeByMaster.data &&
            !!nextFreeTimeByMaster.data.nextFreeTimeByMaster.length &&
            nextFreeTimeByMaster.data.nextFreeTimeByMaster[0].times.map(
              (el, index) => {
                return (
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
                        )[1] - 1
                      ].toLowerCase()}{' '}
                    </Text>
                    <Text style={{color: '#B986DA', fontSize: 10}}>{el}</Text>
                  </View>
                );
              },
            )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NearestSeansBlock = ({el, navigation}) => {
  const {nearestSeansBlock} = styles;

  const [offersAll, setOffersAll] = useState([]);

  useEffect(() => {
    let offersAllLocal = [];
    el.offers.length &&
      el.offers.forEach((elem, i) => {
        offersAllLocal.push(elem.service.name);
      });
    setOffersAll(offersAllLocal);
  }, []);

  return (
    <TouchableOpacity
      key={el.id}
      style={[nearestSeansBlock]}
      onPress={() => {
        el.type === 'Client'
          ? navigation.navigate('NoteInformation', el)
          : navigation.navigate('NoteInformationMaster', {el: el});
      }}>
      <View>
        <Image
          source={{uri: ''}}
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
          <View style={{marginRight: 24}}>
            <View style={{flexDirection: 'row'}}>
              <SvgUri svgXmlData={CalendarColorIcon} />
              <Text
                style={{
                  fontSize: 13,
                  color: '#B986DA',
                  fontWeight: 'bold',
                  marginLeft: 5,
                }}>
                {el.date.split('-')[2]} {shortMonthName[+el.date.split('-')[1]]}{' '}
                в {el.time.slice(0, 5)}
              </Text>
            </View>
            <Text style={{fontSize: 10}}>
              <Text>{el.master && el.master.profile.name}</Text>
              <Text>{el.client && el.client.profile.name}</Text>
            </Text>
          </View>
          <View tyle={{flex: 1}}>
            <Text style={{fontSize: 10}}>Услуга</Text>
            {!!offersAll.length &&
              offersAll.map((el, i) => {
                if (i <= 2) {
                  return (
                    <Text key={i} style={{fontSize: 10, fontWeight: 'bold'}}>
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

const Main = ({navigation}) => {
  const {
    prifileBtn,
    openCalendarIos,openCalendarAndroid,
    header,
    foundMasters,
    closeBtn,
    nearestSeans,
  } = styles;

  const whoObj = {
    Master: 'Master',
    Client: 'Client',
  };

  const USER = useQuery(ME);
  const users = useQuery(GET_USERS, {
    variables: {first: 10, type: whoObj.Master},
  });

  const [dates, setDates] = useState();
  const [cityid, setCityid] = useState(null);

  const findMaster = useQuery(FIND_MASTER, {
    variables: {
      city_id: +cityid || null,
      dates: dates || null,
    },
  });

  const nextAppointments = useQuery(NEXT_APPOINTMENTS, {
    variables: {
      count: 2,
    },
  });

  useEffect(() => {
    setCityid(
      USER.data &&
        USER.data.me &&
        USER.data.me.profile &&
        USER.data.me.profile.city
        ? USER.data.me.profile.city.id
        : null,
    );
  }, [USER, users]);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const showMasters = masters => {
    let arr = [];
    for (let key in masters) arr.push(key);
    setDates(arr);
  };

  function plural(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  const reload = () => USER.refetch();

  if (USER.error) {
    return <ErrorInternetProblems reload={() => reload()} />;
  } else {
    return (
      <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <ScrollView>
          <ImageBackground
            style={header}
            source={require('../img/headerBGBig.png')}>
            <TouchableOpacity
              style={prifileBtn}
              onPress={() => {
                if (USER.data) {
                  const ME = USER.data.me;
                  ME.type === 'Client'
                    ? navigation.navigate('ClientProfile', {ID: ME.id})
                    : navigation.navigate('MasterProfile', {ID: ME.id});
                }
              }}>
              <SvgUri svgXmlData={UserWhiteIcon} />
              <Text style={{color: '#fff', marginLeft: 5}}>Мой профиль</Text>
            </TouchableOpacity>
          </ImageBackground>

          <View style={{paddingHorizontal: 8}}>
            {nextAppointments.data &&
              !!nextAppointments.data.nextAppointments.length && (
                <ScrollView
                  style={nearestSeans}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {nextAppointments.data.nextAppointments.map((el, i) => (
                    <View key={i}>
                      <NearestSeansBlock el={el} navigation={navigation} />
                    </View>
                  ))}
                </ScrollView>
              )}

            {dates && !!findMaster.data && (
              <View style={foundMasters}>
                <View style={{flex: 1}}>
                  <Text>{`Найдено ${
                    findMaster.data.findMaster.length
                  }  ${plural(findMaster.data.findMaster.length, [
                    'мастер',
                    'мастера',
                    'мастеров',
                  ])} на указанные даты:`}</Text>
                  <Text
                    style={{
                      color: '#B986DA',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>
                    {dates.map(el => (
                      <Text>
                        {el.split('-')[2]}{' '}
                        {shortMonthName[+el.split('-')[1] - 1].toLowerCase()},{' '}
                      </Text>
                    ))}
                  </Text>
                </View>
                <TouchableOpacity style={closeBtn} onPress={() => setDates()}>
                  <SvgUri svgXmlData={CrossIcon} />
                </TouchableOpacity>
              </View>
            )}
            <View style={{paddingBottom: 80}}>
              {!dates
                ? !!users &&
                  !!users.data && (
                    <FlatList
                      data={users.data.users.data}
                      renderItem={({item}) => (
                        <Block navigation={navigation} el={item} />
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
                      renderItem={({item}) => {
                        return (
                          <Block
                            navigation={navigation}
                            el={item}
                            dates={dates}
                          />
                        );
                      }}
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
            {/* {!person.my_notes.length && (
              <View style={{flex: 1}}>
                <View style={{marginTop: 20, flex: 1}}>
                  <Text style={{fontSize: 13}}>
                    Пока на сервисе нет ни одного мастера.
                  </Text>
                  <Text style={{fontSize: 13}}>
                    Станьте первым и попадите на пьедестал лучших.
                  </Text>
                </View>
              </View>
            )} */}
          </View>
        </ScrollView>
        {/* {!person.my_notes.length && (
          <ButtonDefault
            title="заполнить профиль мастера"
            active={true}
            style={{margin: 8}}
          />
        )} */}
        {!isCalendarVisible && (
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? openCalendarIos : openCalendarAndroid,, {top: screen.height - 80}]}
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
  blockIos:{
    shadowColor: '#000',
    shadowOpacity: 0.01,
    shadowRadius: 0.1,
},
blockAndroid:{
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
    padding: 8,
    marginRight: 8,
    marginVertical: 8,
    elevation: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 1,
    flexDirection: 'row',
    width: screen.width - 50,
    height: '100%',
    alignItems: 'center',
  },
});

export default Main;
