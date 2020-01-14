import React from 'react';
import {ImageBackground, Text, StyleSheet, View} from 'react-native';
import {LeftArrowWhite, LeftArrowBlack} from './LeftArrow';

export const Header = ({navigation, title, description, children}) => {
  const {bg, container, headerTitle, headerdescription} = styles;
  return (
    <View style={[bg, {paddingTop: 25}]}>
      <View style={container}>
        <LeftArrowBlack onPress={() => navigation.goBack(null)} />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={headerTitle}>{title}</Text>
          <Text style={headerdescription}>{description}</Text>
          {children}
        </View>
      </View>
    </View>
  );
};

const BackgroundHeader = ({navigation, title, description, children}) => {
  const {bg, container, headerTitle, headerdescription} = styles;
  return (
    <ImageBackground
      source={require('../img/headerBG.png')}
      style={[bg, {paddingTop: 0}]}>
      <View style={container}>
        <LeftArrowWhite onPress={() => navigation.goBack(null)} />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={headerTitle}>{title}</Text>
          {description && <Text style={headerdescription}>{description}</Text>}
          {children}
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
    fontSize: 15,
    fontWeight: 'bold',
    width: '95%',
    textAlign: 'center',
  },
  headerdescription: {
    color: '#fff',
    fontFamily: 'Futura PT',
    fontSize: 13,
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
