import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';

import BackgroundHeader, {Header} from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import {people} from '../../data';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
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

const Block = ({el, navigation, key, archive}) => {
  console.log(el, 'ELLLLLLLLLLLLLLLLLll');
  let costCount = 0;
  el.services &&
    el.services.forEach((elem, i) => {
      costCount += +elem.how_mach;
    });
  const {block, topBlock, img, textBold, dateText, bottomBlock} = styles;
  return (
    <TouchableOpacity
      style={block}
      key={key}
      onPress={() => {
        navigation.navigate('NoteInformation', {
          person: el,
          people,
        });
      }}>
      <View style={topBlock}>
        <View style={{flexDirection: 'row', flex: 6, alignItems: 'center'}}>
          <SvgUri
            style={{marginRight: 5}}
            width="14"
            height="14"
            source={
              archive
                ? require('../../img/calendarGray.svg')
                : require('../../img/CalendarColor.svg')
            }
          />
          <Text style={[dateText, {color: archive ? '#A6ADB3' : '#B986DA'}]}>
            {el.day} {shortMonthName[+el.month - 1]} В {el.time}
          </Text>
        </View>
        <View style={{flex: 4}}>
          <Text style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
            {costCount} руб.
          </Text>
        </View>
      </View>
      <View style={bottomBlock}>
        {people
          .filter(index => el.master_id == index.id)
          .map((el, i) => (
            <Image
              style={img}
              source={{
                uri: el.img,
              }}
            />
          ))}
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10, color: archive ? '#A6ADB3' : 'black'}}>
              Мастер
            </Text>
            {people
              .filter(index => el.master_id == index.id)
              .map((el, i) => (
                <Text
                  key={i}
                  style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
                  {el.master_name}
                </Text>
              ))}
          </View>
          <View style={{flex: 1}}>
            {people
              .filter(index => el.master_id == index.id)
              .map((el, i) => (
                <Text
                  key={i}
                  style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
                  {el.address}
                </Text>
              ))}
            <Text style={{fontSize: 10}}>Садовая</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10, color: archive ? '#A6ADB3' : 'black'}}>
              Услуга
            </Text>
            {el.services.map((el, i) => (
              <Text
                key={i}
                style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
                {el.name}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MyNotes = ({navigation}) => {
  const {bigText, smallText, textBold, blockTitle, block} = styles;

  return (
    <View style={{flex: 1}}>
      {!navigation.state.params.length && (
        <View style={{flex: 1}}>
          <Header navigation={navigation} />
          <View style={{flex: 1, paddingHorizontal: 18}}>
            <View style={{flex: 8}}>
              <Text style={bigText}>
                У вас пока нет ни одной активной записи😞
              </Text>
              <Text style={smallText}>
                Сделайте вашу первую запись уже сегодня.
              </Text>
            </View>
            <View style={{}}>
              <ButtonDefault
                title="Записаться на сеанс"
                active={true}
                style={{marginBottom: 8}}
              />
              <ButtonDefault title="Найти мастера" style={{marginBottom: 8}} />
            </View>
          </View>
        </View>
      )}
      {!!navigation.state.params.length && (
        <View style={{flex: 1}}>
          <BackgroundHeader navigation={navigation} title="Мои записи" />
          <ScrollView style={{flex: 1, paddingHorizontal: 8, marginTop: 10}}>
            <Text style={blockTitle}>Активные записи</Text>
            {navigation.state.params.map((el, i) => {
              if (el.is_active) {
                return <Block el={el} navigation={navigation} key={i} />;
              }
            })}
            <Text style={blockTitle}>Архив записей</Text>
            {navigation.state.params.map((el, i) => {
              if (el.is_archive) {
                return (
                  <Block
                    el={el}
                    navigation={navigation}
                    archive={true}
                    key={i}
                  />
                );
              }
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bigText: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: 'bold',
    width: '90%',
  },
  smallText: {
    marginTop: 15,
  },
  block: {
    flex: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    marginBottom: 8,
    paddingLeft: 8,
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
    lineHeight: 16,
  },
  blockTitle: {
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 18,
    marginTop: 15,
    fontSize: 13,
    marginBottom: 8,
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
});

export default MyNotes;
