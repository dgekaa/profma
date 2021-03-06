import React from 'react';
import SvgUri from 'react-native-svg-uri';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {LeftArrowWhite, LeftArrowBlack} from './LeftArrow';
import SettingsIcon from '../img/Settings.svg';

export const Header = ({navigation, title, description, children}) => {
  const {bg, container, headerTitle, headerdescription} = styles;
  return (
    <View style={[bg, {paddingTop: 25}]}>
      <View style={container}>
        <LeftArrowBlack onPress={() => navigation.goBack(null)} />
        <View style={{flex: 1, flexDirection: 'column',marginLeft:-60}}>
          <Text style={headerTitle}>{title}</Text>
          <Text style={headerdescription}>{description}</Text>
          {children}
        </View>
      </View>
    </View>
  );
};

const BackgroundHeader = ({
  navigation,
  title,
  description,
  children,
  settings,
  onSettingsPress,
  zInd
}) => {
  const {bg, container, headerTitle, headerdescription, settingsStyle} = styles;
  return (
    <ImageBackground
      source={require('../img/headerBG.png')}
      style={[bg,zInd?{zIndex:zInd}:{}, {paddingTop: 0}]}>
      <View style={container}>
        <LeftArrowWhite onPress={() => navigation.goBack(null)} />
        <View style={{flex: 1, flexDirection: 'column',marginLeft:-60}}>
          <Text style={headerTitle}>{title}</Text>
          {description && <Text style={headerdescription}>{description}</Text>}
          {children}
        </View>
        {settings && (
          <TouchableOpacity style={settingsStyle} onPress={onSettingsPress}>
            <SvgUri svgXmlData={SettingsIcon} width="13" height="13" />
          </TouchableOpacity>
        )}
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
    fontFamily: 'FuturaPT-Bold',
    fontSize: 18,
    width: '95%',
    textAlign: 'center',
  },
  headerdescription: {
    color: '#fff',
    fontFamily: 'FuturaPT-Medium',
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
  settingsStyle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackgroundHeader;
