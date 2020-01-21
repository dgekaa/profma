import React, {useState, useEffect, useRef} from 'react';
import CalendarStrip from 'react-native-calendar-strip';

import moment from 'moment';
import 'moment/locale/fr';

import BackgroundHeader from '../../components/BackgroundHeader';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

const Block = ({el, navigation, key}) => {
  const {block, topBlock, img, textBold, dateText, bottomBlock} = styles;
  return (
    <TouchableOpacity
      style={block}
      key={key}
      onPress={() => {
        alert('Не настроен');
        // navigation.navigate('NoteInformationMaster', el);
      }}>
      <View style={topBlock}>
        <View style={{flexDirection: 'row', flex: 6}}>
          <Image
            style={{marginRight: 5}}
            source={require('../../img/CalendarColor.png')}
          />
          <Text style={[dateText]}>12.01 в 10:00</Text>
        </View>
        <View style={{flex: 4}}>
          <Text style={[textBold]}>1250р</Text>
        </View>
      </View>
      <View style={bottomBlock}>
        <Image
          style={img}
          source={{
            uri:
              'http://rs.img.com.ua/crop?v2=1&w=600&h=0&url=%2F%2Fv.img.com.ua%2Fb%2Forig%2Fa%2F46%2F9bb403323c7330b1431ff70432c5a46a.jpg',
          }}
        />
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10}}>Клиент</Text>
            <Text style={[textBold]}> Иванова </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[textBold]}>Какой-то адрес</Text>
            <Text style={{fontSize: 10}}>Садовая</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10}}>Услуга</Text>
            <Text style={[textBold]}> Маникюр </Text>
            {/* {el.services.map(el => (
              <Text style={[textBold]}>
                {el.name}
              </Text>
            ))} */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MasterCalendar = ({navigation}) => {
  const {calendarContainer, arrow, headerText, hederArrowContainer} = styles;

  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const monthsShort = {
    Jan: {name: 'Янв', number: 1},
    Feb: {name: 'Февр', number: 2},
    Mar: {name: 'Март', number: 3},
    Apr: {name: 'Апр', number: 4},
    May: {name: 'Май', number: 5},
    Jun: {name: 'Июнь', number: 6},
    Jul: {name: 'Июль', number: 7},
    Aug: {name: 'Авг', number: 8},
    Sep: {name: 'Сент', number: 9},
    Oct: {name: 'Окт', number: 10},
    Nov: {name: 'Нояб', number: 11},
    Dec: {name: 'Дек', number: 12},
  };

  moment.locale('ru', {
    config: {
      weekdaysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    },
  });

  const locale = {
    name: 'ru',
    config: {
      weekdaysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    },
  };

  // moment.updateLocale('ru', {
  //   weekdaysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
  // });

  const [weekFirst, setWeekFirst] = useState();
  const [weekLast, setWeekLast] = useState();
  const [month, setMonth] = useState();

  useEffect(() => {
    if (!weekLast) {
      calendarRef.current.getPreviousWeek();
      setTimeout(() => {
        calendarRef.current.getNextWeek();
      }, 0);
    }
  }, []);

  const calendarRef = useRef(null);

  const onWeekChanged = date => {
    const dateArr = date._d.toString().split(' ');

    setMonth(monthsShort[dateArr[1]].name);

    const date1 = new Date(dateArr[3], monthsShort[dateArr[1]].number - 1, 1);
    const date2 = new Date(dateArr[3], monthsShort[dateArr[1]].number, 1);
    const maxDayInMonth = Math.round((date2 - date1) / 1000 / 3600 / 24);

    setWeekFirst(dateArr[2]);
    if (+dateArr[2] + 6 > maxDayInMonth) {
      const last = 7 - (maxDayInMonth - dateArr[2] + 1);
      last < 10 ? setWeekLast('0' + last) : setWeekLast(last);
    } else {
      const last = +dateArr[2] + 6;
      const lastNumber = +dateArr[2] + 6;
      last < 10 ? setWeekLast('0' + lastNumber) : setWeekLast(+dateArr[2] + 6);
    }
  };

  const monthNumber = new Date().getMonth();
  const stringMonth = monthNames[monthNumber];
  const dayNumber = new Date().getDate();

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title={`Сегодня ${dayNumber} ${stringMonth}`}
        settings={true}
        onSettingsPress={() => {
          alert('Что здесь?');
        }}>
        <View style={hederArrowContainer}>
          <TouchableOpacity
            onPress={() => {
              calendarRef.current.getPreviousWeek();
            }}
            style={arrow}>
            <Image source={require('../../img/arrowL.png')} />
          </TouchableOpacity>
          <Text style={headerText}>
            {month} {weekFirst}-{weekLast}
          </Text>
          <TouchableOpacity
            onPress={() => {
              calendarRef.current.getNextWeek();
            }}
            style={arrow}>
            <Image source={require('../../img/ArrowR.png')} />
          </TouchableOpacity>
        </View>
      </BackgroundHeader>
      <View style={calendarContainer}>
        <CalendarStrip
          locale={locale}
          //   onDateSelected={onDateSelected}
          onWeekChanged={onWeekChanged}
          ref={calendarRef}
          style={{height: 60}}
          calendarHeaderStyle={{color: '#fff', height: 0}}
          iconStyle={{height: 15, width: 5}}
          calendarColor={'#fff'}
          dateNumberStyle={{color: '#A6ADB3'}}
          dateNameStyle={{color: '#A6ADB3'}}
          // iconContainer={{flex: 0.07}}
          iconStyle={{height: 0, width: 0}}
        />
      </View>
      <ScrollView style={{flex: 1, paddingHorizontal: 8, marginTop: 10}}>
        <Block navigation={navigation} />
        <Block navigation={navigation} />
        <Block navigation={navigation} />
        <Block navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
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
  calendarContainer: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowOpacity: 0.3,
    shadowColor: '#000',
    marginBottom: 8,
  },
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 13,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  hederArrowContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
});

export default MasterCalendar;
