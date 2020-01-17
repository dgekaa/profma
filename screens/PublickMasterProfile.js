import React, {useState, useEffect, useRef} from 'react';
import {ButtonDefault} from '../components/Button';
import CalendarCustom from '../components/Calendar';
import ModalWindow from '../components/ModalWindow';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Text,
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
      ]}></View>
  );
};

const DropdownBlock = ({slideBlock, setSlideBlock, active}) => {
  const {blockInGroup, borderBottom} = styles;

  return (
    <TouchableOpacity
      style={[blockInGroup, borderBottom]}
      onPress={() => {
        slideBlock[0] ? setSlideBlock([false]) : setSlideBlock([true]);
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
          <View>
            {slideBlock[0] && (
              <Image
                source={require('../img/Pressed.png')}
                style={{marginRight: 8}}
              />
            )}
            {!slideBlock[0] && (
              <Image
                source={require('../img/Default.png')}
                style={{marginRight: 8}}
              />
            )}
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              Аппаратный маникюр
            </Text>
            <Text style={{fontSize: 10}}>1 час</Text>
          </View>
        </View>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 7}}>
            <Text style={{fontSize: 10}}>Стоимость услуги</Text>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>от 1 250 руб</Text>
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{
                marginRight: 8,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  backgroundColor: active ? '#B986DA' : '#fff',
                  borderWidth: 3,
                  borderWidth: active ? 0 : 3,
                  borderColor: '#DFDFE4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={require('../img/Vector.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {slideBlock[0] && (
        <View style={{paddingTop: 8, paddingRight: 8}}>
          <Text style={{fontSize: 13}}>
            Не обрезной маникюр, в результате которого кутикула удаляется при
            помощи шлифовки специальным аппаратом с различными видами насадок.
          </Text>
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
      <Image source={require('../img/ArrowRight.png')} />
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

  const [activeImg, setActiveImg] = useState(null);
  const [imgArr, setImgArr] = useState([
    'https://i.pinimg.com/736x/c8/fe/ff/c8feff7244af6a4d982447c5845ce08c.jpg',
    'https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg',
    'https://zhurnal-lady.com/wp-content/uploads/2018/12/4-15.jpg',
  ]);
  const [y, setY] = useState(null);
  const [slideBlock, setSlideBlock] = useState([false]);

  const [showAllServices, setShowAllServices] = useState(false);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  const [isShowTime, setIsShowTime] = useState(false);
  const [timeWasSelected, setTimeWasSelected] = useState(false);

  const [todayInfo, setTodayInfo] = useState({});
  console.log(todayInfo);
  const onDayPress = day => {
    if (markedDates[day.dateString]) {
      setMarkedDates({});
    } else {
      setMarkedDates({
        [day.dateString]: {selected: true, selectedColor: '#B986DA'},
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title="Людмила Заглубоцкая"
        description="Мастер по маникюру, Мастер по педикюру"
      />
      <ScrollView>
        <View style={container}>
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
          <Text style={textTitle}>Услуги</Text>
          <View style={groupBlock}>
            <DropdownBlock
              active={false}
              slideBlock={slideBlock}
              setSlideBlock={setSlideBlock}
            />
            <DropdownBlock
              active={true}
              slideBlock={slideBlock}
              setSlideBlock={setSlideBlock}
            />
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
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../img/calendar.png')}
                  style={{marginRight: 8}}
                />
                <Text style={{fontWeight: 'bold'}}>25 июн 2019</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TimeBlock
                  time="12:00"
                  active={true}
                  // onPress={() => console.log(timeBlockRef, '!!!!')}
                />
                <TimeBlock time="13:00" active={false} onPress={() => {}} />
                <TimeBlock time="14:00" active={false} onPress={() => {}} />
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
              <Image
                source={require('../img/Location.png')}
                style={{marginRight: 8}}
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                  Санкт-Петербург, ул. Колонтай, 17к3
                </Text>
                <Text style={{fontSize: 13}}>Садовая</Text>
              </View>
            </View>
          </View>
          <Text style={textTitle}> О мастере</Text>
          <View style={[groupBlock, blockInGroup, {marginBottom: 30}]}>
            <Text style={{fontSize: 13, marginRight: 16}}>
              Всех приветствую в своём профиле. Я Светлана - сертифицированный
              мастер ногтевого сервиса. Закончила курс по специальности “Мастер
              по маникюру” и “Мастер по педикюру”. Слежу за новыми тенденциями и
              новинками.
            </Text>
          </View>
          <ButtonDefault
            style={{flexDirection: 'row', justifyContent: 'space-between'}}
            title="Подтвердить запись"
            rightTitle="1 800 руб"
            active={true}
            onPress={() => {}}
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
            <Image source={require('../img/CrossWhite.png')} />
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
              <DropdownBlock
                active={false}
                slideBlock={slideBlock}
                setSlideBlock={setSlideBlock}
              />
            </ScrollView>
            <ButtonDefault
              onPress={() => {
                setShowAllServices(false);
              }}
              title="Выбрать эти услуги (4)"
              active={true}
              style={{margin: 8}}
            />
          </View>
        </View>
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
              justifyContent: 'space-around',
              marginHorizontal: 24,
            }}>
            <TimeBlock
              style={{marginBottom: 8}}
              time="13:00"
              active={false}
              onPress={() => {}}
            />
            <TimeBlock time="13:00" active={true} onPress={() => {}} />
            <TimeBlock time="13:00" active={false} onPress={() => {}} />
            <TimeBlock time="13:00" active={false} onPress={() => {}} />
            <TimeBlock time="13:00" active={false} onPress={() => {}} />
            <TimeBlock time="13:00" active={false} onPress={() => {}} />
            <TimeBlock time="13:00" active={false} onPress={() => {}} />
            <TimeBlock time="13:00" active={false} onPress={() => {}} />
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
            на <Text style={{fontWeight: 'bold'}}>25 июн 2019</Text> в 10:00 к
            мастеру
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
    elevation: 2,
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
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.4,
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
    width: 70,
    height: 33,
    borderRadius: 2,
    borderColor: '#B986DA',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
});

export default PublickMasterProfile;
