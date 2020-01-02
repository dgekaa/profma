import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

export const LeftArrowBlack = () => (
  <Image
    style={{width: 12, height: 12}}
    source={require('../img/leftArrow.png')}
  />
);

export const LeftArrowWhite = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      style={{width: 12, height: 12}}
      source={require('../img/leftArrowWhite.png')}
    />
  </TouchableOpacity>
);
