import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';

import {
  ME,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE_WORK_TIME,
  DELETE_SCHEDULE,
} from '../../QUERYES';
import {Query, useMutation, useQuery} from 'react-apollo';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithText} from '../../components/Input';
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

const weekDaysEnShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekDaysRuLong = [
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
}) => {
  const {groupBlock, blockTitle, blockInGroup, textBold, borderBottom} = styles;

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
          {!schedules || (schedules.day_off && ' 😎')}
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
          <InputWithText
            onChangeText={text => setFirstInputText(text, schedules, el)}
            value={
              schedules &&
              !schedules.day_off &&
              schedules.start_time.slice(0, 5)
            }
            style={{width: '100%'}}
            text="Начало рабочего дня"
            placeholder="00:00"
            withoutShadow={true}
            editable={!!schedules && !schedules.day_off}
          />
        </View>
        <View style={[blockInGroup, borderBottom]}>
          <InputWithText
            onChangeText={text => setSecondInputText(text, schedules, el)}
            value={
              schedules && !schedules.day_off && schedules.end_time.slice(0, 5)
            }
            style={{width: '100%'}}
            text="Конец рабочего дня"
            placeholder="00:00"
            withoutShadow={true}
            editable={!!schedules && !schedules.day_off}
          />
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
  );
  const [UPDATE_SCHEDULE_WORK_TIME_mutation] = useMutation(
    UPDATE_SCHEDULE_WORK_TIME,
    refreshObject,
  );
  const [DELETE_SCHEDULE_mutation] = useMutation(
    DELETE_SCHEDULE,
    refreshObject,
  );

  const [changedData, setChangedData] = useState({});

  useEffect(() => {
    if (USER.data) {
      const obj = {};
      weekDaysEnShort.forEach((day, ind) => {
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

    console.log(changedData, '_____changedData');
    console.log(bool, '_BOOL');
    console.log(schedules, '_SCHEDULES');
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
    console.log(changedData, '________________-________________!');
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
              .then(res => {
                console.log(res, '__RES DELETE_SCHEDULE_mutation');
              })
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
              .then(res => {
                console.log(res, '__RES UPDATE_SCHEDULE_mutation');
              })
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
              .then(res => {
                console.log(res, '__RES  CREATE_SCHEDULE_mutation');
              })
              .catch(err =>
                console.log(err, '__ERR  CREATE_SCHEDULE_mutation'),
              );
          }
        }
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title="Настройка рабочего времени"
      />
      <ScrollView style={{paddingHorizontal: 8}}>
        {!changedData.Mon && <ActivityIndicator size="large" color="#00ff00" />}
        {changedData.Mon &&
          weekDaysEnShort.map((el, i) => {
            return (
              <View key={i}>
                <Block
                  setFirstInputText={setFirstInputText}
                  setSecondInputText={setSecondInputText}
                  switchCheck={switchCheck}
                  schedules={changedData[el]}
                  el={el}
                  index={i}
                  navigation={navigation}
                />
              </View>
            );
          })}
        {changedData.Mon && (
          <ButtonDefault
            onPress={() => USER.data && SAVE()}
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
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 1,
    flexDirection: 'column',
    paddingLeft: 18,
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
