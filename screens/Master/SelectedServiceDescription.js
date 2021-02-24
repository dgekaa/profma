import React, {useState} from 'react';
import SvgUri from 'react-native-svg-uri';
import DefaultSvgIcon from '../../img/Default.svg';
import PressedIcon from '../../img/Pressed.svg';
import DefaultIcon from '../../img/Default.svg';

import {useMutation} from 'react-apollo';
import {DELETE_OFFER, ME} from '../../QUERYES';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithText} from '../../components/Input';
import {ButtonDefault} from '../../components/Button';
import ModalWindow from '../../components/ModalWindow';

import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';

const SelectedServiceDescription = ({navigation}) => {
  const {groupBlock, blockTitle, blockInGroup, borderBottom} = styles;

  const [deleteModal, setDeleteModal] = useState(false);

  console.log(navigation.state.params.service, 'NAV___');
  const {
    description,
    price_by_pack,
    service,
    id,
  } = navigation.state.params.service;

  const refreshObject = {
    refetchQueries: [
      {
        query: ME,
      },
    ],
    awaitRefetchQueries: true,
  };

  const [DELETE_OFFER_mutation] = useMutation(DELETE_OFFER, refreshObject);

  const DELETE = () => {
    console.log(id, '____');
    DELETE_OFFER_mutation({
      variables: {
        id: id,
      },
      optimisticResponse: null,
    })
      .then(res => {
        console.log(res, '__RES');
        navigation.state.params.deleteService(true);
        setDeleteModal(true);
        navigation.state.params.refetch();
        navigation.goBack();
      })
      .catch(err => console.log(err, '__ERR'));
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Описание услуги" />
      <ScrollView>
        <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
          <Text style={blockTitle}>ваша специализация</Text>
          <View style={[groupBlock, blockInGroup]}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              {service.specialization.name}
            </Text>
          </View>
          <Text style={blockTitle}>ваша услуга</Text>
          <View style={[groupBlock, blockInGroup]}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              {service.name}
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
              {/* <ButtonDefault
                style={{marginRight: 5}}
                flex={true}
                title="оплата по времени"
                active={true}
              /> */}
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 8,
                }}>
                {true ? (
                  <SvgUri svgXmlData={DefaultSvgIcon} />
                ) : (
                  <SvgUri svgXmlData={PressedIcon} />
                )}
                <InputWithText
                  editable={false}
                  selectTextOnFocus={false}
                  value={'' + price_by_pack.duration}
                  text={`Продолжительность услуги (в часах)`}
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
                <SvgUri svgXmlData={DefaultIcon} />
                <InputWithText
                  editable={false}
                  selectTextOnFocus={false}
                  value={'' + price_by_pack.price}
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
            <Text style={{fontSize: 13, color: '#011627'}}>{description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{margin: 8}}>
        <ButtonDefault
          title="удалить услугу"
          onPress={() => setDeleteModal(true)}
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
            <ButtonDefault onPress={() => DELETE()} title="удалить услугу" />
          </View>
        </ModalWindow>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    marginTop: 8,
    flexDirection: 'column',
    paddingLeft: 18,
    borderRadius: 0.2,
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
    marginLeft: 13,
    fontFamily: 'FuturaPT-Bold',
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
