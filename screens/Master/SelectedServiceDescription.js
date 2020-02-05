import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithText, InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';
import ModalWindow from '../../components/ModalWindow';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

const SelectedServiceDescription = ({navigation}) => {
  const {groupBlock, blockTitle, blockInGroup, borderBottom} = styles;

  const [howPay, setHowPay] = useState('time');
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Описание услуги" />
      <ScrollView>
        <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
          <Text style={blockTitle}>ваша специализация</Text>
          <View style={[groupBlock, blockInGroup]}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              Мастер маникюра
            </Text>
          </View>
          <Text style={blockTitle}>ваша услуга</Text>
          <View style={[groupBlock, blockInGroup]}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              Европейский маникюр
            </Text>
          </View>
          <View
            style={[
              groupBlock,
              {paddingLeft: 8, paddingTop: 8, marginTop: 20, marginBottom: 10},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <ButtonDefault
                onPress={() => {
                  setHowPay('time');
                }}
                style={{marginRight: 5}}
                flex={true}
                title="оплата по времени"
                active={howPay === 'time' ? true : false}
              />
              <ButtonDefault
                onPress={() => {
                  setHowPay('nail');
                }}
                flex={true}
                style={{marginRight: 8}}
                active={howPay === 'nail' ? true : false}
                title="оплата за ноготь"
              />
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 8,
                }}>
                {true ? (
                  <SvgUri source={require('../../img/Default.svg')} />
                ) : (
                  <SvgUri source={require('../../img/Pressed.svg')} />
                )}
                <InputWithText
                  editable={false}
                  selectTextOnFocus={false}
                  value="asdasdasdvvvv"
                  text={
                    howPay == 'time'
                      ? `Продолжительность услуги (в часах)`
                      : 'Количество ногтей'
                  }
                  placeholder={`Укажите продолжительность сеанса`}
                  withoutShadow={true}
                  onChangeText={text => {}}
                  style={[borderBottom, {flex: 1, marginRight: 8}]}
                  errStyle={{paddingBottom: 10}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                }}>
                <SvgUri source={require('../../img/Default.svg')} />
                <InputWithText
                  editable={false}
                  selectTextOnFocus={false}
                  value="asdad!!!!!!"
                  text={`Стоимость услуги`}
                  placeholder={`Укажите стоимость сеанса`}
                  withoutShadow={true}
                  onChangeText={text => {}}
                  style={{flex: 1}}
                />
                <Text
                  style={{
                    paddingHorizontal: 8,
                    paddingTop: 20,
                    fontSize: 13,
                    color: 'rgba(0,0,0,.2)',
                    fontWeight: 'bold',
                  }}>
                  руб
                </Text>
              </View>
            </View>
          </View>
          <Text style={blockTitle}>Описание услуги</Text>
          <View style={[groupBlock, {padding: 8}]}>
            <Text style={{fontSize: 13, color: '#011627'}}>
              Во время европейского маникюра, кожа кутикулы не обрезается, а
              деликатно отодвигается апельсиновой палочкой со специальным
              средством.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{margin: 8}}>
        <ButtonDefault
          title="удалить услугу"
          onPress={() => {
            setDeleteModal(true);
          }}
        />
      </View>
      {deleteModal && (
        <ModalWindow>
          <Text style={{fontSize: 13}}>Вы собираетесь удалить услугу</Text>
          <Text style={{fontSize: 13, fontWeight: 'bold'}}>
            Европейский маникюр
          </Text>
          <Image
            style={{marginVertical: 12}}
            source={require('../../img/girl5.png')}
          />
          <Text style={{marginBottom: 16}}>Вы уверены в своём решении?</Text>
          <View style={{width: '100%'}}>
            <ButtonDefault
              onPress={() => {
                setDeleteModal(false);
              }}
              style={{marginBottom: 8}}
              title="нет, не удалять услугу"
              active={true}
            />
            <ButtonDefault
              onPress={() => {
                navigation.state.params.deleteService(true);
                setDeleteModal(true);
                navigation.goBack();
              }}
              title="удалить услугу"
            />
          </View>
        </ModalWindow>
      )}
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
    height: 50,
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
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 13,
    fontFamily: 'Futura PT',
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

export default SelectedServiceDescription;
