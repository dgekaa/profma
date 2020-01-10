import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../components/BackgroundHeader';
import {InputWithText} from '../components/Input';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {ButtonDefault, ButtonDisabled} from '../components/Button';

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
  Picker,
  Dimensions,
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
  dayNames: [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ],
  dayNamesShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
};
LocaleConfig.defaultLocale = 'fr';

const CalendarCustom = ({markedDates, onDayPress, onClose, clearCalendar}) => {
  // console.log(markedDates, 'markedDates');
  const {
    monthText,
    dayText,
    yearText,
    middleBlock,
    topBlock,
    container,
    bg,
  } = styles;

  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const now = `${year}-${month}-${date}`;

  const [dayOfWeek, setDayOfWeek] = useState('Среда???');
  const [monthTitle, setMonthTitle] = useState(shortMonthName[month - 1]);
  const [dayTitle, setDayTitle] = useState(date);
  const [yearTitle, setYearTitle] = useState(year);

  return (
    <View style={bg}>
      <ScrollView style={container}>
        <View style={topBlock}>
          <Text style={{color: '#FFF'}}>{dayOfWeek}</Text>
        </View>
        <View style={middleBlock}>
          <Text style={monthText}>{monthTitle}</Text>
          <Text style={dayText}>{dayTitle}</Text>
          <Text style={yearText}>{yearTitle}</Text>
        </View>
        <Calendar
          current={now}
          markedDates={markedDates}
          minDate={now}
          hideExtraDays={true}
          hideArrows={true}
          // maxDate={'2100-01-01'}
          onDayPress={day => {
            console.log(day, '!!!');
            setMonthTitle(shortMonthName[day.month - 1]);
            setYearTitle(day.year);
            setDayTitle(day.day);
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
        <View style={{backgroundColor: '#fff', padding: 16}}>
          {false && <ButtonDisabled title="нет найти мастеров на эту дату😞" />}
          {true && (
            <ButtonDefault
              title="Показать мастеров (243)"
              active={true}
              style={{marginBottom: 8}}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  container: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  topBlock: {
    height: 40,
    backgroundColor: '#C092DE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleBlock: {
    paddingVertical: 50,
    height: 170,
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
