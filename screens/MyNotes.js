import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../components/BackgroundHeader';
import {InputWithText} from '../components/Input';
import {ButtonDefault} from '../components/Button';

import {
  Text,
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Block = ({el, navigation}) => {
  const {block, topBlock, img, textBold, dateText, bottomBlock} = styles;
  return (
    <TouchableOpacity
      key={el.id}
      onPress={() => {
        navigation.navigate('NoteInformation', el);
      }}>
      <View style={block}>
        <View style={topBlock}>
          <View style={{flexDirection: 'row', flex: 6}}>
            <Image
              style={{marginRight: 5}}
              source={require('../img/CalendarColor.png')}
            />
            <Text style={dateText}>
              {el.date} В {el.time}
            </Text>
          </View>
          <View style={{flex: 4}}>
            <Text style={textBold}>1250р</Text>
          </View>
        </View>
        <View style={bottomBlock}>
          <Image
            style={img}
            source={{
              uri:
                'https://m.day.kyiv.ua/sites/default/files/styles/460-news/public/news/31082019/2019-08-30t225105z_1893876549_rc1ab1e58710_rtrmadp_3_usa-trump.jpg?itok=ooNOC63X',
            }}
          />
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 10}}>Мастер</Text>
              <Text style={textBold}>{el.name}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={textBold}>{el.address.address}</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 10}}>Услуга</Text>
              {el.services.map(el => (
                <Text style={textBold}>{el.name}</Text>
              ))}
            </View>
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
          <BackgroundHeader navigation={navigation} blackArrow={true} />
          <View style={{flex: 1, paddingHorizontal: 18}}>
            <View style={{flex: 8}}>
              <Text style={bigText}>
                У вас пока нет ни одной активной записи😞
              </Text>
              <Text style={smallText}>
                Сделайте вашу первую запись уже сегодня.
              </Text>
            </View>
            <View style={{flex: 2}}>
              <ButtonDefault title="Записаться на сеанс" active={true} />
              <ButtonDefault title="Найти мастера" />
            </View>
          </View>
        </View>
      )}
      {!!navigation.state.params.length && (
        <View style={{flex: 1}}>
          <BackgroundHeader navigation={navigation} title="Мои записи" />
          <ScrollView style={{paddingHorizontal: 8, marginTop: 10}}>
            <Text style={blockTitle}>Активные записи</Text>
            {navigation.state.params.map(el => (
              <Block el={el} navigation={navigation} />
            ))}
            <Text style={blockTitle}>Архив записей</Text>
            {navigation.state.params.map(el => (
              <Block el={el} navigation={navigation} />
            ))}
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
    height: 125,
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 1,
    marginBottom: 8,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  topBlock: {
    height: 33,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.3,
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
  },
  blockTitle: {
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 18,
    marginTop: 15,
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
  },
});

export default MyNotes;
