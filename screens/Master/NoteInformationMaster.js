import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';
import DefaultIcon from '../../img/Default.svg';
import PlusIcon from '../../img/Plus.svg';
import {Query, useMutation, useQuery} from 'react-apollo';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';
import {people} from '../../data';
import {GET_USER, GET_APPOINTMENT, UPDATE_PROFILE} from '../../QUERYES';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
const shortMonthName = [
  'Янв',
  'Фев',
  'Март',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сент',
  'Окт',
  'Нояб',
  'Дек',
];

const NoteInformationMaster = ({navigation}) => {
  const {
    first,
    text,
    blockTitle,
    groupBlock,
    blockInGroup,
    borderBottom,
  } = styles;

  const [price, setPrice] = useState();
  const [isCompleted, setIsCompleted] = useState(false);

  const appointment = useQuery(GET_APPOINTMENT, {
    variables: {id: +navigation.state.params.id},
  });

  const refreshObject = {
    refetchQueries: [
      {
        query: GET_APPOINTMENT,
        variables: {
          id: +navigation.state.params.id,
        },
      },
    ],
    awaitRefetchQueries: true,
  };

  const [UPDATE_PROFILE_mutation] = useMutation(UPDATE_PROFILE, refreshObject);

  useEffect(() => {
    console.log(appointment.data, '__appointment');
  }, [appointment]);

  useEffect(() => {
    if (appointment.data) {
      let count = 0;
      appointment.data.appointment.offers.length &&
        appointment.data.appointment.offers.forEach((el, i) => {
          count += el.price_by_pack.price;
        });
      setPrice(count);
    }
  }, [appointment]);

  if (appointment.error) {
    return <Text>ERR</Text>;
  } else if (appointment.loading) {
    return <Text>Load</Text>;
  } else {
    return (
      <View style={{flex: 1}}>
        <BackgroundHeader
          navigation={navigation}
          title={
            appointment.data.appointment.status === 'Completed'
              ? 'Сеанс завершён'
              : 'Запись оформлена'
          }
        />
        <ScrollView>
          <View style={{flex: 1, paddingHorizontal: 8, paddingTop: 0}}>
            <Text style={blockTitle}>персональные данные</Text>
            <View style={groupBlock}>
              <View style={[blockInGroup, borderBottom]}>
                <Text style={{fontSize: 10}}>Имя клиента</Text>

                <Text style={text}>
                  {appointment.data.appointment.client.profile.name}
                </Text>
              </View>
              <View style={blockInGroup}>
                <Text style={{fontSize: 10}}>Мобильный телефон клиента</Text>

                <Text style={text}>
                  {appointment.data.appointment.client.profile.mobile_phone}
                </Text>
              </View>
            </View>
            {/* УСЛУГИ */}
            <View>
              <Text style={blockTitle}>Услуги</Text>
              <View>
                <View style={groupBlock}>
                  {appointment.data.appointment.offers.length &&
                    appointment.data.appointment.offers.map((el, i) => (
                      <View
                        key={i}
                        style={[
                          borderBottom,
                          {
                            height: 60,
                            flexDirection: 'row',
                          },
                        ]}>
                        <View
                          style={{
                            flex: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <SvgUri svgXmlData={DefaultIcon} />
                          <View style={{paddingHorizontal: 5}}>
                            <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                              {el.service.name}
                            </Text>
                            <Text style={{fontSize: 10}}>
                              {el.price_by_pack.duration} час.
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 10}}>Стоимость услуги</Text>
                          <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                            {el.price_by_pack.price} руб.
                          </Text>
                        </View>
                      </View>
                    ))}
                  <TouchableOpacity
                    onPress={() => {
                      alert('Добавит новую услугу');
                    }}
                    style={{
                      height: 60,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <SvgUri svgXmlData={PlusIcon} />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        paddingLeft: 5,
                      }}>
                      Добавить услугу
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* ДАТА И ВРЕМЯ */}
            <View>
              <Text style={blockTitle}>дата и время сеанса</Text>
              <View style={[first, {flexDirection: 'row'}]}>
                <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                  {appointment.data.appointment.date.split('-')[2]}{' '}
                  {
                    shortMonthName[
                      +appointment.data.appointment.date.split('-')[1]
                    ]
                  }{' '}
                  {appointment.data.appointment.date.split('-')[0]}
                </Text>
                <Text> в {appointment.data.appointment.time.slice(0, 5)}</Text>
              </View>
            </View>
            {/* АДРЕС ПРОВЕДЕНИЯ СЕАНСА */}
            {/* <View style={{marginBottom: 20}}>
            <Text style={blockTitle}>Адрес проведения сеанса</Text>
            <View
              style={[
                first,
                {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                },
              ]}>
              <Text style={{fontSize: 10}}>!!!!!!!!!!!!</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 13, fontWeight: 'bold', flex: 1}}>
                  !!!!!!!!!!!!!!
                </Text>
                <Text style={{fontSize: 10, flex: 1}}>!!!!!!!!!!!!!!!!!</Text>
              </View>
            </View>
          </View> */}
          </View>
          {appointment.data.appointment.status === 'Pending' && (
            <View
              style={{marginBottom: 20, marginTop: 10, paddingHorizontal: 16}}>
              <Text>Итоговая стоимость сеанса</Text>
              <Text style={{fontWeight: 'bold'}}>{price} руб</Text>
            </View>
          )}
          <View style={{paddingHorizontal: 8, paddingBottom: 8}}>
            {appointment.data.appointment.status === 'Pending' && (
              <View>
                <ButtonDefault
                  style={{marginBottom: 8}}
                  active={true}
                  title="завершить сеанс"
                  onPress={() => {
                    navigation.navigate('CompleteSeance', {
                      complete: bool => {
                        setIsCompleted(bool);
                        setTimeout(() => {
                          setIsCompleted(false);
                        }, 1000);
                      },
                      price,
                      data: navigation.state.params,
                    });
                  }}
                />
                {isCompleted && (
                  <SaveSuccess title="👍 Сеанс был успешно завершён." />
                )}
                {appointment.data.appointment.status !== 'Completed' && (
                  <ButtonDefault
                    title="отменить запись"
                    onPress={() => {
                      const Canceled = 'Canceled';
                      UPDATE_PROFILE_mutation({
                        variables: {
                          variables: {
                            id: +navigation.state.params.id,
                            time: navigation.state.params.time.slice(0, 5),
                            date: navigation.state.params.date,
                            status: Canceled,
                          },
                        },
                        optimisticResponse: null,
                      })
                        .then(res => {
                          console.log(res, '__RES UPDATE_SCHEDULE_mutation');
                          navigation.state.params.complete(true);
                          navigation.goBack();
                        })
                        .catch(err =>
                          console.log(err, '__ERR UPDATE_SCHEDULE_mutation'),
                        );
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  first: {
    height: 50,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: 0.2,

    elevation: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  blockTitle: {
    fontSize: 10,
    marginTop: 20,
    marginBottom: 8,
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 8,
  },
  groupBlock: {
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: 0.2,

    elevation: 0.4,
    flexDirection: 'column',
    paddingLeft: 18,
  },
  blockInGroup: {
    height: 50,
    borderRadius: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 8,
  },
  borderBottom: {
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 0.4,
  },
});

export default NoteInformationMaster;
