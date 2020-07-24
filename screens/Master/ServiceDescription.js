import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithText} from '../../components/Input';
import {ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';
import ModalWindow from '../../components/ModalWindow';
import SvgUri from 'react-native-svg-uri';
import DefaultIcon from '../../img/Default.svg';
import PressedIcon from '../../img/Pressed.svg';

import {Query, useMutation, useQuery} from 'react-apollo';

import {GET_SERVICES, CREATE_OFFER, ME} from '../../QUERYES';

import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';

const ServiceDescription = ({navigation}) => {
  const {groupBlock, blockTitle, blockInGroup, borderBottom} = styles;

  const SERVICES = useQuery(GET_SERVICES, {
    variables: {ids: navigation.state.params.checkedServices},
  });

  const [DATA, setDATA] = useState(null);

  useEffect(() => {
    SERVICES.data && setDATA(SERVICES.data.services.data);
  }, [SERVICES.data]);

  useEffect(() => {
    console.log(DATA, '_____DATA_____');
  }, [DATA]);

  const [serviceCount, setServiceCount] = useState(0);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteService, setDeleteService] = useState(false);

  const [err, setErr] = useState('');

  const [howLong, setHowLong] = useState('');
  const [howMach, setHowMach] = useState('');
  const [desc, setDesc] = useState('');

  const refreshObject = {
    refetchQueries: [
      {
        query: ME,
      },
    ],
    awaitRefetchQueries: true,
  };

  const [CREATE_OFFER_mutation] = useMutation(CREATE_OFFER, refreshObject);

  const clearInputs = () => {
    setHowMach('');
    setHowLong('');
    setDesc('');
  };

  const SAVE = () => {
    CREATE_OFFER_mutation({
      variables: {
        id: +DATA[serviceCount].id,
        description: desc,
        duration: howLong,
        price: howMach,
      },
      optimisticResponse: null,
    })
      .then(res => {
        console.log(res, '__RES CREATE_OFFER_mutation');
        clearInputs();
        if (serviceCount != DATA.length - 1 && howLong && howMach && desc) {
          setServiceCount(prev => prev + 1);
        } else {
          console.log(navigation, 'NAV');
          navigation.navigate('MyServices');
          navigation.state.params.refetch();
        }
      })
      .catch(err => {
        console.log(err, '__ERR CREATE_OFFER_mutation');
      });
  };

  if (SERVICES.error) {
    return <Text />;
  } else if (SERVICES.loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  } else if (SERVICES.data) {
    return (
      <View style={{flex: 1}}>
        <BackgroundHeader
          navigation={navigation}
          title={`Описание услуги (${serviceCount + 1}\\${
            !!DATA ? DATA.length : ''
          })`}
        />
        <ScrollView>
          <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
            <Text style={blockTitle}>ваша специализация</Text>
            <View style={[groupBlock, blockInGroup]}>
              <Text style={{fontWeight: 'bold', fontSize: 13}}>
                {DATA && DATA[serviceCount].specialization.name}
              </Text>
            </View>
            <Text style={blockTitle}>ваша услуга</Text>
            <View style={[groupBlock, blockInGroup]}>
              <Text style={{fontWeight: 'bold', fontSize: 13}}>
                {DATA && DATA[serviceCount].name}
              </Text>
            </View>
            <View
              style={[
                groupBlock,
                {
                  paddingLeft: 8,
                  paddingTop: 8,
                  marginTop: 20,
                  marginBottom: 10,
                },
              ]}>
              <View
                style={{
                  marginTop: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <ButtonDefault
                  onPress={() => {}}
                  style={{marginRight: 5}}
                  flex={true}
                  title="оплата по времени"
                  active={true}
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 8,
                    width: '99%',
                  }}>
                  {true ? (
                    <SvgUri svgXmlData={DefaultIcon} />
                  ) : (
                    <SvgUri svgXmlData={PressedIcon} />
                  )}
                  <InputWithText
                    text={`Продолжительность услуги (в часах)`}
                    placeholder={`Укажите продолжительность сеанса`}
                    withoutShadow={true}
                    onChangeText={text => {
                      setErr('');
                      setHowLong(text);
                    }}
                    style={[borderBottom, {flex: 1}]}
                    err={err}
                    value={howLong}
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
                    text={`Стоимость услуги`}
                    placeholder={`Укажите стоимость сеанса`}
                    withoutShadow={true}
                    onChangeText={text => {
                      setErr('');
                      setHowMach(text);
                    }}
                    style={{flex: 1}}
                    err={err}
                    value={howMach}
                    errStyle={{paddingBottom: 10}}
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
            <View style={[groupBlock, blockInGroup]}>
              <TextInput
                placeholder="Расскажите об услуге поподробнее"
                onChangeText={text => setDesc(text)}
                value={desc}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '85%',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: 16,
            }}>
            <View>
              <Image source={require('../../img/girl6.png')} />
            </View>
            <View style={{marginLeft: 8}}>
              <Text style={{fontSize: 13, paddingRight: 25}}>
                Чтобы клиенты могли начать пользоваться вашей услугой,
                <Text style={{fontWeight: 'bold'}}>
                  сначала укажите её детали.
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={{margin: 8}}>
          {!deleteService && (
            <ButtonDefault
              title={`удалить услугу`}
              style={{marginBottom: 8}}
              onPress={() => {
                setDeleteModal(true);
              }}
            />
          )}
          {deleteService && (
            <SaveSuccess title="🗑 Услуга “Европейский маникюр” успешно удалена." />
          )}
          <ButtonDefault
            onPress={() => {
              !howLong || !howMach || !desc
                ? setErr('Поле обязательно для заполнения')
                : setErr('');

              SAVE();
            }}
            title={
              false
                ? 'ВЫ не указали детали услуги'
                : `сохранить услугу (${serviceCount + 1}/${
                    !!DATA ? DATA.length : ''
                  })`
            }
            active={true}
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
                onPress={() => setDeleteModal(false)}
                style={{marginBottom: 8}}
                title="нет, не удалять услугу"
                active={true}
              />
              <ButtonDefault
                onPress={() => {
                  setDeleteService(true);
                  setDeleteModal(false);
                  clearInputs();
                  if (serviceCount != DATA.length - 1) {
                    setServiceCount(prev => prev + 1);
                  } else {
                    setTimeout(() => {
                      navigation.navigate('MyServices');
                    }, 1000);
                  }
                  setTimeout(() => {
                    setDeleteService(false);
                  }, 1000);
                }}
                title="удалить услугу"
              />
            </View>
          </ModalWindow>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  groupBlock: {
    marginTop: 8,
    flexDirection: 'column',
    paddingLeft: 18,

    borderRadius: 0.2,
    shadowOpacity: 0.18,
    shadowRadius: 0.2,
    elevation: 0.8,
    shadowColor: '#000',
  },
  blockInGroup: {
    height: 50,
    borderRadius: 0.2,
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

export default ServiceDescription;
