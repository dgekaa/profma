import React, {useState, useEffect, useRef} from 'react';
import {ButtonDefault} from '../components/Button';
import CalendarCustom from '../components/Calendar';
import ModalWindow from '../components/ModalWindow';
import SvgUri from 'react-native-svg-uri';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import BackgroundHeader from '../components/BackgroundHeader';
const screen = Dimensions.get('window');

const GalereaBlock = ({img, index, onPress}) => {
  const {galereaImgContainer, galereaImg} = styles;
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(index);
      }}
      style={galereaImgContainer}>
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
              <SvgUri
                source={require('../img/Pressed.svg')}
                style={{marginRight: 8}}
              />
            )}
            {!slideBlock[index] && (
              <SvgUri
                source={require('../img/Default.svg')}
                style={{
                  marginRight: 8,
                }}
              />
            )}
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>{el.name}</Text>
            <Text style={{fontSize: 10}}>
              {el.how_long} {plural(el.how_long, ['час', 'часа', 'часов'])}
            </Text>
          </View>
        </View>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 7}}>
            <Text style={{fontSize: 10}}>Стоимость услуги</Text>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              {el.how_mach} руб
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
                  : (checkboxes[index] = true);
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
                <SvgUri source={require('../img/Vector.svg')} />
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
      onPress={() => {
        onPress();
      }}>
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
      <SvgUri source={require('../img/ArrowRight.svg')} />
    </TouchableOpacity>
  );
};

const TimeBlock = ({time, active, onPress, style}) => {
  const {timeBlock} = styles;
  return (
    <TouchableOpacity
      onPress={() => {}}
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
  // const timeBlockRef = useRef();

  // const [allPhoto, setAllPhoto] = useState([]);

  useEffect(() => {
    const arr = [];
    navigation.state.params.my_notes.forEach((el, i) => {
      if (el.photo && el.photo.length) {
        el.photo.forEach(el => {
          arr.push(el);
        });
      }
    });
    setImgArr([...arr]);
  }, []);

  const [activeImg, setActiveImg] = useState(null);
  const [imgArr, setImgArr] = useState([]);
  const [y, setY] = useState(null);

  const [showAllServices, setShowAllServices] = useState(false);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  const [isShowTime, setIsShowTime] = useState(false);
  const [timeWasSelected, setTimeWasSelected] = useState(false);

  const [todayInfo, setTodayInfo] = useState({});

  const onDayPress = day => {
    if (markedDates[day.dateString]) {
      setMarkedDates({});
    } else {
      setMarkedDates({
        [day.dateString]: {selected: true, selectedColor: '#B986DA'},
      });
    }
  };

  const [services, setServices] = useState(navigation.state.params.my_services);
  const [slideBlock, setSlideBlock] = useState(
    new Array(services.length).fill(false),
  );
  const [checkboxes, setCheckboxes] = useState(
    new Array(services.length).fill(false),
  );

  console.log(navigation.state.params, 'navigation.state.params');

  const endPrice = checkboxes.map((el, i) => {
    if (el) {
      return navigation.state.params.my_services[i].how_mach;
    }
  });
  const endPrice2 = endPrice.filter((el, i) => {
    return el;
  });

  const endPrice3 =
    endPrice2.length && endPrice2.reduce((a, b) => Number(a) + Number(b));

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title="Людмила Заглубоцкая"
        description={navigation.state.params.skills}
      />
      <ScrollView>
        <View style={container}>
          {!!imgArr.length && (
            <ScrollView
              style={galerea}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {imgArr.map((el, i) => (
                <GalereaBlock
                  index={i}
                  key={i}
                  onPress={() => {
                    setActiveImg(i);
                  }}
                  img={el}
                />
              ))}
            </ScrollView>
          )}
          <Text style={textTitle}>Услуги</Text>
          <View style={groupBlock}>
            {services.map((el, i) => {
              if (i < 3) {
                return (
                  <View key={i}>
                    <DropdownBlock
                      index={i}
                      el={el}
                      active={false}
                      slideBlock={slideBlock}
                      setSlideBlock={setSlideBlock}
                      checkboxes={checkboxes}
                      setCheckboxes={setCheckboxes}
                    />
                  </View>
                );
              }
            })}
            <AnotherBlock
              title="Посмотреть все услуги"
              onPress={() => {
                setShowAllServices(true);
              }}
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
                <SvgUri
                  width="13"
                  height="13"
                  source={require('../img/CalendarSVG.svg')}
                />
                <Text style={{fontWeight: 'bold'}}>25 июн 2019 !!!!!!!!!!</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                <TimeBlock
                  style={{width: '30%'}}
                  time="12:00"
                  active={true}
                  onPress={() => {}}
                />
                <TimeBlock
                  style={{width: '30%'}}
                  time="!!!!!!!"
                  active={false}
                  onPress={() => {}}
                />
                <TimeBlock
                  style={{width: '30%'}}
                  time="14:00"
                  active={false}
                  onPress={() => {}}
                />
              </View>
            </View>
            <AnotherBlock
              title="Выбрать другое время"
              onPress={() => {
                setIsCalendarVisible(true);
              }}
            />
          </View>
          <Text style={textTitle}>адрес мастера</Text>
          <View style={groupBlock}>
            <View style={[blockInGroup, {flexDirection: 'row'}]}>
              <SvgUri
                source={require('../img/Location.svg')}
                style={{marginRight: 8}}
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                  {navigation.state.params.city},{' '}
                  {navigation.state.params.address}
                </Text>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 4,
                      width: 4,
                      backgroundColor: '#9155FF',
                      borderRadius: 4,
                      marginRight: 5,
                    }}
                  />
                  <Text style={{fontSize: 13}}>
                    {navigation.state.params.metro}
                  </Text>
                </View>
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
                backgrounColor: 'green',
              }}>
              {navigation.state.params.about_me}
            </Text>
          </View>
          <ButtonDefault
            style={{flexDirection: 'row', justifyContent: 'space-between'}}
            title="Подтвердить запись"
            rightTitle={endPrice3 + ' руб'}
            onPress={() => {
              alert('Подтвердить');
            }}
            active={true}
          />
        </View>
      </ScrollView>
      {(activeImg || activeImg === 0 || activeImg === '0') && (
        <View style={bigImg}>
          <ScrollView
            onScroll={event => {
              // setY(
              //   Math.round(event.nativeEvent.contentOffset.x / screen.width),
              // );
            }}
            ref={scrollImage}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            {imgArr.map((el, i) => {
              setTimeout(() => {
                scrollImage.current.scrollTo({
                  x: screen.width * activeImg,
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
            onPress={() => {
              setActiveImg(null);
            }}>
            <SvgUri source={require('../img/CrossWhite.svg')} />
          </TouchableOpacity>
          <View style={imgIndicator}>
            {imgArr.map((el, i) => {
              return (
                <BottomImgIndicator
                  key={i}
                  showActiveImg={y || activeImg}
                  index={i}
                />
              );
            })}
          </View>
        </View>
      )}
      {showAllServices && (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowAllServices(false);
          }}>
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
                {services.map((el, i) => {
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
                onPress={() => {
                  setShowAllServices(false);
                }}
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
          todayInfo={info => {
            setTodayInfo(info);
          }}
          singleDate={true}
          markedDates={markedDates}
          onDayPress={onDayPress}
          onClose={setIsCalendarVisible}
          clearCalendar={setMarkedDates}
          chooseThisDate={setIsShowTime}
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
          <View
            style={{
              marginBottom: 16,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginHorizontal: 24,
            }}>
            <TimeBlock
              style={{marginBottom: 8}}
              time="13:00"
              active={false}
              onPress={() => {}}
            />
            <TimeBlock
              style={{marginBottom: 8}}
              time="13:00"
              active={true}
              onPress={() => {}}
            />
            <TimeBlock
              style={{marginBottom: 8}}
              time="13:00"
              active={false}
              onPress={() => {}}
            />
            <TimeBlock
              style={{marginBottom: 8}}
              time="13:00"
              active={false}
              onPress={() => {}}
            />
            <TimeBlock
              style={{marginBottom: 8}}
              time="13:00"
              active={false}
              onPress={() => {}}
            />
          </View>
          <View style={{width: '100%'}}>
            <ButtonDefault
              style={{marginBottom: 8, marginHorizontal: 24}}
              onPress={() => {
                setIsShowTime(false);
                setTimeWasSelected(true);
              }}
              title="Выбрать это время"
              active={true}
            />
            <ButtonDefault
              style={{marginHorizontal: 24}}
              onPress={() => {
                setIsShowTime(false);
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
            на <Text style={{fontWeight: 'bold'}}>25 июн 2019 !!!!</Text> в
            10:00 к мастеру
          </Text>
          <Image style={{marginTop: 16}} source={require('../img/girl1.png')} />
          <Text style={{fontWeight: 'bold', marginVertical: 16}}>
            Людмила Заглубоцкая
          </Text>
          <View style={{width: '100%'}}>
            <ButtonDefault
              style={{marginBottom: 8}}
              title="спасибо, закрыть окно"
              active={true}
              onPress={() => {
                setTimeWasSelected(false);
              }}
            />
            <ButtonDefault
              title="перейти к настройкам аккаунта"
              onPress={() => {
                setTimeWasSelected(false);
              }}
            />
          </View>
        </ModalWindow>
      )}
    </View>
  );
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
