import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';
import VectorIcon from '../../img/Vector.svg';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

// CheckBox
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
          width: 14,
          height: 14,
          borderRadius: 2,
          backgroundColor: active ? '#B986DA' : '#fff',
          borderWidth: active ? 0 : 3,
          borderColor: '#DFDFE4',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SvgUri svgXmlData={VectorIcon} />
      </View>
    </TouchableOpacity>
  );
};

const SelectServices = ({navigation}) => {
  const {groupBlock, blockTitle} = styles;

  const [services, setServices] = useState(
    navigation.state.params.activeRadioBtn[0].services,
  );

  const active = services.filter(el => el.active);
  const [count, setCount] = useState(active.length);

  useEffect(() => {
    setCount(active.length);
  }, [services]);

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Выберите услуги" />
      <View style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
        <Text style={blockTitle}>ваши Услуги</Text>
        <View style={groupBlock}>
          {services.map((el, i) => (
            <Block
              border={i + 1 == services.length ? false : true}
              key={i}
              title={el.title}
              active={el.active}
              onPress={() => {
                services[i] = {
                  title: el.title,
                  active: el.active ? false : true,
                };
                setServices([...services]);
              }}
            />
          ))}
        </View>
      </View>
      <ButtonDefault
        onPress={() => {
          navigation.navigate('ServiceDescription', {
            save: bool => {
              navigation.state.params.save(bool);
            },
            active,
            title: navigation.state.params.activeRadioBtn[0].title,
          });
        }}
        title={`выбрать эти услуги (${count})`}
        active={true}
        style={{margin: 8}}
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

export default SelectServices;
