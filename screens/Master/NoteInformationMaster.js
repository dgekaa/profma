import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';
import DefaultIcon from '../../img/Default.svg';
import PlusIcon from '../../img/Plus.svg';
import {Query, useMutation, useQuery} from 'react-apollo';
import VectorIcon from '../../img/Vector.svg';
import pressedIcon from '../../img/Pressed.svg';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';
import {
  GET_USER,
  GET_APPOINTMENT,
  UPDATE_PROFILE,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT_ADD_OFFERS,
  ME,
} from '../../QUERYES';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
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

const DropdownBlock = ({
  el,
  index,
  slideBlock,
  setSlideBlock,
  checkboxes,
  setCheckboxes,
}) => {
  const {blockInGroup, borderBottom, checkbox} = styles;

  function plural(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  return (
    <TouchableOpacity
      style={[blockInGroup, borderBottom]}
      onPress={() => {
        slideBlock[index]
          ? (slideBlock[index] = false)
          : (slideBlock[index] = true);
        setSlideBlock([...slideBlock]);
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
          <View>
            {slideBlock[index] && (
              <SvgUri svgXmlData={pressedIcon} style={{marginRight: 8}} />
            )}
            {!slideBlock[index] && (
              <SvgUri
                svgXmlData={DefaultIcon}
                style={{
                  marginRight: 8,
                }}
              />
            )}
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              {el.service.name}
            </Text>
            <Text style={{fontSize: 10}}>
              {el.price_by_pack.duration}{' '}
              {plural(el.price_by_pack.duration, ['час', 'часа', 'часов'])}
            </Text>
          </View>
        </View>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 7}}>
            <Text style={{fontSize: 10}}>Стоимость услуги</Text>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              {el.price_by_pack.price} руб
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                marginRight: 8,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={e => {
                checkboxes[index]
                  ? (checkboxes[index] = false)
                  : (checkboxes[index] = el.id);
                setCheckboxes([...checkboxes]);
              }}>
              <View
                style={[
                  checkbox,
                  {
                    backgroundColor: checkboxes[index] ? '#B986DA' : '#fff',
                    borderWidth: checkboxes[index] ? 0 : 3,
                  },
                ]}>
                <SvgUri svgXmlData={VectorIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {slideBlock[index] && (
        <View
          style={{
            paddingTop: 8,
            paddingRight: 8,
            width: '100%',
          }}>
          <Text style={{fontSize: 13}}>{el.description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

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
    variables: {id: +navigation.state.params.el.id},
  });

  const refreshObject = {
    refetchQueries: [
      {
        query: ME,
        variables: {},
      },
    ],
    awaitRefetchQueries: true,
  };

  const refreshAppointment = {
    refetchQueries: [
      {
        query: GET_APPOINTMENT,
        variables: {id: +navigation.state.params.el.id},
      },
    ],
    awaitRefetchQueries: true,
  };

  const [DELETE_APPOINTMENT_mutation] = useMutation(
    DELETE_APPOINTMENT,
    refreshObject,
  );

  const MASTER = useQuery(ME, {
    variables: {},
  });

  const [UPDATE_APPOINTMENT_ADD_OFFERS_mutation] = useMutation(
    UPDATE_APPOINTMENT_ADD_OFFERS,
    refreshAppointment,
  );

  console.log(MASTER, '____MASTER_____');

  const CANCEL = () => {
    DELETE_APPOINTMENT_mutation({
      variables: {
        id: +navigation.state.params.el.id,
      },
      optimisticResponse: null,
    })
      .then(res => {
        console.log(res, 'RES RES DELETE');
        navigation.state.params.refetch();
        navigation.goBack();
      })
      .catch(err => console.log(err, '__ERR DELETE_APPOINTMENT_mutation'));
  };

  useEffect(() => {
    console.log(appointment, '__appointment');
  }, [appointment]);

  useEffect(() => {
    if (appointment.data && appointment.data.appointment) {
      let count = 0;
      appointment.data.appointment.offers.length &&
        appointment.data.appointment.offers.forEach((el, i) => {
          count += el.price_by_pack.price;
        });
      setPrice(count);
    }
  }, [appointment]);

  const [services, setServices] = useState([]);
  const [showAllServices, setShowAllServices] = useState(false);

  useEffect(() => {
    MASTER.data && setServices(MASTER.data.me.offers);
  }, [MASTER]);

  const [slideBlock, setSlideBlock] = useState(
    new Array(services.length).fill(false),
  );
  const [checkboxes, setCheckboxes] = useState(
    new Array(services.length).fill(false),
  );

  const ADD = () => {
    console.log(appointment.data.appointment, 'lllll');
    console.log(checkboxes, 'checkboxes');
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    checkboxes.forEach(el => {
      el &&
        UPDATE_APPOINTMENT_ADD_OFFERS_mutation({
          variables: {
            id: +appointment.data.appointment.id,
            offersid: +el,
          },
          optimisticResponse: null,
        })
          .then(res => {
            console.log(res, 'RES UPDATE_APPOINTMENT_ADD_OFFERS');
            appointment.refetch();
            setCheckboxes([]);
            setShowAllServices(false);
          })
          .catch(err =>
            console.log(err, '__ERR UPDATE_APPOINTMENT_ADD_OFFERS'),
          );
    });
  };

  return (
    <View style={{flex: 1}}>
      {appointment.data &&
        console.log(appointment.data, '++ appointment.data.appointment')}
      <BackgroundHeader
        navigation={navigation}
        title={
          appointment.data &&
          appointment.data.appointment &&
          appointment.data.appointment.status === 'Completed'
            ? 'Сеанс завершён'
            : 'Запись оформлена'
        }
      />
      {appointment.loading && (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
      {appointment.data && appointment.data.appointment && (
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
                  {!!appointment.data.appointment.offers &&
                    !!appointment.data.appointment.offers.length &&
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
                    onPress={() => setShowAllServices(true)}
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
          {appointment.data.appointment &&
            appointment.data.appointment.status === 'Pending' && (
              <View
                style={{
                  marginBottom: 20,
                  marginTop: 10,
                  paddingHorizontal: 16,
                }}>
                <Text>Итоговая стоимость сеанса</Text>
                <Text style={{fontWeight: 'bold'}}>{price} руб</Text>
              </View>
            )}
          <View style={{paddingHorizontal: 8, paddingBottom: 8}}>
            {appointment.data.appointment &&
              appointment.data.appointment.status === 'Pending' && (
                <View>
                  {console.log(appointment, 'APP')}
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
                        data: navigation.state.params.el,
                        refetch: appointment.refetch,
                      });
                    }}
                  />
                  {isCompleted && (
                    <SaveSuccess title="👍 Сеанс был успешно завершён." />
                  )}

                  {appointment.data.appointment &&
                    appointment.data.appointment.status !== 'Completed' && (
                      <ButtonDefault
                        title="отменить запись"
                        onPress={() => CANCEL()}
                      />
                    )}
                </View>
              )}
          </View>
        </ScrollView>
      )}
      {showAllServices && (
        <TouchableWithoutFeedback onPress={() => setShowAllServices(false)}>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.2)',
              justifyContent: 'flex-end',
            }}>
            <View style={{height: '70%', backgroundColor: '#fff'}}>
              <Text
                style={{
                  backgroundColor: '#fafafa',
                  height: 40,
                  fontSize: 10,
                  textTransform: 'uppercase',
                  color: '#011627',
                  opacity: 0.35,
                  lineHeight: 40,
                  paddingLeft: 8,
                }}>
                Все услуги
              </Text>
              <ScrollView style={{paddingHorizontal: 8}}>
                {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
                {MASTER.data &&
                  !!MASTER.data.me.offers.length &&
                  MASTER.data.me.offers.map((el, i) => {
                    return (
                      <View key={i}>
                        <DropdownBlock
                          index={i}
                          el={el}
                          slideBlock={slideBlock}
                          setSlideBlock={setSlideBlock}
                          checkboxes={checkboxes}
                          setCheckboxes={setCheckboxes}
                        />
                      </View>
                    );
                  })}
              </ScrollView>
              <ButtonDefault
                onPress={() => ADD()}
                title={
                  'Выбрать эти услуги (' +
                  checkboxes.filter(el => el).length +
                  ')'
                }
                active={true}
                style={{margin: 8}}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
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
