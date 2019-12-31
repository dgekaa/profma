import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {View, StyleSheet} from 'react-native';

const LeftArrow = () => {
  const {arrow} = styles;
  return (
    <View style={arrow}>
      <Icon name="arrow-left" size={16} />
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    paddingLeft: 5,
  },
});

export default LeftArrow;
