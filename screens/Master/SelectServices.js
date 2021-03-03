import React, {useState, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';
import VectorIcon from '../../img/Vector.svg';
import {Query, useMutation, useQuery} from 'react-apollo';

import {GET_SPECIALIZATION} from '../../QUERYES';

import BackgroundHeader from '../../components/BackgroundHeader';
import {ButtonDefault} from '../../components/Button';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

// CheckBox
const Block = ({title, active, onPress, key, idBack, idFront, border}) => {
  const {blockInGroup, borderBottom, text} = styles;

  return (
    <TouchableOpacity
      style={[
        blockInGroup,
        border && borderBottom,
        {justifyContent: 'space-between', alignItems: 'center'},
      ]}
      key={key}
      onPress={() => onPress(idFront, idBack)}>
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
  const {groupBlock, blockTitle, groupBlockIos} = styles;

  const {data, loading, error} = useQuery(GET_SPECIALIZATION, {
    variables: {id: +navigation.state.params.ID},
  });

  const [checkedServicesFront, setCheckedServicesFront] = useState([]);
  const [checkedServicesBack, setCheckedServicesBack] = useState([]);

  const clickOnCheckbox = (front, back) => {
    if (checkedServicesFront.indexOf(front) == -1) {
      setCheckedServicesFront(prev => [...prev, front]);
    } else {
      checkedServicesFront.forEach((el, i) => {
        if (el === front) {
          checkedServicesFront.splice(i, 1);
          setCheckedServicesFront(prev => [...checkedServicesFront]);
        }
      });
    }
    if (checkedServicesBack.indexOf(back) == -1) {
      setCheckedServicesBack(prev => [...prev, back]);
    } else {
      checkedServicesBack.forEach((el, i) => {
        if (el === back) {
          checkedServicesBack.splice(i, 1);
          setCheckedServicesBack(prev => [...checkedServicesBack]);
        }
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title="Выберите услуги" />
      <ScrollView style={{paddingHorizontal: 8, marginBottom: 8, flex: 1}}>
        <Text style={blockTitle}>ваши Услуги</Text>
        <View style={Platform.OS === 'ios' ? groupBlockIos : groupBlock}>
          {loading && <ActivityIndicator size="large" color="#00ff00" />}
          {data &&
            data.specialization.services.map((el, i) => (
              <Block
                border={
                  i + 1 == data.specialization.services.length ? false : true
                }
                key={i}
                idFront={i}
                idBack={el.id}
                title={el.name}
                active={checkedServicesFront.indexOf(i) !== -1}
                onPress={(front, back) => clickOnCheckbox(front, back)}
              />
            ))}
        </View>
      </ScrollView>
      <ButtonDefault
        onPress={() => {
          if (checkedServicesBack.length) {
            navigation.navigate('ServiceDescription', {
              save: bool => {
                navigation.state.params.save(bool);
              },
              checkedServices: checkedServicesBack,
              refetch: navigation.state.params.refetch,
              reload: navigation.state.params.reload,
            });
          }
        }}
        title={`выбрать эти услуги ${checkedServicesFront.length}`}
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
  groupBlockIos: {
    marginTop: 8,
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    flexDirection: 'column',
    paddingLeft: 18,
    backgroundColor:"#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowOpacity: 1,
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
