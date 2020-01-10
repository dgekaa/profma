import React, {useState, useEffect, useRef} from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

import BackgroundHeader from '../components/BackgroundHeader';
const screen = Dimensions.get('window');

const GalereaBlock = ({img, index, onPress}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(index);
      }}
      style={{
        elevation: 1,
        shadowOpacity: 0.5,
        shadowColor: '#000',
        height: 216,
        width: 166,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 2,
      }}>
      <Image
        style={{height: 200, width: 150, borderRadius: 3}}
        source={{
          uri: img,
        }}
      />
    </TouchableOpacity>
  );
};

const BottomImgIndicator = ({index, showActiveImg}) => {
  return (
    <View
      key={index}
      style={{
        margin: 10,
        backgroundColor: '#fff',
        opacity: showActiveImg ? 1 : 0.35,
        height: showActiveImg ? 10 : 7,
        width: showActiveImg ? 10 : 7,
        borderRadius: 2,
      }}></View>
  );
};

const PublickMasterProfile = ({navigation}) => {
  const {likeBtn, container, galerea, bigImg, closeBtn, imgIndicator} = styles;

  const [activeImg, setAtiveImg] = useState(null);
  const [imgArr, setImgArr] = useState([
    'https://i.pinimg.com/736x/c8/fe/ff/c8feff7244af6a4d982447c5845ce08c.jpg',
    'https://womans.ws/wp-content/uploads/2019/10/1523527373_44-1068x1068.jpg',
    'https://zhurnal-lady.com/wp-content/uploads/2018/12/4-15.jpg',
  ]);

  const scrollImage = useRef(null);

  const showBigImg = i => {
    setAtiveImg(i);
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        title="Людмила Заглубоцкая"
        description="Мастер по маникюру, Мастер по педикюру">
        <TouchableOpacity style={likeBtn}>
          <Image source={require('../img/Heart.png')} />
        </TouchableOpacity>
      </BackgroundHeader>
      <View style={container}>
        <ScrollView
          style={galerea}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {imgArr.map((el, i) => {
            return (
              <GalereaBlock index={i} key={i} onPress={showBigImg} img={el} />
            );
          })}
        </ScrollView>
      </View>
      {(activeImg || activeImg === 0 || activeImg === '0') && (
        <View style={bigImg}>
          <ScrollView
            onScroll={event => {
              // СДЕЛАТЬ ПЛАВНО
              setAtiveImg(
                Math.round(event.nativeEvent.contentOffset.x / screen.width),
              );
            }}
            ref={scrollImage}
            horizontal={true}
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
              setAtiveImg(null);
            }}>
            <Image source={require('../img/CrossWhite.png')} />
          </TouchableOpacity>
          <View style={imgIndicator}>
            {imgArr.map((el, i) => {
              return (
                <BottomImgIndicator
                  showActiveImg={activeImg == i}
                  key={i}
                  index={i}
                  activeImg={activeImg}
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
});

export default PublickMasterProfile;
