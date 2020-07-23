import React from 'react';
import {useMutation} from 'react-apollo';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import SvgUri from 'react-native-svg-uri';
import GalleryIcon from '../../img/Gallery.svg';
import TrashIcon from '../../img/Trash.svg';
import PlusIcon from '../../img/Plus.svg';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  GET_USER,
  UPDATE_PROFILE,
  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,
} from '../../QUERYES';
import {G} from 'react-native-svg';
import {getToken} from '../../util';

const CompleteSeance = ({navigation}) => {
  const {groupBlock, blockTitle, blockInGroup, textBold, borderBottom} = styles;

  const refreshObject = {
    refetchQueries: [
      {
        query: GET_APPOINTMENT,
        variables: {
          id: +navigation.state.params.data.id,
        },
      },
    ],
    awaitRefetchQueries: true,
  };

  const [UPDATE_APPOINTMENT_mutation] = useMutation(
    UPDATE_APPOINTMENT,
    refreshObject,
  );

  console.log(navigation.state.params);

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
              {/* {navigation.state.params.data.photo.length}\5 */}
            </Text>
          </View>
          <View style={[groupBlock]}>
            {/* {navigation.state.params.data.photo.map((el, i) => (
              <View
                key={i}
                style={[blockInGroup, borderBottom, {paddingRight: 8}]}>
                <SvgUri svgXmlData={GalleryIcon} />
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
                  <SvgUri svgXmlData={TrashIcon} />
                </TouchableOpacity>
              </View>
            ))} */}
            <TouchableOpacity
              style={[blockInGroup]}
              onPress={() => {
                // navigation.state.params.data.photo.length == 5
                //   ? alert('Больше добавить нельзя')
                //   : alert('Прикрепить фото');
              }}>
              <SvgUri svgXmlData={PlusIcon} />
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
          const Completed = 'Completed';
          console.log(navigation.state.params, 'navigation.state.params');
          UPDATE_APPOINTMENT_mutation({
            variables: {
              id: +navigation.state.params.data.id,
              time: navigation.state.params.data.time.slice(0, 5),
              date: navigation.state.params.data.date,
              status: Completed,
            },
            optimisticResponse: null,
          })
            .then(res => {
              console.log(res, '__RES UPDATE_SCHEDULE_mutation');
              navigation.state.params.complete(true);
              navigation.goBack();
            })
            .catch(err => console.log(err, '__ERR UPDATE_SCHEDULE_mutation'));
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
