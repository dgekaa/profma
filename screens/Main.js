import React, {useState} from 'react';

import CalendarCustom from '../components/Calendar';
import ModalWindow from '../components/ModalWindow';
import {ButtonDefault} from '../components/Button';
import {TextInput} from 'react-native-gesture-handler';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';

import DATA from '../data';

const screen = Dimensions.get('window');

const BorderImage = ({width, height, number, photoSize, top, master}) => {
  return (
    <View>
      <ImageBackground
        style={{
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={
          number === 1
            ? require(`../img/Component1.png`)
            : number === 2
            ? require(`../img/Component2.png`)
            : require(`../img/Component3.png`)
        }>
        <Image
          style={{
            width: photoSize,
            height: photoSize,
            borderRadius: photoSize,
            marginTop: top,
          }}
          source={{
            uri:
              'https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg',
          }}
        />
      </ImageBackground>
      <View style={{alignItems: 'center', marginTop: -10}}>
        <Text style={{fontSize: 13, color: '#fff'}}>{master}</Text>
        <TouchableOpacity>
          <Text style={{color: '#fff', fontSize: 13}}>К профилю</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Block = ({navigation}) => {
  const {block, blockImg, timeBlock} = styles;
  return (
    <TouchableOpacity
      style={block}
      onPress={() => {
        navigation.navigate('PublickMasterProfile');
      }}>
      <View style={{width: 140}}>
        <Image
          style={blockImg}
          source={{
            uri:
              'https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg',
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 13}}>
            Людмила Заглубоцкая
          </Text>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{marginRight: 3}}
              source={require('../img/Star.png')}
            />
            <Text style={{fontWeight: 'bold', fontSize: 13}}>5.0</Text>
          </View> */}
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <View style={{}}>
            <Text style={{fontSize: 10}}>Стоимость сеанса</Text>
            <Text style={{fontWeight: 'bold', fontSize: 10}}>1250 руб.</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={{fontSize: 10}}>ул. Колонтай, 17к3</Text>
            <Text style={{fontSize: 10}}>Что-то еще</Text>
          </View>
        </View>
        <View style={{flex: 4}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={timeBlock}>
              <Text style={{color: '#B986DA', fontSize: 10}}>25 июн</Text>
              <Text style={{color: '#B986DA', fontSize: 10}}>12:00</Text>
            </View>
            <View style={timeBlock}>
              <Text style={{color: '#B986DA', fontSize: 10}}>25 июн</Text>
              <Text style={{color: '#B986DA', fontSize: 10}}>12:00</Text>
            </View>
            <View style={timeBlock}>
              <Text style={{color: '#B986DA', fontSize: 10}}>25 июн</Text>
              <Text style={{color: '#B986DA', fontSize: 10}}>12:00</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={timeBlock}>
              <Text style={{color: '#B986DA', fontSize: 10}}>25 июн</Text>
              <Text style={{color: '#B986DA', fontSize: 10}}>12:00</Text>
            </View>
            <View style={timeBlock}>
              <Text style={{color: '#B986DA', fontSize: 10}}>25 июн</Text>
              <Text style={{color: '#B986DA', fontSize: 10}}>12:00</Text>
            </View>
            <View style={timeBlock}>
              <Text style={{color: '#B986DA', fontSize: 10}}>25 июн</Text>
              <Text style={{color: '#B986DA', fontSize: 10}}>12:00</Text>
            </View>
          </View>
        </View>
      </View>
      {/* </View> */}
    </TouchableOpacity>
  );
};

const NearestSeansBlock = ({img}) => {
  const {nearestSeansBlock} = styles;
  return (
    <View style={nearestSeansBlock}>
      <View>
        <Image
          source={{uri: img}}
          style={{width: 47, height: 47, marginRight: 8}}
        />
      </View>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View>
          <Text style={{color: '#B986DA', fontSize: 10}}>
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
              <Image source={require('../img/CalendarColor.png')} />
              <Text
                style={{
                  fontSize: 13,
                  color: '#B986DA',
                  fontWeight: 'bold',
                  marginLeft: 5,
                }}>
                12 авг в 12:30
              </Text>
            </View>
            <Text style={{fontSize: 10}}>Людмила Заглубоцкая</Text>
          </View>
          <View tyle={{flex: 1}}>
            <Text style={{fontSize: 10}}>Услуга</Text>
            <Text style={{fontSize: 10, fontWeight: 'bold'}}>
              Аппаратный маникюр
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Main = ({navigation}) => {
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
    console.log(day, 'day');
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

  // Geolocation.getCurrentPosition(info => console.log(info));

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
                navigation.state.params.mail === 'c'
                  ? navigation.navigate('ClientProfile', DATA)
                  : navigation.navigate('MasterProfile', DATA);
              }
            }}>
            <Image source={require('../img/UserWhite.png')} />
            <Text style={{color: '#fff', marginLeft: 5}}>Мой профиль</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={{paddingHorizontal: 8}}>
          {true && (
            <ScrollView
              style={nearestSeans}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <NearestSeansBlock img="https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg" />
              <NearestSeansBlock img="https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg" />
              <NearestSeansBlock img="https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg" />
            </ScrollView>
          )}
          {true && (
            <View style={foundMasters}>
              <View>
                <Text>Найдено 243 мастера на указанные даты:</Text>
                <Text
                  style={{color: '#B986DA', fontSize: 13, fontWeight: 'bold'}}>
                  13 апр, 16 апр, 17 апр, 25 апр
                </Text>
              </View>
              <TouchableOpacity style={closeBtn}>
                <Image source={require('../img/cross.png')} />
              </TouchableOpacity>
            </View>
          )}
          {true && (
            <View>
              <Block navigation={navigation} />
              <Block navigation={navigation} />
              <Block navigation={navigation} />
            </View>
          )}
          {false && (
            <View style={{flex: 1}}>
              <View style={{marginTop: 20, flex: 1}}>
                <Text style={{fontSize: 13}}>
                  Пока на сервисе нет ни одного мастера.
                </Text>
                <Text style={{fontSize: 13}}>
                  таньте первым и попадите на пьедестал лучших.
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      {false && (
        <ButtonDefault
          title="заполнить профиль мастера"
          active={true}
          style={{margin: 8}}
        />
      )}
      {true && (
        <TouchableOpacity
          style={[openCalendar, {top: screen.height - 80}]}
          onPress={() => {
            setIsCalendarVisible(true);
          }}>
          <Image source={require('../img/calendar.png')} />
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
    flex: 1,
    height: 145,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 8,
  },
  blockImg: {
    width: 130,
    height: 130,
    marginRight: 10,
  },
  timeBlock: {
    width: '33%',
    borderColor: 'rgba(185, 134, 218, 0.15)',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
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
  },
  foundMasters: {
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
    alignItems: 'center',
  },
});

export default Main;
