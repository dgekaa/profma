import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';

export const LeftArrowBlack = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 24,
      width: 24,
      justifyContent: 'center',
    }}>
    <SvgUri
      width="13"
      height="13"
      source={require('../img/leftArrowBlack.svg')}
    />
  </TouchableOpacity>
);

export const LeftArrowWhite = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <SvgUri width="13" height="13" source={require('../img/leftArrow.svg')} />
  </TouchableOpacity>
);
