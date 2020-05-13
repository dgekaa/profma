import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import SvgUri from 'react-native-svg-uri';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const CompleteSeance = ({navigation}) => {
  const {groupBlock, blockTitle, blockInGroup, textBold, borderBottom} = styles;

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Завершить сеанс" />
      <ScrollView>
        <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
          <Text style={blockTitle}>итоги сеанса</Text>
          <View style={[groupBlock, blockInGroup]}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 13}}>Полученная от клиента сумма</Text>
              <Text style={{fontWeight: 'bold', fontSize: 13}}>
                !!!!!!!!!!!
              </Text>
            </View>
            <View>
              <Text />
              <Text style={{fontWeight: 'bold', fontSize: 13}}>руб</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={blockTitle}>фотографии законченной работы</Text>
            <Text style={[blockTitle, {marginRight: 8}]}>
              {navigation.state.params.data.photo.length}\5
            </Text>
          </View>
          <View style={[groupBlock]}>
            {navigation.state.params.data.photo.map((el, i) => (
              <View
                key={i}
                style={[blockInGroup, borderBottom, {paddingRight: 8}]}>
                {/* <SvgUri source={require('../../img/Gallery.svg')} /> */}
                <Text style={{fontSize: 13, flex: 1, marginLeft: 16}}>
                  {el}
                </Text>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    alert('Удалит фото');
                  }}>
                  <SvgUri source={require('../../img/Trash.svg')} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={[blockInGroup]}
              onPress={() => {
                navigation.state.params.data.photo.length == 5
                  ? alert('Больше добавить нельзя')
                  : alert('Прикрепить фото');
              }}>
              <SvgUri source={require('../../img/Plus.svg')} />
              <Text
                style={{
                  fontSize: 13,
                  flex: 1,
                  marginLeft: 16,
                  fontWeight: 'bold',
                }}>
                Прикрепить фото
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 8, marginTop: 8}}>
            <Text style={{fontSize: 13}}>Итоговая стоимость сеанса</Text>
            <Text style={textBold}>{navigation.state.params.price} руб</Text>
          </View>
        </View>
      </ScrollView>
      <ButtonDefault
        onPress={() => {
          navigation.state.params.complete(true);
          navigation.goBack();
        }}
        style={{margin: 8}}
        title="подтвердить завершение сеанса"
        active={true}
      />
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
    height: 62,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 16,
  },
  borderBottom: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.4,
  },
  textBold: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  blockTitle: {
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 18,
    marginTop: 15,
    fontSize: 10,
  },
});

export default CompleteSeance;
