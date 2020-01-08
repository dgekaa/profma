import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {LeftArrowWhite, LeftArrowBlack} from './LeftArrow';

const BackgroundHeader = ({navigation, title, blackArrow}) => {
  const {bg, container, headerTitle} = styles;
  return (
    <ImageBackground
      source={!blackArrow && require('../img/headerBG.png')}
      style={[bg, {paddingTop: blackArrow ? 25 : 0}]}>
      <View style={container}>
        {!!blackArrow ? (
          <LeftArrowBlack onPress={() => navigation.goBack(null)} />
        ) : (
          <LeftArrowWhite onPress={() => navigation.goBack(null)} />
        )}
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={headerTitle}>{title}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 100,
  },
  container: {
    marginHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Futura PT',
    fontSize: 18,
    fontWeight: 'bold',
    width: '95%',
    textAlign: 'center',
  },
  headerBtn: {
    borderRadius: 33,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 185,
    height: 33,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginTop: 8,
  },
});

export default BackgroundHeader;
