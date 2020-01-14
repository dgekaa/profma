import React, {useState, useEffect} from 'react';

import BackgroundHeader, {Header} from '../components/BackgroundHeader';
import {InputWithText} from '../components/Input';
import {ButtonDefault} from '../components/Button';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Block = ({el, navigation, key, archive}) => {
  const {block, topBlock, img, textBold, dateText, bottomBlock} = styles;
  return (
    <TouchableOpacity
      style={block}
      key={key}
      onPress={() => {
        navigation.navigate('NoteInformation', el);
      }}>
      <View style={topBlock}>
        <View style={{flexDirection: 'row', flex: 6}}>
          <Image
            style={{marginRight: 5}}
            source={
              archive
                ? require('../img/CalendarGray.png')
                : require('../img/CalendarColor.png')
            }
          />
          <Text style={[dateText, {color: archive ? '#A6ADB3' : 'black'}]}>
            {el.date} В {el.time}
          </Text>
        </View>
        <View style={{flex: 4}}>
          <Text style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
            1250р
          </Text>
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
            <Text style={{fontSize: 10, color: archive ? '#A6ADB3' : 'black'}}>
              Мастер
            </Text>
            <Text style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
              {el.name}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
              {el.address.address}
            </Text>
            <Text style={{fontSize: 10}}>Садовая</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 10, color: archive ? '#A6ADB3' : 'black'}}>
              Услуга
            </Text>
            {el.services.map(el => (
              <Text style={[textBold, {color: archive ? '#A6ADB3' : 'black'}]}>
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
            {navigation.state.params.map((el, i) => (
              <Block el={el} navigation={navigation} key={i} />
            ))}
            <Text style={blockTitle}>Архив записей</Text>
            {navigation.state.params.map((el, i) => (
              <Block el={el} navigation={navigation} archive={true} key={i} />
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
    flex: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
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
    paddingRight: 8,
  },
});

export default MyNotes;
