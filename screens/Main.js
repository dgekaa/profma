import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../components/BackgroundHeader';
import {InputWithText} from '../components/Input';
import CalendarCustom from '../components/Calendar';

import DATA from '../data';
import {
  Text,
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';

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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{marginRight: 3}}
              source={require('../img/Star.png')}
            />
            <Text style={{fontWeight: 'bold', fontSize: 13}}>5.0</Text>
          </View>
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
    photosWrap,
    openCalendar,
    header,
    foundMasters,
    closeBtn,
    nearestSeans,
    nearestSeansBlock,
  } = styles;
  const [isShowPicker, setIsShowPicker] = useState(false);

  const [selectedPicker, setSelectedPicker] = useState(1);
  const [pickerData, setPickerData] = useState([
    {label: 'Все мастера', value: 0},
    {label: 'Аппаратный маникюр', value: 1},
    {label: 'SPA-маникюр', value: 2},
    {label: 'Горячий маникюр', value: 3},
    {label: 'Классический маникюр', value: 4},
    {label: 'Классический педикюр', value: 5},
    {label: 'Комбинированный маникюр', value: 6},
    {label: 'Комбинированный педикюр', value: 7},
    {label: 'Коррекция ногтей', value: 8},
  ]);

  const [markedDates, setMarkedDates] = useState({});
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const onDayPress = day => {
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
  const [pickerY, setPickerY] = useState();
  const onLayout = event => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setPickerY(y);
    console.log(event.nativeEvent.layout, 'event.nativeEvent.layout');
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{}}>
        <ImageBackground
          style={header}
          source={require('../img/headerBGBig.png')}>
          <TouchableOpacity
            style={prifileBtn}
            onPress={() => {
              navigation.navigate('ClientProfile', DATA);
            }}>
            <Image source={require('../img/UserWhite.png')} />
            <Text style={{color: '#fff', marginLeft: 5}}>Мой профиль</Text>
          </TouchableOpacity>
          <View style={photosWrap}>
            <BorderImage
              width={90}
              height={120}
              number={2}
              photoSize={45}
              top={5}
              master={'Виктория Стец'}
            />
            <BorderImage
              width={110}
              height={150}
              number={1}
              photoSize={60}
              top={12}
              master={'Виктория Стец'}
            />
            <BorderImage
              width={90}
              height={120}
              number={3}
              photoSize={45}
              top={5}
              master={'Виктория Стец'}
            />
          </View>
        </ImageBackground>
        <View style={{paddingHorizontal: 8}}>
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
          <ScrollView
            style={nearestSeans}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <NearestSeansBlock img="https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg" />
            <NearestSeansBlock img="https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg" />
            <NearestSeansBlock img="https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg" />
          </ScrollView>
          <View onLayout={onLayout} style={{height: 100, marginTop: 22}}>
            <TouchableOpacity
              onPress={() => {
                isShowPicker ? setIsShowPicker(false) : setIsShowPicker(true);
              }}
              style={{
                backgroundColor: 'pink',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  padding: 8,
                }}>
                {pickerData[selectedPicker].label}
              </Text>
              <Image
                source={require('../img/Arrow.png')}
                style={{width: 8, height: 8}}
              />
            </TouchableOpacity>
          </View>
          <Block navigation={navigation} />
          <Block navigation={navigation} />
          <Block navigation={navigation} />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[openCalendar, {top: screen.height - 80}]}
        onPress={() => {
          setIsCalendarVisible(true);
        }}>
        <Image source={require('../img/calendar.png')} />
        <Text style={{marginLeft: 5}}>Выбрать дату</Text>
      </TouchableOpacity>
      {isCalendarVisible && (
        <CalendarCustom
          markedDates={markedDates}
          onDayPress={onDayPress}
          onClose={setIsCalendarVisible}
          clearCalendar={setMarkedDates}
        />
      )}
      {isShowPicker && (
        <ScrollView
          nestedScrollEnabled={true}
          style={{
            position: 'absolute',
            top: pickerY + 250,
            maxHeight: 290,
            width: '70%',
            elevation: 1.5,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOpacity: 0.5,
          }}>
          <View>
            {pickerData.map(el => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedPicker(el.value);
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    padding: 8,
                    color: el.value == selectedPicker ? '#B986DA' : 'black',
                  }}>
                  {el.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 500,
  },
  prifileBtn: {
    height: 33,
    width: 135,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 33,
    alignSelf: 'center',
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  photosWrap: {
    width: '80%',
    height: 200,
    marginTop: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  block: {
    flex: 1,
    height: 145,
    elevation: 2,
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
    height: 63,
    flexDirection: 'row',
    marginTop: 8,
  },
  nearestSeansBlock: {
    padding: 8,
    marginRight: 8,
    elevation: 3,
    height: 63,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 1,
    flexDirection: 'row',
    width: screen.width - 50,
    alignItems: 'center',
  },
});

export default Main;
