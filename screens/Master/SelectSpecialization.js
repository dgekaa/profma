import React, {useState, useEffect} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

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

  const [specialization, setSpecialization] = useState([
    {
      title: 'Мастер маникюра',
      active: true,
      services: [
        {title: 'Аппаратный маникюр', active: true},
        {title: 'Градиентное покрытие', active: false},
        {title: 'Европейский маникюр', active: false},
        {title: 'Классический маникюр', active: false},
        {title: 'Покрытие гель-лаком', active: false},
        {title: 'Покрытие “Лунки”', active: false},
      ],
    },
    {
      title: 'Мастер педикюра',
      active: false,
      services: [
        {title: 'Аппаратный маникюр', active: true},
        {title: 'Градиентное покрытие', active: false},
        {title: 'Европейский маникюр', active: false},
        {title: 'Классический маникюр', active: false},
        {title: 'Покрытие гель-лаком', active: false},
        {title: 'Покрытие “Лунки”', active: false},
      ],
    },
    {
      title: 'Мастер медицинского маникюра',
      active: false,
      services: [
        {title: 'Аппаратный маникюр', active: true},
        {title: 'Градиентное покрытие', active: false},
        {title: 'Европейский маникюр', active: false},
        {title: 'Классический маникюр', active: false},
        {title: 'Покрытие гель-лаком', active: false},
        {title: 'Покрытие “Лунки”', active: false},
      ],
    },
    {
      title: 'Мастер медицинского педикюра',
      active: false,
      services: [
        {title: 'Аппаратный маникюр', active: true},
        {title: 'Градиентное покрытие', active: false},
        {title: 'Европейский маникюр', active: false},
        {title: 'Классический маникюр', active: false},
        {title: 'Покрытие гель-лаком', active: false},
        {title: 'Покрытие “Лунки”', active: false},
      ],
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader
        navigation={navigation}
        title="Выберите специализацию"
      />
      <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
        <Text style={blockTitle}>ваша специализация</Text>
        <View style={groupBlock}>
          {specialization.map((el, i) => (
            <Block
              border={i + 1 == specialization.length ? false : true}
              key={i}
              title={el.title}
              active={el.active}
              onPress={() => {
                specialization.map(el => {
                  el.active = false;
                });
                specialization[i] = {
                  title: el.title,
                  active: el.active ? false : true,
                  services: el.services,
                };
                setSpecialization([...specialization]);
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
          const activeRadioBtn = specialization.filter(el => el.active);
          navigation.navigate('SelectServices', {
            activeRadioBtn,
            save: bool => {
              navigation.state.params.save(bool);
            },
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
