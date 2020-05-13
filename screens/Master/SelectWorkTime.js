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

const SelectWorkTime = ({navigation}) => {
  const {container, topBlock, timeBlock, timeContainer} = styles;

  const startTime = navigation.state.params.start_time || '10:00';
  const endTime = navigation.state.params.end_time || '20:00';

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
    for (let j = 0; j < navigation.state.params.all_time.length; j++) {
      if (timeArr[i].time == navigation.state.params.all_time[j]) {
        timeArr[i].active = true;
      }
    }
  }

  const [activeArr, setActiveArr] = useState(timeArr);

  console.log(navigation.state.params, 'navigation.state.params');
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
                  {startTime} - {endTime}
                </Text>
              </Text>
            </View>
          </View>
          <View style={timeContainer}>
            {activeArr.map((el, i) => (
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
            ))}
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
          navigation.goBack();
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
