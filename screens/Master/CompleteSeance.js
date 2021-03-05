import React from 'react';
import {useMutation} from 'react-apollo';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import SvgUri from 'react-native-svg-uri';
import PlusIcon from '../../img/Plus.svg';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import {launchImageLibrary} from 'react-native-image-picker';

import {
  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,
  UPDATE_APPOINTMENT_ADD_PHOTO,
} from '../../QUERYES';
import {getToken} from '../../util';
import {useState} from 'react';

const CompleteSeance = ({navigation}) => {
  const {groupBlock, blockTitle, blockInGroup, textBold} = styles;

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

  const [photo, setPhoto] = useState(''),
    [isPhotoLoading, setPhotoIsLoading] = useState(false),
    [completeLoading, setCompleteLoading] = useState(false);

  const [UPDATE_APPOINTMENT_PHOTO_mutation] = useMutation(
    UPDATE_APPOINTMENT_ADD_PHOTO,
  );

  const [UPDATE_APPOINTMENT_mutation] = useMutation(
    UPDATE_APPOINTMENT,
    refreshObject,
  );

  const COMPLETE = () => {
    setCompleteLoading(true);
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
        setCompleteLoading(false);
        console.log(res, '__RES UPDATE_SCHEDULE_mutation');
        navigation.state.params.complete(true);
        navigation.state.params.refetch();
        navigation.state.params.reload();
        navigation.goBack();
      })
      .catch(err => {
        setCompleteLoading(false);
        console.log(err, '__ERR UPDATE_SCHEDULE_mutation');
      });
  };

  console.log(navigation.state.params, '-----------');

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Завершить сеанс" />
      <ScrollView>
        <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
          <Text style={blockTitle}>итоги сеанса</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={blockTitle}>фотографии законченной работы</Text>
            <Text style={[blockTitle, {marginRight: 8}]} />
          </View>
          <View style={[groupBlock]}>
            <TouchableOpacity
              style={[blockInGroup]}
              onPress={() => {
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

                  setPhotoIsLoading(true);

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
                              setPhotoIsLoading(false);
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
            {!!isPhotoLoading && (
              <ActivityIndicator size="large" color="#00ff00" />
            )}
            {!!photo && (
              <View style={{width: 100, height: 100, marginBottom: 10}}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                  }}
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
      {completeLoading && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
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
    height: 62,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 16,
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
