import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';
import ModalWindow from '../../components/ModalWindow';
import SvgUri from 'react-native-svg-uri';
import DefaultIcon from '../../img/Default.svg';
import {Query, useMutation, useQuery} from 'react-apollo';
import PlusIcon from '../../img/Plus.svg';
import VectorIcon from '../../img/Vector.svg';
import {shortMonthName} from '../../constants';

import {
  GET_APPOINTMENT,
  DELETE_APPOINTMENT,
  ME,
  UPDATE_APPOINTMENT_ADD_OFFERS,
} from '../../QUERYES';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

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

const NoteInformation = ({navigation}) => {
  const {first, firstIos, text, blockTitle, groupBlock, groupBlockIos} = styles;

  const [cancelNote, setCancelNote] = useState(false),
    [canceledNote, setCanceledNote] = useState(false);

  const appointment = useQuery(GET_APPOINTMENT, {
    variables: {id: +navigation.state.params.person.id},
  });

  const refreshObject = {
    refetchQueries: [
      {
        query: GET_APPOINTMENT,
        variables: {id: +navigation.state.params.person.master.id},
      },
      {
        query: ME,
        variables: {},
      },
    ],
    awaitRefetchQueries: true,
  };

  const [DELETE_APPOINTMENT_mutation] = useMutation(
    DELETE_APPOINTMENT,
    refreshObject,
  );

  const isActive = true,
    isCompleted = false,
    isAbort = false;

  const CANCEL = () => {
    DELETE_APPOINTMENT_mutation({
      variables: {
        id: +navigation.state.params.person.id,
      },
      optimisticResponse: null,
    })
      .then(res => {
        navigation.state.params.reload();
        navigation.goBack();
        console.log(res, '__res DELETE_APPOINTMENT_mutation');
      })
      .catch(err => console.log(err, '__ERR DELETE_APPOINTMENT_mutation'));
  };

  const [services, setServices] = useState([]),
    [showAllServices, setShowAllServices] = useState(false);

  useEffect(() => {
    navigation.state.params.person.master.offers &&
      setServices(navigation.state.params.person.master.offers);
  }, [navigation.state.params.person.master.offers]);

  const [slideBlock, setSlideBlock] = useState(
    new Array(services.length).fill(false),
  );
  const [checkboxes, setCheckboxes] = useState(
    new Array(services.length).fill(false),
  );

  const [UPDATE_APPOINTMENT_ADD_OFFERS_mutation] = useMutation(
    UPDATE_APPOINTMENT_ADD_OFFERS,
    refreshObject,
  );

  const ADD = () => {
    checkboxes.forEach(el => {
      el
        ? UPDATE_APPOINTMENT_ADD_OFFERS_mutation({
            variables: {
              id: +appointment.data.appointment.id,
              offersid: +el,
            },
            optimisticResponse: null,
          })
            .then(res => {
              appointment.refetch();
              setCheckboxes([]);
              setShowAllServices(false);
            })
            .catch(err =>
              console.log(err, '__ERR UPDATE_APPOINTMENT_ADD_OFFERS'),
            )
        : setShowAllServices(false);
    });
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title={isAbort ? `Запись к мастеру завершена` : `Вы записаны к мастеру`}
      />
      <ScrollView style={{}}>
        <View style={{flex: 1, paddingHorizontal: 8, paddingTop: 15}}>
          <View style={Platform.OS === 'ios' ? firstIos : first}>
            <Text style={text}>
              {navigation.state.params.person.master.profile.name}
            </Text>
          </View>
          {/* УСЛУГИ */}
          <View style={{}}>
            <Text style={blockTitle}>Услуги</Text>
            <View>
              <View style={Platform.OS === 'ios' ? groupBlockIos : groupBlock}>
                {navigation.state.params.person.offers &&
                  navigation.state.params.person.offers.length &&
                  navigation.state.params.person.offers.map((el, i) => (
                    <View
                      key={i}
                      style={[
                        {
                          height: 60,
                          flexDirection: 'row',
                        },
                        navigation.state.params.person.offers.length - 1 === i
                          ? {}
                          : {
                              borderBottomColor: 'rgba(0,0,0,0.2)',
                              borderBottomWidth: 0.3,
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
                          paddingRight: 16,
                        }}>
                        <Text style={{fontSize: 10, textAlign: 'right'}}>
                          Стоимость услуги
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            textAlign: 'right',
                          }}>
                          {el.price_by_pack.price} руб
                        </Text>
                      </View>
                    </View>
                  ))}
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
          {/* ДАТА И ВРЕМЯ */}
          <View>
            <Text style={blockTitle}>дата и время сеанса</Text>
            <View
              style={[
                Platform.OS === 'ios' ? firstIos : first,
                {flexDirection: 'row'},
              ]}>
              <Text style={{fontWeight: 'bold'}}>
                {navigation.state.params.person.date.split('-')[2]}{' '}
                {
                  shortMonthName[
                    +navigation.state.params.person.date.split('-')[1]
                  ]
                }{' '}
                {navigation.state.params.person.date.split('-')[0]}
              </Text>
              <Text> в {navigation.state.params.person.time.slice(0, 5)}</Text>
            </View>
          </View>
          {/* АДРЕС ПРОВЕДЕНИЯ СЕАНСА */}
          {/* <View style={{marginBottom: 20}}>
            <Text style={blockTitle}>Адрес проведения сеанса</Text>
            <View
              style={[
                Platform.OS === 'ios' ? firstIos : first,
                {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                },
              ]}>
              <Text>У мастера на дому ? !!!!</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 10, flex: 1}}>!!!!!!!!!</Text>
              </View>
            </View>
          </View> */}
        </View>
        {isActive ||
          (isAbort && (
            <View style={{marginBottom: 20, paddingHorizontal: 8}}>
              <Text>Итоговая стоимость сеанса</Text>
              <Text style={{fontWeight: 'bold'}}>!!!!!!!!!! руб.</Text>
            </View>
          ))}
      </ScrollView>
      <View style={{paddingHorizontal: 8, paddingBottom: 8}}>
        {isCompleted && (
          <ButtonDefault
            title="Повторить запись"
            onPress={() => {
              alert('Будет повтор записи');
            }}
          />
        )}
        {isActive && (
          <ButtonDefault
            title="Хочу отменить запись к мастеру"
            onPress={() => setCancelNote(true)}
          />
        )}
      </View>
      {cancelNote && (
        <ModalWindow>
          <Text style={{width: '70%', textAlign: 'center', fontSize: 13}}>
            Вы собираетесь отменить запись на
            <Text style={{fontWeight: 'bold'}}> дата</Text>в время к мастеру
          </Text>
          <Text style={{paddingVertical: 8, fontWeight: 'bold', fontSize: 13}}>
            <Text style={text}>
              {navigation.state.params.person.master.profile.name}
            </Text>
          </Text>
          <Image source={require('../../img/girl5.png')} />
          <Text style={{paddingVertical: 8, fontSize: 13}}>
            Вы уверены в своём решении?
          </Text>
          <View style={{width: '100%'}}>
            <ButtonDefault
              title="нет, не отменять запись"
              active={true}
              style={{marginVertical: 8}}
              onPress={() => setCancelNote(false)}
            />
            <ButtonDefault
              title="отменить запись к мастеру"
              onPress={() => CANCEL()}
            />
          </View>
        </ModalWindow>
      )}
      {canceledNote && (
        <ModalWindow>
          <Text style={{width: '85%', textAlign: 'center', fontSize: 13}}>
            Ваша запись успешно отменена.
          </Text>
          <View style={{width: '100%', marginTop: 16}}>
            <ButtonDefault
              title="Благодарю"
              onPress={() => {
                setCanceledNote(false);
              }}
            />
          </View>
        </ModalWindow>
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
                {navigation.state.params.person.master.offers &&
                  !!navigation.state.params.person.master.offers.length &&
                  navigation.state.params.person.master.offers.map((el, i) => {
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
    borderRadius: 0.2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  firstIos: {
    height: 50,
    borderRadius: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  text: {
    fontSize: 15,
    fontFamily: 'FuturaPT-Bold',
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
    borderRadius: 0.2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 0.4,
    flexDirection: 'column',
    paddingLeft: 18,
  },
  groupBlockIos: {
    borderRadius: 0.2,
    flexDirection: 'column',
    paddingLeft: 18,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});

export default NoteInformation;
