import React, {useState, useEffect, useRef} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import SvgUri from 'react-native-svg-uri';

import ArrowLIcon from '../../img/ArrowL.svg';
import ArrowRIcon from '../../img/ArrowR.svg';
import CalendarColorIcon from '../../img/CalendarColor.svg';
import {shortMonthName} from '../../constants';

import moment from 'moment';
import 'moment/locale/fr';

import {useQuery} from 'react-apollo';
import {ME} from '../../QUERYES';

import BackgroundHeader from '../../components/BackgroundHeader';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

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
const monthsNamesHeader = {
  Jan: {name: 'Январь', number: 1},
  Feb: {name: 'Февраль', number: 2},
  Mar: {name: 'Март', number: 3},
  Apr: {name: 'Апрель', number: 4},
  May: {name: 'Май', number: 5},
  Jun: {name: 'Июнь', number: 6},
  Jul: {name: 'Июль', number: 7},
  Aug: {name: 'Август', number: 8},
  Sep: {name: 'Сентябрь', number: 9},
  Oct: {name: 'Октябрь', number: 10},
  Nov: {name: 'Ноябрь', number: 11},
  Dec: {name: 'Декабрь', number: 12},
};

const Block = ({el, navigation}) => {
  const {block, topBlock, img, textBold, dateText, bottomBlock} = styles;

  // useEffect(() => {
  //   el.services.length > 1
  //     ? el.services.reduce((el, i) =>
  //         setPrice(Number(el.how_mach) + Number(i.how_mach)),
  //       )
  //     : el.services.length && setPrice(el.services[0].how_mach);
  // }, []);

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

  return (
    <TouchableOpacity
      style={block}
      onPress={() => navigation.navigate('NoteInformationMaster', el)}>
      <View style={topBlock}>
        <View style={{flexDirection: 'row', flex: 6}}>
          <SvgUri svgXmlData={CalendarColorIcon} style={{marginRight: 5}} />
          <Text style={[dateText]}>
            {el.date.split('-')[2]} {shortMonthName[+el.date.split('-')[1]]} в{' '}
            {el.time.slice(0, 5)}
          </Text>
        </View>
        <View style={{flex: 4}}>
          <Text style={[textBold]}>{price} руб</Text>
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
            <Text style={{fontSize: 10}}>Клиент</Text>
            <Text style={[textBold]}> {el.client.profile.name} </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[textBold]}>{el.client.profile.home_address} </Text>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: '#9155FF',
                }}
              />
              <Text style={{fontSize: 10}}> метро </Text>
            </View> */}
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10}}>Услуга</Text>
            {!!offersAll.length &&
              offersAll.map((el, i) => (
                <Text key={i} style={[textBold]}>
                  {el}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MasterCalendar = ({navigation}) => {
  const {calendarContainer, arrow, headerText, hederArrowContainer} = styles;

  const date = new Date().toLocaleDateString().split('/'),
    refreshDate = date => {
      if (+date > 9) {
        return date;
      } else {
        return '0' + date;
      }
    },
    dateNew = date[2] + '-' + refreshDate(date[0]) + '-' + refreshDate(date[1]);

  const [currentDate, setCurrentDate] = useState(dateNew),
    [filteredData, setFilteredData] = useState([]);

  const USER = useQuery(ME);

  useEffect(() => {
    if (USER.data && USER.data.me.master_appointments.length) {
      const filtered = USER.data.me.master_appointments.filter(
        el => el.date === currentDate,
      );
      setFilteredData(filtered);
    }
  }, [USER.data, currentDate]);

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

  const [weekFirst, setWeekFirst] = useState(),
    [weekLast, setWeekLast] = useState(),
    [month, setMonth] = useState();

  const calendarRef = useRef(null);

  useEffect(() => {
    if (!weekLast) {
      calendarRef.current.getPreviousWeek();
      setTimeout(() => {
        calendarRef.current.getNextWeek();
      }, 0);
    }
  }, []);

  const onWeekChanged = date => {
    const dateArr = date._d.toString().split(' ');

    setMonth(monthsNamesHeader[dateArr[1]].name);

    const date1 = new Date(
        dateArr[3],
        monthsNamesHeader[dateArr[1]].number - 1,
        1,
      ),
      date2 = new Date(dateArr[3], monthsNamesHeader[dateArr[1]].number, 1),
      maxDayInMonth = Math.round((date2 - date1) / 1000 / 3600 / 24);

    setWeekFirst(dateArr[2]);
    if (+dateArr[2] + 6 > maxDayInMonth) {
      const last = 7 - (maxDayInMonth - dateArr[2] + 1);
      last < 10 ? setWeekLast('0' + last) : setWeekLast(last);
    } else {
      const last = +dateArr[2] + 6,
        lastNumber = +dateArr[2] + 6;
      last < 10 ? setWeekLast('0' + lastNumber) : setWeekLast(+dateArr[2] + 6);
    }
  };

  const monthNumber = new Date().getMonth(),
    stringMonth = monthNames[monthNumber],
    dayNumber = new Date().getDate();

  const [sortNotes, setSortNotes] = useState([]);

  const onDateSelected = date => {
    const dateSelected = date._d.toLocaleDateString().split('/'),
      dateNewSelected =
        dateSelected[2] +
        '-' +
        refreshDate(dateSelected[0]) +
        '-' +
        refreshDate(dateSelected[1]);

    setCurrentDate(dateNewSelected);
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title={`Сегодня ${dayNumber} ${stringMonth}`}
        settings={true}
        onSettingsPress={() => alert('Что здесь?')}>
        <View style={hederArrowContainer}>
          <TouchableOpacity
            onPress={() => calendarRef.current.getPreviousWeek()}
            style={arrow}>
            <SvgUri svgXmlData={ArrowLIcon} />
          </TouchableOpacity>
          <Text style={headerText}>
            {month} {weekFirst}-{weekLast}
          </Text>
          <TouchableOpacity
            onPress={() => calendarRef.current.getNextWeek()}
            style={arrow}>
            <SvgUri svgXmlData={ArrowRIcon} />
          </TouchableOpacity>
        </View>
      </BackgroundHeader>
      <View style={calendarContainer}>
        <CalendarStrip
          locale={locale}
          onDateSelected={onDateSelected}
          onWeekChanged={onWeekChanged}
          ref={calendarRef}
          style={{height: 60}}
          calendarHeaderStyle={{color: '#fff', height: 0}}
          iconStyle={{height: 15, width: 5}}
          calendarColor={'#fff'}
          dateNumberStyle={{color: '#A6ADB3'}}
          dateNameStyle={{color: '#A6ADB3'}}
          iconStyle={{height: 0, width: 0}}
          highlightDateNameStyle={{color: 'black'}}
          highlightDateNumberStyle={{color: 'black'}}
        />
      </View>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 8,
          marginTop: 10,
        }}>
        {USER.loading && (
          <View
            style={{
              top: 0,
              width: '100%',
              height: Dimensions.get('window').height - 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
        {USER.data &&
          (filteredData.length
            ? filteredData.map((el, i) => (
                <View key={i}>
                  <Block navigation={navigation} el={el} />
                </View>
              ))
            : filteredData.map((el, i) => (
                <View key={i}>
                  <Block navigation={navigation} el={el} />
                </View>
              )))}
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
