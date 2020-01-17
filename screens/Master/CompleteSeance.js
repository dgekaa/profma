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
} from 'react-native';

const CompleteSeance = ({navigation}) => {
  const {groupBlock, blockTitle, blockInGroup, textBold} = styles;

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Завершить сеанс" />
      <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
        <Text style={blockTitle}>итоги сеанса</Text>
        <View style={[groupBlock, blockInGroup]}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 13}}>Полученная от клиента сумма</Text>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>2 750</Text>
          </View>
          <View>
            <Text></Text>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>руб</Text>
          </View>
        </View>
        <View style={{padding: 8, marginTop: 8}}>
          <Text style={{fontSize: 13}}>Итоговая стоимость сеанса</Text>
          <Text style={textBold}>1 800 руб</Text>
        </View>
      </View>
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
