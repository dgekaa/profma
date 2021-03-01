import React, {useState, useEffect} from 'react';
import moment from 'moment';

import {Calendar, LocaleConfig} from 'react-native-calendars';
import {ButtonDefault, ButtonDisabled} from '../components/Button';

import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {shortMonthName12} from '../constants';

const dayNames = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];

LocaleConfig.locales['ru'] = {
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
  monthNamesShort: shortMonthName12,
  dayNames,
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};
LocaleConfig.defaultLocale = 'ru';

const CalendarCustom = ({
  onClose,
  clearCalendar,
  singleDate,
  todayInfo,
  chooseThisDate,
  showMasters,
}) => {
  const {
    monthText,
    dayText,
    yearText,
    middleBlock,
    topBlock,
    container,
    bg,
    btnDisabledWrap,
    mb,
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
          monthName: shortMonthName12[month - 1],
          date: date,
        });
    }
  }, [date]);

  const [markedDates, setMarkedDates] = useState({});

  const onSelectDays = day => {
    if (!singleDate) {
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
    } else {
      setMarkedDates({
        [day.dateString]: {selected: true, selectedColor: '#B986DA'},
      });
    }
  };

  return (
    <View style={bg}>
      <View style={container}>
        <ScrollView>
          <View style={topBlock}>
            <Text style={{color: '#FFF'}}>{dayNames[new Date().getDay()]}</Text>
          </View>
          <View style={middleBlock}>
            <Text style={monthText}>{shortMonthName12[month - 1]}</Text>
            <Text style={dayText}>{date}</Text>
            <Text style={yearText}>{year}</Text>
          </View>
          <Calendar
            minDate={moment(now, 'DD/MM/YYYY', true)
              .format()
              .slice(0, 10)}
            markedDates={markedDates}
            hideExtraDays={true}
            onDayPress={day => onSelectDays(day)}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
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
          <View style={btnDisabledWrap}>
            {/* {!singleDate && false && (
              <ButtonDisabled
                title="нет найти мастеров на эту дату😞"
                style={mb}
              />
            )} */}
            {!singleDate && (
              <ButtonDefault
                onPress={() => {
                  console.log(markedDates, '---markedDates');
                  showMasters(markedDates);
                  onClose(false);
                }}
                title="Показать мастеров"
                active={true}
                style={mb}
              />
            )}
            {singleDate && (
              <ButtonDefault
                title="выбрать эту дату"
                active={true}
                style={mb}
                onPress={() => {
                  showMasters(markedDates);
                  chooseThisDate(true);
                  onClose(false);
                }}
              />
            )}
            <ButtonDefault
              title="закрыть"
              onPress={() => {
                clearCalendar && clearCalendar({});
                onClose(false);
              }}
            />
          </View>
        </ScrollView>
      </View>
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
    alignItems: 'center',
  },
  container: {
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  topBlock: {
    height: 40,
    backgroundColor: '#C092DE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDisabledWrap: {
    backgroundColor: '#fff',
    padding: 8,
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
    fontFamily: 'FuturaPT-Medium',
  },
  dayText: {
    color: '#FFF',
    fontSize: 75,
    fontFamily: 'FuturaPT-Medium',
  },
  yearText: {
    opacity: 0.5,
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'FuturaPT-Medium',
  },
  mb: {
    marginBottom: 8,
  },
});

export default CalendarCustom;
