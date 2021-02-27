import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  ME,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE_WORK_TIME,
  DELETE_SCHEDULE,
} from '../../QUERYES';
import {useMutation, useQuery} from 'react-apollo';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import ArrowRightIcon from '../../img/ArrowRight.svg';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
} from 'react-native';

const weekDaysEnShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  weekDaysRuLong = [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресенье',
  ];

const Block = ({
  index,
  el,
  schedules,
  navigation,
  switchCheck,
  setFirstInputText,
  setSecondInputText,
  validationErr,
  setShowPicker,
  setTimeInfo,
}) => {
  const {groupBlock, blockTitle, blockInGroup, textBold, borderBottom} = styles;

  const [startErr, setStartErr] = useState(''),
    [endErr, setEndErr] = useState('');

  const regExp = '(\\d{2}:\\d{2})';
  useEffect(() => {
    if (schedules && schedules.start_time) {
      !schedules.start_time.slice(0, 5).match(regExp)
        ? setStartErr('Невернное время')
        : setStartErr('');

      !schedules.end_time.slice(0, 5).match(regExp)
        ? setEndErr('Невернное время')
        : setEndErr('');
    }
  }, [schedules]);

  useEffect(() => {
    startErr || endErr ? validationErr(true) : validationErr(false);
  }, [startErr, endErr]);

  const onPressInput = (isFirst, schedules, el) => {
    setShowPicker(true);
    setTimeInfo({isFirst, schedules, el});
  };

  return (
    <View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={[
            blockTitle,
            {color: !schedules || schedules.day_off ? '#B986DA' : '#D4D7DA'},
          ]}>
          {weekDaysRuLong[index]}
          {(!schedules || schedules.day_off) && ' 😎'}
        </Text>
        <View
          style={{
            marginRight: 18,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 13, fontWeight: 'bold'}}>Выходной</Text>
          <View style={{marginLeft: 8}} />
          <Switch
            thumbColor={!schedules || schedules.day_off ? '#B986DA' : '#F0F0F0'}
            trackColor={{true: '#e1ceee', false: '#F0F0F0'}}
            onValueChange={bool => switchCheck(bool, schedules, el)}
            value={!schedules || schedules.day_off}
          />
        </View>
      </View>
      <View style={[groupBlock, {marginBottom: index === 6 ? 16 : 0}]}>
        <View style={[blockInGroup, borderBottom]}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() =>
              !schedules || schedules.day_off
                ? null
                : onPressInput(true, schedules, el)
            }>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'FuturaPT-Medium',
                paddingLeft: 15,
                paddingVertical: 10,
              }}>
              Начало рабочего дня
            </Text>
            <Text
              style={{
                color: !schedules || schedules.day_off ? '#D4D7DA' : '#000',
                fontFamily: 'FuturaPT-Medium',
                paddingLeft: 15,
                paddingBottom: 15,
              }}>
              {schedules && !schedules.day_off
                ? schedules.start_time.slice(0, 5)
                : '00:00'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[blockInGroup, borderBottom]}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() =>
              !schedules || schedules.day_off
                ? null
                : onPressInput(false, schedules, el)
            }>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'FuturaPT-Medium',
                paddingLeft: 15,
                paddingVertical: 10,
              }}>
              Конец рабочего дня
            </Text>
            <Text
              style={{
                color: !schedules || schedules.day_off ? '#D4D7DA' : '#000',
                fontFamily: 'FuturaPT-Medium',
                paddingLeft: 15,
                paddingBottom: 15,
              }}>
              {schedules && !schedules.day_off
                ? schedules.end_time.slice(0, 5)
                : '00:00'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (schedules && !schedules.day_off) {
              navigation.navigate('SelectWorkTime', {schedules: schedules});
            }
          }}
          style={[
            blockInGroup,
            {
              height: 60,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 16,
            },
          ]}>
          <Text style={textBold}>Выбрать время для записи</Text>
          <SvgUri svgXmlData={ArrowRightIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WorkTimeSettings = ({navigation}) => {
  const {} = styles;

  const USER = useQuery(ME);

  const refreshObject = {
    refetchQueries: [
      {
        query: ME,
      },
    ],
    awaitRefetchQueries: true,
  };

  const [CREATE_SCHEDULE_mutation] = useMutation(
      CREATE_SCHEDULE,
      refreshObject,
    ),
    [UPDATE_SCHEDULE_WORK_TIME_mutation] = useMutation(
      UPDATE_SCHEDULE_WORK_TIME,
      refreshObject,
    ),
    [DELETE_SCHEDULE_mutation] = useMutation(DELETE_SCHEDULE, refreshObject);

  const [changedData, setChangedData] = useState({}),
    [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (USER.data) {
      const obj = {};
      weekDaysEnShort.forEach(day => {
        USER.data.me.schedules.forEach((el, i) => {
          if (day === el.day) {
            obj[day] = el;
          } else if (!obj[day] && day !== el.day) {
            obj[day] = null;
          }
        });
      });
      setChangedData(obj);
    }
  }, [USER]);

  const switchCheck = (bool, schedules, day) => {
    bool
      ? setChangedData(prev => {
          return {...prev, [schedules.day]: {...schedules, day_off: true}};
        })
      : schedules
      ? setChangedData(prev => {
          return {...prev, [schedules.day]: {...schedules, day_off: false}};
        })
      : setChangedData(prev => {
          return {
            ...prev,
            [day]: {
              day: day,
              start_time: '00:00',
              end_time: '00:00',
              day_off: false,
            },
          };
        });
  };

  const setFirstInputText = (text, schedules, day) => {
    setChangedData(prev => {
      return {...prev, [schedules.day]: {...schedules, start_time: text}};
    });
  };

  const setSecondInputText = (text, schedules, day) => {
    setChangedData(prev => {
      return {...prev, [schedules.day]: {...schedules, end_time: text}};
    });
  };

  const SAVE = () => {
    for (let key in changedData) {
      if (changedData[key]) {
        if (changedData[key].id) {
          if (changedData[key].day_off) {
            console.log(changedData[key], 'РАБ----ВЫХ');
            DELETE_SCHEDULE_mutation({
              variables: {
                id: +changedData[key].id,
              },
              optimisticResponse: null,
            })
              .then(res => console.log(res, '__RES DELETE_SCHEDULE_mutation'))
              .catch(err => console.log(err, '__ERR DELETE_SCHEDULE_mutation'));
          } else {
            console.log(changedData[key], 'РАБ----РАБ');
            UPDATE_SCHEDULE_WORK_TIME_mutation({
              variables: {
                id: +changedData[key].id,
                day: key,
                start_time: changedData[key].start_time.slice(0, 5),
                end_time: changedData[key].end_time.slice(0, 5),
              },
              optimisticResponse: null,
            })
              .then(res => console.log(res, '__RES UPDATE_SCHEDULE_mutation'))
              .catch(err => console.log(err, '__ERR UPDATE_SCHEDULE_mutation'));
          }
        } else {
          if (changedData[key].day_off) {
            console.log(changedData[key], 'ВЫХ----ВЫХ');
          } else {
            CREATE_SCHEDULE_mutation({
              variables: {
                day: key,
                start_time: changedData[key].start_time.slice(0, 5),
                end_time: changedData[key].end_time.slice(0, 5),
              },
              optimisticResponse: null,
            })
              .then(res => console.log(res, '__RES  CREATE_SCHEDULE_mutation'))
              .catch(err =>
                console.log(err, '__ERR  CREATE_SCHEDULE_mutation'),
              );
          }
        }
      }
    }
  };

  const [isValidationErr, setIsValidationErr] = useState(false),
    [date, setDate] = useState(new Date()),
    [timeInfo, setTimeInfo] = useState();

  const validationErr = data => setIsValidationErr(data);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title="Настройка рабочего времени"
      />
      {showPicker && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255,255,255, 0.2)',
            zIndex: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setShowPicker(false)}>
          <DateTimePicker
            style={{backgroundColor: '#eee', width: '80%'}}
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={+180}
            value={date}
            mode={'time'}
            locale={'en_GB'}
            is24Hour={true}
            display="spinner"
            onChange={(event, selectedTime) => {
              const hours = selectedTime.getHours(),
                minutes = selectedTime.getMinutes();
              setDate(selectedTime || date);
              const time =
                '' +
                (hours > 9 ? hours : '0' + hours) +
                ':' +
                (minutes > 9 ? minutes : '0' + minutes);
              if (timeInfo.isFirst) {
                setFirstInputText(time, timeInfo.schedules, timeInfo.el);
              } else {
                setSecondInputText(time, timeInfo.schedules, timeInfo.el);
              }
            }}
          />
        </TouchableOpacity>
      )}
      <ScrollView style={{paddingHorizontal: 8}}>
        {USER.loading && <ActivityIndicator size="large" color="#00ff00" />}
        {!USER.loading &&
          weekDaysEnShort.map((el, i) => (
            <View key={i}>
              <Block
                setTimeInfo={setTimeInfo}
                setShowPicker={setShowPicker}
                setFirstInputText={setFirstInputText}
                setSecondInputText={setSecondInputText}
                switchCheck={switchCheck}
                schedules={changedData[el]}
                el={el}
                index={i}
                navigation={navigation}
                validationErr={data => validationErr(data)}
              />
            </View>
          ))}
        {!USER.loading && (
          <ButtonDefault
            onPress={() => USER.data && !isValidationErr && SAVE()}
            title="сохранить расписание"
            active={true}
            style={{marginBottom: 8}}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    marginTop: 8,
    borderRadius: 2,
    shadowColor: '#000',
    elevation: 10,
    flexDirection: 'column',
    paddingLeft: 18,
    shadowOpacity: 0.1,
    backgroundColor: '#fff',
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  blockInGroup: {
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 8,
  },
  borderBottom: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.4,
  },
  textBold: {
    fontSize: 13,
    marginLeft: 16,
    fontFamily: 'FuturaPT-Bold',
  },
  blockTitle: {
    textTransform: 'uppercase',
    marginLeft: 8,
    marginBottom: 8,
  },
});

export default WorkTimeSettings;
