import React, {useState, useEffect, useRef} from 'react';
import {ButtonDefault} from '../components/Button';
import CalendarCustom from '../components/Calendar';
import ModalWindow from '../components/ModalWindow';
import SvgUri from 'react-native-svg-uri';
import pressedIcon from '../img/Pressed.svg';
import DefaultIcon from '../img/Default.svg';
import VectorIcon from '../img/Vector.svg';
import ArrowWhiteIcon from '../img/ArrowRight.svg';
import CalendarSvgIcon from '../img/CalendarSVG.svg';
import LocationIcon from '../img/Location.svg';
import CrossWhiteIcon from '../img/CrossWhite.svg';
import {Query, useMutation, useQuery, useLazyQuery} from 'react-apollo';
import {
  GET_USER,
  FREE_TIME,
  CREATE_APPOINTMENT,
  NEXT_FREE_TIME_BY_MASTER,
  GET_APPOINTMENTS,
} from '../QUERYES';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

const shortMonthName = [
  'янв',
  'фев',
  'март',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сент',
  'окт',
  'нояб',
  'дек',
];

import BackgroundHeader from '../components/BackgroundHeader';
const screen = Dimensions.get('window');

const GalereaBlock = ({img, index, onPress}) => {
  const {galereaImgContainer,galereaImgContainerIos, galereaImg} = styles;
  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      style={Platform.OS === 'ios' ? galereaImgContainerIos : galereaImgContainer }>
      <Image
        style={galereaImg}
        source={{
          uri: img,
        }}
      />
    </TouchableOpacity>
  );
};

const BottomImgIndicator = ({index, showActiveImg}) => {
  const {bottomIndicator} = styles;
  return (
    <View
      key={index}
      style={[
        bottomIndicator,
        {
          opacity: showActiveImg == index ? 1 : 0.35,
          height: showActiveImg == index ? 10 : 7,
          width: showActiveImg == index ? 10 : 7,
        },
      ]}
    />
  );
};

const DropdownBlock = ({
  el,
  index,
  slideBlock,
  setSlideBlock,
  checkboxes,
  setCheckboxes,
  offers,
  setAllPrice,
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
            <Text
              numberOfLines={1}
              style={{
                fontWeight: 'bold',
                fontSize: 13,
                width: '95%',
              }}>
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
            <Text numberOfLines={1} style={{fontSize: 10}}>
              Стоимость услуги
            </Text>
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
              onPress={() => {
                checkboxes[index]
                  ? (checkboxes[index] = false)
                  : (checkboxes[index] = el.id);

                setCheckboxes([...checkboxes]);

                let priceSumm = 0;
                checkboxes.forEach(CH => {
                  if (CH) {
                    offers.forEach(offer => {
                      if (+offer.id === +CH) {
                        priceSumm += offer.price_by_pack.price;
                      }
                    });
                  }
                });
                setAllPrice(priceSumm);
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

const AnotherBlock = ({title, onPress}) => {
  const {blockInGroup} = styles;

  return (
    <TouchableOpacity
      style={[
        blockInGroup,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 16,
        },
      ]}
      onPress={() => onPress()}>
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
      <SvgUri svgXmlData={ArrowWhiteIcon} />
    </TouchableOpacity>
  );
};

const TimeBlock = ({time, active, onPress, style}) => {
  const {timeBlock} = styles;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        timeBlock,
        {
          backgroundColor: active ? '#B986DA' : '#fff',
        },
        style,
      ]}>
      <Text
        style={{
          color: active ? '#FFF' : '#B986DA',
          fontWeight: 'bold',
        }}>
        {time}
      </Text>
    </TouchableOpacity>
  );
};

const PublickMasterProfile = ({navigation}) => {
  const {
    container,
    galerea,
    bigImg,
    closeBtn,
    imgIndicator,
    groupBlock,
    blockInGroup,
    borderBottom,
    textTitle,
    timeBlock,
  } = styles;

  const scrollImage = useRef(null);

  const [allPhoto, setAllPhoto] = useState([]),
    [activeImg, setActiveImg] = useState(null),
    [showAllServices, setShowAllServices] = useState(false),
    [isCalendarVisible, setIsCalendarVisible] = useState(false),
    [markedDates, setMarkedDates] = useState({}),
    [isShowTime, setIsShowTime] = useState(false),
    [timeWasSelected, setTimeWasSelected] = useState(false),
    [todayInfo, setTodayInfo] = useState({});

  const onDayPress = day => {
    if (markedDates[day.dateString]) {
      setMarkedDates({});
    } else {
      setMarkedDates({
        [day.dateString]: {selected: true, selectedColor: '#B986DA'},
      });
    }
  };

  const MASTER = useQuery(GET_USER, {
      variables: {id: +navigation.state.params.id},
    }),
    APPOINTMENTS = useQuery(GET_APPOINTMENTS, {
      variables: {first: 30},
    });

  useEffect(() => {
    if (!allPhoto.length) {
      let photoArr = [];
      if (
        APPOINTMENTS.data &&
        APPOINTMENTS.data.appointments &&
        APPOINTMENTS.data.appointments.data
      ) {
        APPOINTMENTS.data.appointments.data.forEach(el => {
          if (el.photos.length) {
            el.photos.forEach(elem => {
              photoArr.push('http://194.87.145.192/storage/' + elem.src);
            });
          }
        });
      }
      setAllPhoto(photoArr);
    }
  }, [APPOINTMENTS]);

  const [services, setServices] = useState([]);

  useEffect(() => {
    MASTER.data && setServices(MASTER.data.user.offers);
  }, [MASTER]);

  const [slideBlock, setSlideBlock] = useState(
      new Array(services.length).fill(false),
    ),
    [checkboxes, setCheckboxes] = useState(
      new Array(services.length).fill(false),
    ),
    [activeTime, setActiveTime] = useState(''),
    [dates, setDates] = useState([]),
    [freeTimeByMaster, setFreeTimeByMaster] = useState([]),
    [choosedActiveTime, setChoosedActiveTime] = useState(null),
    [allPrice, setAllPrice] = useState(0),
    [CHCecked, setCHCecked] = useState(false);

  const FREETIME = useQuery(FREE_TIME, {
      variables: {
        master_id: MASTER.data && MASTER.data.user && MASTER.data.user.id,
        dates: [dates[0]],
      },
    }),
    NEXT_FREETIME = useQuery(NEXT_FREE_TIME_BY_MASTER, {
      variables: {
        master_id: MASTER.data && MASTER.data.user && MASTER.data.user.id,
        count: 3,
      },
    });

  const [CREATE_APPOINTMENT_mutation] = useMutation(CREATE_APPOINTMENT);

  useEffect(() => {
    FREETIME.data &&
      FREETIME.data.freeTimeByMaster[0] &&
      setFreeTimeByMaster(FREETIME.data.freeTimeByMaster[0].times);
  }, [FREETIME, freeTimeByMaster]);

  useEffect(() => {
    checkboxes.forEach(el => el && setCHCecked(true));
  }, [checkboxes]);

  const showMasters = masters => {
    let arr = [];
    for (let key in masters) arr.push(key);
    setDates(arr);
  };

  const CREATE = () => {
    const CH = checkboxes.filter(el => +el),
      finishCH = CH.map(el => +el);

    console.log(MASTER.data.user.id);
    console.log(dates[0]);
    console.log(activeTime);
    console.log(finishCH);

    CREATE_APPOINTMENT_mutation({
      variables: {
        id: +MASTER.data.user.id,
        date: dates[0],
        time: activeTime,
        offers_id: finishCH,
      },
      optimisticResponse: null,
    })
      .then(res => {
        setTimeWasSelected(true);

        setChoosedActiveTime(null);
        setAllPrice(0);
        setCHCecked(false);

        navigation.state.params.reload();
      })
      .catch(err =>
        console.log(JSON.stringify(err), '__ERR CREATE_APPOINTMENT'),
      );
  };

  if (MASTER.error) {
    return <Text>Err</Text>;
  } else if (MASTER.loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  } else if (MASTER.data) {
    return (
      <View style={{flex: 1}}>
        <BackgroundHeader
          navigation={navigation}
          title={MASTER.data.user.profile.name || 'Имя не задано'}
        />
        <ScrollView > 
          <View style={container}>
            {!!allPhoto.length && (
              <ScrollView  
                style={galerea}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {allPhoto.map((el, i) => 
                    <GalereaBlock
                      index={i}
                      key={i}
                      onPress={() =>  setActiveImg(i)}
                      img={el}
                    />
              )}
              </ScrollView>
            )}
            <Text style={textTitle}>Услуги</Text>
            <View style={groupBlock}>
              {!!MASTER.data.user.offers.length &&
                MASTER.data.user.offers.map((el, i) => {
                  if (i < 3) {
                    return (
                      <View key={i}>
                        <DropdownBlock
                          index={i}
                          el={el}
                          offers={MASTER.data.user.offers}
                          active={false}
                          slideBlock={slideBlock}
                          setSlideBlock={setSlideBlock}
                          checkboxes={checkboxes}
                          setCheckboxes={setCheckboxes}
                          setAllPrice={setAllPrice}
                        />
                      </View>
                    );
                  }
                })}
              <AnotherBlock
                title="Посмотреть все услуги"
                onPress={() => setShowAllServices(true)}
              />
            </View>
            <Text style={textTitle}>ближайшее свободное время</Text>
            <View style={groupBlock}>
              <View
                style={[
                  blockInGroup,
                  borderBottom,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 8,
                  },
                ]}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SvgUri width="13" height="13" svgXmlData={CalendarSvgIcon} />
                  {!!NEXT_FREETIME.data &&
                    !!NEXT_FREETIME.data.nextFreeTimeByMaster &&
                    !!NEXT_FREETIME.data.nextFreeTimeByMaster.length && (
                      <Text style={{fontWeight: 'bold'}}>
                        {
                          NEXT_FREETIME.data.nextFreeTimeByMaster[0].date.split(
                            '-',
                          )[2]
                        }{' '}
                        {
                          shortMonthName[
                            +NEXT_FREETIME.data.nextFreeTimeByMaster[0].date.split(
                              '-',
                            )[1] - 1
                          ]
                        }{' '}
                        {
                          NEXT_FREETIME.data.nextFreeTimeByMaster[0].date.split(
                            '-',
                          )[0]
                        }
                      </Text>
                    )}
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}>
                  {!!NEXT_FREETIME.data &&
                    !!NEXT_FREETIME.data.nextFreeTimeByMaster.length &&
                    !!NEXT_FREETIME.data.nextFreeTimeByMaster[0].times.length &&
                    NEXT_FREETIME.data.nextFreeTimeByMaster[0].times.map(
                      (el, i) => {
                        return (
                          <TimeBlock
                            key={i}
                            style={{width: '30%'}}
                            time={el}
                            active={choosedActiveTime === i}
                            onPress={() => {
                              setChoosedActiveTime(i);
                              setDates([
                                NEXT_FREETIME.data.nextFreeTimeByMaster[0].date,
                              ]);
                              setActiveTime(el);
                            }}
                          />
                        );
                      },
                    )}
                </View>
              </View>
              <AnotherBlock
                title="Выбрать другое время"
                onPress={() => setIsCalendarVisible(true)}
              />
            </View>
            <Text style={textTitle}>адрес мастера</Text>
            <View style={groupBlock}>
              <View style={[blockInGroup, {flexDirection: 'row'}]}>
                <SvgUri svgXmlData={LocationIcon} style={{marginRight: 8}} />
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                    {MASTER.data.user.profile.work_address || 'Адрес не указан'}
                    ,{' '}
                    {(MASTER.data.user.profile.city &&
                      MASTER.data.user.profile.city.name) ||
                      'город не указан'}
                  </Text>
                  {/* <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <View
                      style={{
                        height: 4,
                        width: 4,
                        backgroundColor: '#9155FF',
                        borderRadius: 4,
                        marginRight: 5,
                      }}
                    />
                    <Text style={{fontSize: 13}}>?metro?</Text>
                  </View> */}
                </View>
              </View>
            </View>
            <Text style={textTitle}> О мастере</Text>
            <View style={[groupBlock, blockInGroup, {marginBottom: 30}]}>
              <Text
                style={{
                  fontSize: 13,
                  width: '100%',
                  marginRight: 16,
                }}>
                {MASTER.data.user.profile.about_me}
              </Text>
            </View>

            {allPrice && CHCecked && activeTime ? (
              <ButtonDefault
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
                title="Подтвердить запись"
                rightTitle={allPrice + ' руб'}
                onPress={() => CREATE()}
                active={true}
              />
            ) : (
              <ButtonDefault
                style={{flexDirection: 'row', justifyContent: 'space-around'}}
                title="Вы не указали детали сеанса"
                onPress={() => {}}
                active={true}
              />
            )}
          </View>
          
        </ScrollView>
        {(activeImg || activeImg === 0 || activeImg === '0') && (
          <View style={bigImg}>
            <ScrollView
              scrollEventThrottle={16}
              ref={scrollImage}
              showsHorizontalScrollIndicator={false}
              onScroll = {(event)=>
                setActiveImg((event.nativeEvent.contentOffset.x/screen.width).toFixed())
           }
              horizontal={true}
              pagingEnabled={true}>
              {allPhoto.map((el, i) => {
                setTimeout(() => {
                  scrollImage.current.scrollTo({
                    x: screen.width * activeImg,animated : false
                  });
                }, 0);
                return (
                  <View key={i}>
                    <Image
                      style={{
                        height: screen.height,
                        width: screen.width,
                        resizeMode: 'cover',
                      }}
                      source={{uri: el}}
                    />
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={closeBtn}
              onPress={() => setActiveImg(null)}>
              <SvgUri svgXmlData={CrossWhiteIcon} />
            </TouchableOpacity>
            {/* bottom dots */}
            <View style={imgIndicator}>
              {allPhoto.map((el, i) => {
                return (
                  <BottomImgIndicator
                    key={i}
                    showActiveImg={activeImg}
                    index={i}
                  />
                );
              })}
            </View>
          </View>
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
                  {!!MASTER.data.user.offers.length &&
                    MASTER.data.user.offers.map((el, i) => {
                      return (
                        <View key={i}>
                          <DropdownBlock
                            index={i}
                            el={el}
                            offers={MASTER.data.user.offers}
                            slideBlock={slideBlock}
                            setSlideBlock={setSlideBlock}
                            checkboxes={checkboxes}
                            setCheckboxes={setCheckboxes}
                            setAllPrice={setAllPrice}
                          />
                        </View>
                      );
                    })}
                </ScrollView>
                <ButtonDefault
                  onPress={() => setShowAllServices(false)}
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
        {isCalendarVisible && (
          <CalendarCustom
            todayInfo={info => setTodayInfo(info)}
            singleDate={true}
            markedDates={markedDates}
            onDayPress={onDayPress}
            onClose={setIsCalendarVisible}
            clearCalendar={setMarkedDates}
            chooseThisDate={setIsShowTime}
            showMasters={showMasters}
          />
        )}
        {isShowTime && (
          <ModalWindow style={{padding: 0, paddingBottom: 24}}>
            <View
              style={{
                backgroundColor: '#C092DE',
                height: 38,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
              }}>
              <Text style={{color: '#fff'}}>
                {todayInfo.dayOfWeek}, {todayInfo.date}{' '}
                {todayInfo.monthName.toLowerCase()}
              </Text>
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 16,
                marginHorizontal: 24,
              }}>
              Доступное время для записи
            </Text>
            {FREETIME.loading && (
              <ActivityIndicator size="large" color="#00ff00" />
            )}
            {FREETIME.error && <Text />}

            {!freeTimeByMaster.length && (
              <Text>Нет свободного времени на данный день</Text>
            )}

            {FREETIME.data && (
              <View
                style={{
                  marginBottom: 16,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginHorizontal: 24,
                }}>
                {!!freeTimeByMaster.length &&
                  freeTimeByMaster.map((el, i) => (
                    <TimeBlock
                      key={i}
                      onPress={() => setActiveTime(el)}
                      style={{marginBottom: 8}}
                      time={el}
                      active={activeTime === el ? true : false}
                    />
                  ))}
              </View>
            )}

            <View style={{width: '100%'}}>
              {!!freeTimeByMaster.length && (
                <ButtonDefault
                  style={{marginBottom: 8, marginHorizontal: 24}}
                  onPress={() => setIsShowTime(false)}
                  title="Выбрать это время"
                  active={true}
                />
              )}

              <ButtonDefault
                style={{marginHorizontal: 24}}
                onPress={() => {
                  setIsShowTime(false);
                  setActiveTime([]);
                }}
                title="закрыть"
              />
            </View>
          </ModalWindow>
        )}
        {timeWasSelected && (
          <ModalWindow>
            <Text>Вы записаны</Text>
            <Text>
              на{' '}
              <Text style={{fontWeight: 'bold'}}>
                {dates[0] && dates[0].split('-')[2]}{' '}
                {dates[0] && shortMonthName[+dates[0].split('-')[1]]}{' '}
                {dates[0] && dates[0].split('-')[0]}
              </Text>{' '}
              в {activeTime} к мастеру
            </Text>
            <Image
              style={{marginTop: 16}}
              source={require('../img/girl1.png')}
            />
            <Text style={{fontWeight: 'bold', marginVertical: 16}}>
              {MASTER.data.user.profile.name}
            </Text>
            <View style={{width: '100%'}}>
              <ButtonDefault
                style={{marginBottom: 8}}
                title="спасибо, закрыть окно"
                active={true}
                onPress={() => {
                  setDates([]);
                  setActiveTime('');
                  setCheckboxes([]);
                  setTimeWasSelected(false);
                }}
              />
              <ButtonDefault
                title="перейти к настройкам аккаунта"
                onPress={() => setTimeWasSelected(false)}
              />
            </View>
          </ModalWindow>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  likeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: 50,
    height: 30,
    borderRadius: 30,
  },
  container: {
    padding: 8,
    backgroundColor: '#FAFAFA',
  },
  galerea: {
    height: 216,
    marginVertical: 8,
  },
  bigImg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  closeBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 21,
    top: 53,
  },
  imgIndicator: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 41,
  },
  groupBlock: {
    marginTop: 10,
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 1,
    flexDirection: 'column',
    paddingLeft: 18,
    backgroundColor: '#fff',
  },
  blockInGroup: {
    paddingVertical: 16,
    borderRadius: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  galereaImgContainer: {
    borderRadius: 3,
    elevation: 1,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    height: 216,
    width: 166,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 2,
  },
  galereaImgContainerIos: {
    borderRadius: 3,
    shadowColor: '#000',
    shadowOpacity: 0.01,
    shadowRadius: 0.1,
    height: 216,
    width: 166,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 2,
  },
  galereaImg: {
    height: 200,
    width: 150,
    borderRadius: 3,
  },
  bottomIndicator: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  textTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#011627',
    opacity: 0.35,
    marginTop: 16,
    paddingLeft: 8,
  },
  timeBlock: {
    width: '20%',
    height: 33,
    borderRadius: 2,
    borderColor: '#B986DA',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderRadius: 2,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#DFDFE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PublickMasterProfile;
