import React, {useState} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {
  ME,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE,
  GET_SCHEDULE,
  DELETE_START_SESSION,
} from '../../QUERYES';
import {useMutation} from 'react-apollo';
import {act} from 'react-test-renderer';

const SelectWorkTime = ({navigation}) => {
  const {container, topBlock, timeBlock, timeContainer} = styles;

  const refreshObject = {
    refetchQueries: [
      {
        query: ME,
      },
    ],
    awaitRefetchQueries: true,
  };

  const [UPDATE_SCHEDULE_mutation] = useMutation(
    UPDATE_SCHEDULE,
    refreshObject,
  );

  const [DELETE_START_SESSION_mutation] = useMutation(
    DELETE_START_SESSION,
    refreshObject,
  );

  const startTime = navigation.state.params.schedules.start_time.slice(0, 5);
  const endTime = navigation.state.params.schedules.end_time.slice(0, 5);

  const startHour = +startTime.split(':')[0];
  const startMinutes = +startTime.split(':')[1];
  const endHour = +endTime.split(':')[0];
  const endMinutes = +endTime.split(':')[1];

  let timeArr = [];
  for (let i = startHour; i <= endHour; i++) {
    for (let j = 0; j <= 45; j = j + 15) {
      if (i == startHour && j < startMinutes) {
        continue;
      }
      if (i == endHour && j > endMinutes - 30) {
        continue;
      }
      j == 0
        ? timeArr.push({time: +i + ':' + '00', active: false})
        : timeArr.push({time: +i + ':' + j, active: false});
    }
  }
  endMinutes < 15 && timeArr.pop();

  for (let i = 0; i < timeArr.length; i++) {
    for (
      let j = 0;
      j < navigation.state.params.schedules.start_sessions.length;
      j++
    ) {
      if (
        timeArr[i].time ===
        navigation.state.params.schedules.start_sessions[j].time.slice(0, 5)
      ) {
        timeArr[i].active = true;
      }
    }
  }

  const [activeArr, setActiveArr] = useState(timeArr);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title="Укажите время в расписании"
      />
      <ScrollView>
        <View style={container}>
          <View style={topBlock}>
            <View style={{flex: 2}}>
              <Image source={require('../../img/girl4.png')} />
            </View>
            <View style={{flexDirection: 'column', flex: 5}}>
              <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                Укажите время, когда клиенты могут записываться к вам на сеансы.
              </Text>
              <Text style={{fontSize: 13}}>
                Начало и конец рабочего дня ограничено ранее указанным временем:
                <Text
                  style={{fontSize: 13, color: '#B986DA', fontWeight: 'bold'}}>
                  {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
                </Text>
              </Text>
            </View>
          </View>
          <View style={timeContainer}>
            {activeArr.map((el, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    activeArr[i].active == true
                      ? (activeArr[i].active = false)
                      : (activeArr[i].active = true);
                    setActiveArr([...activeArr]);
                  }}
                  style={[
                    timeBlock,
                    {
                      backgroundColor: !el.active ? '#fff' : '#B986DA',
                    },
                  ]}
                  key={i}>
                  <Text
                    style={{
                      color: !el.active ? '#B986DA' : '#fff',
                      fontWeight: 'bold',
                      fontSize: 13,
                    }}>
                    {el.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <ButtonDefault
        style={{margin: 8}}
        title={
          'сохранить указанное время (' +
          activeArr.filter(el => el.active).length +
          ')'
        }
        active={true}
        onPress={() => {
          const objSimple = {};
          const objDelete = {};
          const objCreate = {};
          activeArr.some(el => {
            if (!navigation.state.params.schedules.start_sessions.length) {
              if (el.active) {
                objCreate[el.time] = el;
              }
            }
            navigation.state.params.schedules.start_sessions.some((inDB, i) => {
              console.log(inDB, '___INDB');
              if (inDB.time.slice(0, 5) === el.time && el.active) {
                objSimple[inDB.time.slice(0, 5)] = inDB;
              } else if (inDB.time.slice(0, 5) === el.time && !el.active) {
                objDelete[inDB.time.slice(0, 5)] = inDB;
              } else if (el.active) {
                objCreate[el.time] = el;
              }
            });
          });
          console.log(activeArr, '____________activeArr');
          console.log(navigation.state.params.schedules, '____schedules');
          console.log(objDelete, '-------------------objDelete');
          console.log(objSimple, '-------------------objSimple');
          console.log(objCreate, '-------------------objCreate');

          for (let key in objCreate) {
            if (!objSimple[key]) {
              console.log(key, 'KEY CREATE');
              UPDATE_SCHEDULE_mutation({
                variables: {
                  id: +navigation.state.params.schedules.id,
                  time: key,
                },
                optimisticResponse: null,
              })
                .then(res => {
                  console.log(res, '__RES UPDATE_SCHEDULE_mutation');
                })
                .catch(err =>
                  console.log(err, '__ERR UPDATE_SCHEDULE_mutation'),
                );
            }
          }
          for (let key in objDelete) {
            console.log(objDelete[key], '_____KEY DELETE');
            DELETE_START_SESSION_mutation({
              variables: {
                id: +objDelete[key].id,
              },
              optimisticResponse: null,
            })
              .then(res => {
                console.log(res, '__RES DELETE_START_SESSION');
              })
              .catch(err => console.log(err, '__ERR DELETE_START_SESSION'));
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flex: 1,
    alignItems: 'center',
  },
  topBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  timeBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    width: '24%',
    height: 33,
    marginBottom: 5,
    borderColor: '#B986DA',
  },
  timeContainer: {
    justifyContent: 'space-between',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 8,
  },
});

export default SelectWorkTime;
