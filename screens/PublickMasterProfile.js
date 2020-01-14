import React, {useState, useEffect, useRef} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {ButtonDefault} from '../components/Button';
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

const DropdownBlock = ({slideBlock, setSlideBlock, checked, setChecked}) => {
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
          <View style={{flex: 3}}>
            <CheckBox
              value={checked[0]}
              disabled={false}
              onValueChange={data => {
                checked[0] ? setChecked([false]) : setChecked([true]);
              }}
            />
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

const TimeBlock = ({time, active, onPress}) => {
  const {timeBlock} = styles;
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={[
        timeBlock,
        {
          backgroundColor: active ? '#B986DA' : '#fff',
        },
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
    likeBtn,
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
  const timeBlockRef = useRef();

  const [activeImg, setActiveImg] = useState(null);
  const [imgArr, setImgArr] = useState([
    'https://i.pinimg.com/736x/c8/fe/ff/c8feff7244af6a4d982447c5845ce08c.jpg',
    'https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg',
    'https://zhurnal-lady.com/wp-content/uploads/2018/12/4-15.jpg',
  ]);
  const [y, setY] = useState(null);
  const [checked, setChecked] = useState([false]);
  const [slideBlock, setSlideBlock] = useState([false]);

  const clickTimeBlock = () => {
    console.log(timeBlockRef, '!!!!');
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title="Людмила Заглубоцкая"
        description="Мастер по маникюру, Мастер по педикюру">
        <TouchableOpacity style={likeBtn}>
          <Image source={require('../img/Heart.png')} />
        </TouchableOpacity>
      </BackgroundHeader>
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
              slideBlock={slideBlock}
              setSlideBlock={setSlideBlock}
              checked={checked}
              setChecked={setChecked}
            />
            <AnotherBlock
              title="Посмотреть все услуги"
              onPress={() => {
                alert('Посмотреть все услуги');
              }}
            />
          </View>
          <Text style={textTitle}>ближайшее свободное время</Text>
          <View style={groupBlock}>
            <View style={[blockInGroup, borderBottom, {flexDirection: 'row'}]}>
              <View
                style={{flexDirection: 'row', flex: 2, alignItems: 'center'}}>
                <Image
                  source={require('../img/calendar.png')}
                  style={{marginRight: 8}}
                />
                <Text style={{fontWeight: 'bold'}}>25 июн 2019</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 3,
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
                alert('Выбрать другое время');
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
          <View style={[groupBlock, {marginBottom: 30}]}>
            <View style={[blockInGroup, {flexDirection: 'row'}]}>
              <Text style={{fontSize: 13}}>
                Всех приветствую в своём профиле. Я Светлана - сертифицированный
                мастер ногтевого сервиса. Закончила курс по специальности
                “Мастер по маникюру” и “Мастер по педикюру”. Слежу за новыми
                тенденциями и новинками.
              </Text>
            </View>
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
    backgroundColor: '#E9E9E9',
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
