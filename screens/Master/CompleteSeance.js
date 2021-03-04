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
  Image,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import {launchImageLibrary} from 'react-native-image-picker';

import {
  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,
  LOAD_IMAGE,
  UPDATE_APPOINTMENT_ADD_PHOTO,
} from '../../QUERYES';
import {G} from 'react-native-svg';
import {getToken} from '../../util';
import {useState} from 'react';

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

  const [photo, setPhoto] = useState('');

  const [LOAD_IMAGE_mutation] = useMutation(LOAD_IMAGE);

  const [UPDATE_APPOINTMENT_PHOTO_mutation] = useMutation(
    UPDATE_APPOINTMENT_ADD_PHOTO,
  );

  const [UPDATE_APPOINTMENT_mutation] = useMutation(
    UPDATE_APPOINTMENT,
    refreshObject,
  );

  const COMPLETE = () => {
    const Completed = 'Completed';
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
        navigation.state.params.refetch();
        navigation.goBack();
      })
      .catch(err => console.log(err, '__ERR UPDATE_SCHEDULE_mutation'));
  };

  const whoObj = {
    Master: 'Master',
    Client: 'Client',
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Завершить сеанс" />
      <ScrollView>
        <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
          <Text style={blockTitle}>итоги сеанса</Text>
          {/* <View style={[groupBlock, blockInGroup]}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13 }}>Полученная от клиента сумма</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
                !!!!!!!!!!!
              </Text>
            </View>
            <View>
              <Text />
              <Text style={{ fontWeight: 'bold', fontSize: 13 }}>руб</Text>
            </View>
          </View> */}
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

                const options = {
                  title: 'Select Image',
                  customButtons: [
                    {
                      name: 'customOptionKey',
                      title: 'Choose Photo from Custom Option',
                    },
                  ],
                  storageOptions: {
                    skipBackup: true,
                    path: 'images',
                  },
                };

                launchImageLibrary(options, response => {
                  const formData = new FormData();

                  const operations = `{"query": "mutation ($file: Upload!, $type: UserType!){ uploadAppointmentPhoto(file: $file, type: $type) }", "variables": { "file": null, "type": "Master" }}`;
                  formData.append('operations', operations);
                  const map = '{"0": ["variables.file"]}';
                  formData.append('map', map);

                  ImagePicker.openCropper({
                    path: response.uri,
                    width: 200,
                    height: 200,
                  })
                    .then(image => {
                      const finishImage = {
                        name: 'images.jpeg',
                        type: image.mime,
                        uri:
                          Platform.OS === 'ios'
                            ? `file:///${image.path}`
                            : image.path,
                      };
                      formData.append('0', finishImage);
                      getToken()
                        .then(token => {
                          fetch('http://194.87.145.192/graphql', {
                            method: 'post',
                            headers: {
                              'Content-Type': 'multipart/form-data;',
                              authorization: `Bearer ${token}`,
                            },
                            body: formData,
                          })
                            .then(res => res.json())
                            .then(responseJson => {
                              console.log(
                                responseJson.data,
                                '---responseJson.data',
                              );
                              setPhoto(
                                'http://194.87.145.192/storage/' +
                                  responseJson.data.uploadAppointmentPhoto,
                              );
                              UPDATE_APPOINTMENT_PHOTO_mutation({
                                variables: {
                                  id: +navigation.state.params.data.id,
                                  src: responseJson.data.uploadAppointmentPhoto,
                                },
                                optimisticResponse: null,
                              })
                                .then(res => console.log(res, '__RES PHOTO'))
                                .catch(err => console.log(err, '__ERR PHOTO'));
                            })
                            .catch(err => console.log(err, '===errrrrr'));
                        })
                        .catch(err => console.log(err, '---errr'));

                      // fetch('http://194.87.145.192/graphql', {
                      //   method: 'post',
                      //   headers: {
                      //     'Content-Type': 'multipart/form-data;',
                      //     authorization: `Bearer ${token}`,
                      //   },
                      //   body: formData,
                      // })
                      //   .then((res) => res.json())
                      //   .then((responseJson) => {
                      //     console.log(responseJson, '-----respJS')
                      //   })
                      //   .catch((err) => console.log(err, 'ERR'));
                    })
                    .catch(e => {
                      console.log(e);
                    });
                });
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
            {!!photo && (
              <View style={{width: 100, height: 100}}>
                <Image
                  style={{width: 100, height: 100, borderRadius: 5}}
                  source={{
                    uri: photo,
                  }}
                />
              </View>
            )}
          </View>
          <View style={{padding: 8, marginTop: 8}}>
            <Text style={{fontSize: 13}}>Итоговая стоимость сеанса</Text>
            <Text style={textBold}>{navigation.state.params.price} руб</Text>
          </View>
        </View>
      </ScrollView>
      <ButtonDefault
        onPress={() => COMPLETE()}
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
