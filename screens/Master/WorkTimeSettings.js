import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithText, InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';

const Block = ({el, index, weekDays, setWeekDays, navigation}) => {
  const {groupBlock, blockTitle, blockInGroup, textBold, borderBottom} = styles;

  return (
    <View key={index}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={[blockTitle, {color: el.active ? '#B986DA' : '#D4D7DA'}]}>
          {el.name}
          {el.active && '😎'}
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
            thumbColor={weekDays[index].active ? '#B986DA' : '#F0F0F0'}
            trackColor={{true: '#e1ceee', false: '#F0F0F0'}}
            onValueChange={bool => {
              weekDays[index].active = bool;
              setWeekDays([...weekDays]);
            }}
            value={weekDays[index].active}
          />
        </View>
      </View>
      <View style={[groupBlock, {marginBottom: index === 6 ? 16 : 0}]}>
        <View style={[blockInGroup, borderBottom]}>
          <InputWithText
            onChangeText={text => {
              console.log('!!!');
            }}
            style={{width: '100%'}}
            text="Начало рабочего дня"
            placeholder="10:00"
            withoutShadow={true}
          />
        </View>
        <View style={[blockInGroup, borderBottom]}>
          <InputWithText
            style={{width: '100%'}}
            text="Конец рабочего дня"
            placeholder="20:00"
            withoutShadow={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SelectWorkTime');
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
          <Image source={require('../../img/ArrowRight.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WorkTimeSettings = ({navigation}) => {
  const {} = styles;

  const [weekDays, setWeekDays] = useState([
    {name: 'понедельник', active: false},
    {name: 'вторник', active: false},
    {name: 'среда', active: false},
    {name: 'четверг', active: false},
    {name: 'пятница', active: false},
    {name: 'суббота', active: false},
    {name: 'воскресенье', active: false},
  ]);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title="Настройка рабочего времени"
      />
      <ScrollView style={{paddingHorizontal: 8}}>
        {weekDays.map((el, i) => (
          <Block
            el={el}
            index={i}
            weekDays={weekDays}
            setWeekDays={setWeekDays}
            navigation={navigation}
          />
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
    fontWeight: 'bold',
    marginLeft: 16,
    fontFamily: 'Futura PT',
  },
  blockTitle: {
    textTransform: 'uppercase',
    marginLeft: 8,
    marginBottom: 8,
  },
});

export default WorkTimeSettings;
