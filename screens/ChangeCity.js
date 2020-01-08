import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../components/BackgroundHeader';
import {InputWithText} from '../components/Input';

import {
  Text,
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const ChangeCity = ({navigation}) => {
  const {} = styles;

  return (
    <View>
      <BackgroundHeader
        navigation={navigation}
        title={`Выбрать другой город`}
      />
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <Text>ChangeCity</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChangeCity;
