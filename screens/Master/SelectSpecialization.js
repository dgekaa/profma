import React, {useState, useEffect} from 'react';
import {Query, useMutation, useQuery} from 'react-apollo';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {GET_SPECIALIZATIONS} from '../../QUERYES';

const Block = ({title, active, onPress, key, border}) => {
  const {blockInGroup, borderBottom, text} = styles;

  return (
    <TouchableOpacity
      style={[
        blockInGroup,
        border && borderBottom,
        {justifyContent: 'space-between', alignItems: 'center'},
      ]}
      key={key}
      onPress={() => {
        onPress();
      }}>
      <Text style={text}>{title}</Text>
      <View
        style={{
          marginRight: 8,
          width: 12,
          height: 12,
          borderRadius: 12,
          backgroundColor: active ? '#B986DA' : '#DFDFE4',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: active ? 6 : 8,
            height: active ? 6 : 8,
            borderRadius: active ? 6 : 8,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const SelectSpecialization = ({navigation}) => {
  const {groupBlock, blockTitle} = styles;

  const {data, loading, error} = useQuery(GET_SPECIALIZATIONS, {
    variables: {first: 10},
  });

  const [activeSpecialization, setActiveSpecialization] = useState('');
  const [activeSpecializationID, setActiveSpecializationID] = useState('');

  console.log(data.specializations.data, 'DATA!!!');
  console.log(activeSpecialization, 'activeSpecialization!!!');
  console.log(activeSpecializationID, 'activeSpecializationID!!!');

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title="Выберите специализацию"
      />
      <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
        <Text style={blockTitle}>ваша специализация</Text>
        <View style={groupBlock}>
          {data &&
            data.specializations.data.map((el, i) => (
              <Block
                border={
                  i + 1 == data.specializations.data.length ? false : true
                }
                key={i}
                title={el.name}
                active={i === activeSpecialization}
                onPress={() => {
                  setActiveSpecialization(i);
                  setActiveSpecializationID(el.id);
                }}
              />
            ))}
        </View>
      </View>
      <ButtonDefault
        title="Выбрать эту специализацию"
        active={true}
        style={{margin: 8}}
        onPress={() => {
          navigation.navigate('SelectServices', {
            save: bool => {
              navigation.state.params.save(bool);
            },
            ID: activeSpecializationID,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    marginTop: 8,
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 1,
    flexDirection: 'column',
    paddingLeft: 18,
  },
  blockInGroup: {
    height: 50,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 8,
  },
  borderBottom: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.4,
  },
  text: {
    fontSize: 13,
    marginLeft: 13,
    fontFamily: 'FuturaPT-Bold',
  },
  blockTitle: {
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 18,
    marginTop: 15,
  },
});

export default SelectSpecialization;
