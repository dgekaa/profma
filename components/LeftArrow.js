import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import LeftArrowBlackIcon from '../img/leftArrowBlack.svg';
import LeftArrowIcon from '../img/leftArrow.svg';

export const LeftArrowBlack = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 80,
      width: 80,
      justifyContent: 'center',
    }}>
    <SvgUri width="13" height="13" svgXmlData={LeftArrowBlackIcon} />
  </TouchableOpacity>
);

export const LeftArrowWhite = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 80,
      width: 80,
      justifyContent: 'center',
    }}>
    <SvgUri width="13" height="13" svgXmlData={LeftArrowIcon} />
  </TouchableOpacity>
);
