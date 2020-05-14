import React, {useState} from 'react';
import SvgUri from 'react-native-svg-uri';
import CalendarColorIcon from '../img/CalendarColor.svg';
import UserWhiteIcon from '../img/UserWhite.svg';
import CrossIcon from '../img/cross.svg';
import CalendarSvgIcon from '../img/CalendarSVG.svg';

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

const screen = Dimensions.get('window');

const Block = ({navigation, el}) => {
  const {block, blockImg, timeBlock, timeBlockWrapp} = styles;
  return (
    <TouchableOpacity
      style={block}
      onPress={() => {
        navigation.navigate('PublickMasterProfile', el);
      }}>
      <View style={{width: 140}}>
        <Image style={blockImg} source={{uri: el.img}} />
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 13}}>
            {el.master_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10}}>Стоимость сеанса</Text>
            <Text style={{fontWeight: 'bold', fontSize: 10}}>1250 руб</Text>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1.2}}>
            <Text style={{fontSize: 10}} numberOfLines={1}>
              {el.address}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              <Text style={{fontSize: 10}}>{el.metro}</Text>
            </View>
          </View>
        </View>
        <View style={timeBlockWrapp}>
          {el.work_time.map((item, index) => {
            // console.log(item, 'item', index, el.master_name);
            if (new Date().getDay() <= index + 1) {
              if (!item.is_holiday) {
                return item.all_time.map((time, ind) => {
                  console.log(item, 'TIME');
                  return (
                    <View key={ind} style={timeBlock}>
                      <Text
                        style={{
                          color: '#B986DA',
                          fontSize: 10,
                          fontWeight: 'bold',
                        }}>
                        {/* {item.name} */}5 дек.
                      </Text>
                      <Text style={{color: '#B986DA', fontSize: 10}}>
                        {time}
                      </Text>
                    </View>
                  );
                });
              }
            }
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NearestSeansBlock = ({el, index, masters, clients, navigation}) => {
  const {nearestSeansBlock} = styles;

  return (
    <TouchableOpacity
      style={[nearestSeansBlock]}
      onPress={() => {
        navigation.state.params.person[0].is_client
          ? navigation.navigate('NoteInformation', {
              person: el,
              people: masters,
            })
          : navigation.navigate('NoteInformationMaster', el);
      }}>
      <View>
        {masters
          .filter(index => index.id == el.master_id)
          .map(index => {
            return (
              <Image
                source={{uri: index.img}}
                style={{width: 47, height: 47, marginRight: 8}}
              />
            );
          })}
        {!masters.filter(index => index.id == el.master_id).length && (
          <Image
            source={{uri: 'https://hornews.com/upload/images/blank-avatar.jpg'}}
            style={{width: 47, height: 47, marginRight: 8}}
          />
        )}
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
                {el.day} {shortMonthName[+el.month - 1].toLowerCase()} в{' '}
                {el.time}
              </Text>
            </View>
            <Text style={{fontSize: 10}}>
              {clients
                .filter(index => index.id == el.client_id)
                .map(index => {
                  return <Text>{index.client_name}</Text>;
                })}

              {masters
                .filter(index => index.id == el.master_id)
                .map(index => {
                  return <Text>{index.master_name}</Text>;
                })}
            </Text>
          </View>
          <View tyle={{flex: 1}}>
            <Text style={{fontSize: 10}}>Услуга</Text>
            {el.services.map((item, i) => {
              return (
                <Text key={i} style={{fontSize: 10, fontWeight: 'bold'}}>
                  {item.name}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Main = ({navigation}) => {
  const person = navigation.state.params.person[0];
  const masters = navigation.state.params.masters;
  const clients = navigation.state.params.clients;

  const {
    prifileBtn,
    openCalendar,
    header,
    foundMasters,
    closeBtn,
    nearestSeans,
  } = styles;

  const [markedDates, setMarkedDates] = useState({});
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const onDayPress = day => {
    console.log(day, 'DAY');

    if (markedDates[day.dateString]) {
      delete markedDates[day.dateString];
      setMarkedDates({
        ...markedDates,
      });
    } else {
      setMarkedDates({
        ...markedDates,
        [day.dateString]: {selected: true, selectedColor: '#B986DA'},
      });
    }
  };

  function plural(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <ScrollView>
        <ImageBackground
          style={header}
          source={require('../img/headerBGBig.png')}>
          <TouchableOpacity
            style={prifileBtn}
            onPress={() => {
              {
                person.is_client
                  ? navigation.navigate('ClientProfile', person)
                  : navigation.navigate('MasterProfile', person);
              }
            }}>
            <SvgUri svgXmlData={UserWhiteIcon} />
            <Text style={{color: '#fff', marginLeft: 5}}>Мой профиль</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={{paddingHorizontal: 8}}>
          {!!person.my_notes.length && (
            <ScrollView
              style={nearestSeans}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {person.my_notes.map((el, i) => (
                // НУЖНО ОПРЕДЕЛИТЬ ИЗ НИХ БЛИЖАЙШИЕ
                <View key={i}>
                  <NearestSeansBlock
                    el={el}
                    index={i}
                    masters={masters}
                    navigation={navigation}
                    clients={clients}
                  />
                </View>
              ))}
            </ScrollView>
          )}
          {!!Object.keys(markedDates).length && (
            <View style={foundMasters}>
              <View style={{flex: 1}}>
                <Text>{`Найдено ${1} !!! ${plural(1, [
                  'мастер',
                  'мастера',
                  'мастеров',
                ])} на указанные даты:`}</Text>
                <Text
                  style={{color: '#B986DA', fontSize: 13, fontWeight: 'bold'}}>
                  {Object.keys(markedDates).map(el => (
                    <Text>
                      {el.split('-')[2]}{' '}
                      {shortMonthName[+el.split('-')[1] - 1].toLowerCase()},{' '}
                    </Text>
                  ))}
                </Text>
              </View>
              <TouchableOpacity
                style={closeBtn}
                onPress={() => {
                  setMarkedDates({});
                }}>
                <SvgUri svgXmlData={CrossIcon} />
              </TouchableOpacity>
            </View>
          )}
          <View style={{paddingBottom: 80}}>
            <FlatList
              data={masters}
              renderItem={({item}) => {
                return <Block navigation={navigation} el={item} />;
              }}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          {!person.my_notes.length && (
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
          )}
        </View>
      </ScrollView>
      {!person.my_notes.length && (
        <ButtonDefault
          title="заполнить профиль мастера"
          active={true}
          style={{margin: 8}}
        />
      )}
      {!isCalendarVisible && (
        <TouchableOpacity
          style={[openCalendar, {top: screen.height - 80}]}
          onPress={() => {
            setIsCalendarVisible(true);
          }}>
          <SvgUri svgXmlData={CalendarSvgIcon} />
          <Text style={{marginLeft: 5}}>Выбрать дату</Text>
        </TouchableOpacity>
      )}
      {/* КАЛЕНДАРЬ */}
      {isCalendarVisible && (
        <CalendarCustom
          markedDates={markedDates}
          onDayPress={onDayPress}
          onClose={setIsCalendarVisible}
          clearCalendar={setMarkedDates}
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
          <Text style={{fontSize: 13, fontWeight: 'bold', marginVertical: 16}}>
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
            Укажите город, в котором находитесь для персонализированного подбора
            мастеров
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
    justifyContent: 'space-between',
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
    height: '85%',
    alignItems: 'center',
  },
});

export default Main;
