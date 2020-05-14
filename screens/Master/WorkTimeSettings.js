import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';

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
} from 'react-native';

const Block = ({el, index, workTime, setWorkTime, navigation}) => {
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
          style={[blockTitle, {color: el.is_holiday ? '#B986DA' : '#D4D7DA'}]}>
          {el.name}
          {el.is_holiday && '😎'}
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
            thumbColor={workTime[index].is_holiday ? '#B986DA' : '#F0F0F0'}
            trackColor={{true: '#e1ceee', false: '#F0F0F0'}}
            onValueChange={bool => {
              workTime[index].is_holiday = bool;
              setWorkTime([...workTime]);
            }}
            value={workTime[index].is_holiday}
          />
        </View>
      </View>
      <View style={[groupBlock, {marginBottom: index === 6 ? 16 : 0}]}>
        <View style={[blockInGroup, borderBottom]}>
          <InputWithText
            onChangeText={text => {
              workTime[index].start_time = text;
              setWorkTime([...workTime]);
            }}
            value={el.start_time}
            style={{width: '100%'}}
            text="Начало рабочего дня"
            placeholder="10:00"
            withoutShadow={true}
          />
        </View>
        <View style={[blockInGroup, borderBottom]}>
          <InputWithText
            onChangeText={text => {
              workTime[index].end_time = text;
              setWorkTime([...workTime]);
            }}
            value={el.end_time}
            style={{width: '100%'}}
            text="Конец рабочего дня"
            placeholder="22:00"
            withoutShadow={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SelectWorkTime', el);
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

  const [workTime, setWorkTime] = useState(navigation.state.params.work_time);

  // console.log(navigation.state.params, 'WORK TIME !');
  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title="Настройка рабочего времени"
      />
      <ScrollView style={{paddingHorizontal: 8}}>
        {workTime.map((el, i) => (
          <View key={i}>
            <Block
              el={el}
              index={i}
              workTime={workTime}
              setWorkTime={setWorkTime}
              navigation={navigation}
            />
          </View>
        ))}
        {true && (
          <ButtonDefault
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
