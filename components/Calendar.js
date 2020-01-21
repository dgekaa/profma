import React, {useState, useEffect} from 'react';
import moment from 'moment';

import BackgroundHeader from '../components/BackgroundHeader';
import {InputWithText} from '../components/Input';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {ButtonDefault, ButtonDisabled} from '../components/Button';

import DATA from '../data';
import {Text, Modal, View, StyleSheet, Image, ScrollView} from 'react-native';

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
const dayNames = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: shortMonthName,
  dayNames,
  dayNamesShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
};
LocaleConfig.defaultLocale = 'fr';

const CalendarCustom = ({
  markedDates,
  onDayPress,
  onClose,
  clearCalendar,
  singleDate,
  todayInfo,
  chooseThisDate,
}) => {
  const {
    monthText,
    dayText,
    yearText,
    middleBlock,
    topBlock,
    container,
    bg,
  } = styles;

  let date = new Date().getDate();
  date.toString().length == 1 ? (date = '0' + date) : null;
  let month = new Date().getMonth() + 1;
  month.toString().length == 1 ? (month = '0' + month) : null;
  const year = new Date().getFullYear();
  const now = `${date}/${month}/${year}`;

  useEffect(() => {
    {
      todayInfo &&
        todayInfo({
          dayOfWeek: dayNames[new Date().getDay()],
          monthName: shortMonthName[month - 1],
          date: date,
        });
    }
  }, [date]);

  return (
    <View style={bg}>
      <ScrollView>
        <View style={container}>
          <View style={topBlock}>
            <Text style={{color: '#FFF'}}>{dayNames[new Date().getDay()]}</Text>
          </View>
          <View style={middleBlock}>
            <Text style={monthText}>{shortMonthName[month - 1]}</Text>
            <Text style={dayText}>{date}</Text>
            <Text style={yearText}>{year}</Text>
          </View>
          <Calendar
            current={moment(now, 'DD/MM/YYYY', true).format()}
            minDate={moment(now, 'DD/MM/YYYY', true).format()}
            markedDates={markedDates}
            hideExtraDays={true}
            hideArrows={true}
            onDayPress={day => {
              onDayPress(day);
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              selectedDayBackgroundColor: 'green',
              selectedDayTextColor: '#fff',
              todayTextColor: '#B986DA',
              monthTextColor: 'black',
              'stylesheet.calendar.header': {
                week: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              },
            }}
          />
          <View style={{backgroundColor: '#fff', padding: 8}}>
            {!singleDate && false && (
              <ButtonDisabled title="нет найти мастеров на эту дату😞" />
            )}
            {!singleDate && true && (
              <ButtonDefault
                onPress={() => {
                  clearCalendar({});
                  onClose(false);
                }}
                title="Показать мастеров (243)"
                active={true}
                style={{marginBottom: 8}}
              />
            )}
            {singleDate && true && (
              <ButtonDefault
                title="выбрать эту дату"
                active={true}
                style={{marginBottom: 8}}
                onPress={() => {
                  chooseThisDate(true);
                  onClose(false);
                }}
              />
            )}
            <ButtonDefault
              title="закрыть"
              onPress={() => {
                clearCalendar({});
                onClose(false);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.4)',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  topBlock: {
    height: 40,
    backgroundColor: '#C092DE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleBlock: {
    backgroundColor: '#B986DA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    color: '#FFF',
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Futura PT',
  },
  dayText: {
    color: '#FFF',
    fontSize: 75,
    fontFamily: 'Futura PT',
  },
  yearText: {
    opacity: 0.5,
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'Futura PT',
  },
});

export default CalendarCustom;
