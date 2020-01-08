import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

export const LeftArrowBlack = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 24,
      width: 24,
      justifyContent: 'center',
    }}>
    <Image
      style={{width: 12, height: 12, alignSelf: 'center'}}
      source={require('../img/leftArrow.png')}
    />
  </TouchableOpacity>
);

export const LeftArrowWhite = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      style={{width: 12, height: 12}}
      source={require('../img/leftArrowWhite.png')}
    />
  </TouchableOpacity>
);
