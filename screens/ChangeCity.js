import React, {useState, useRef} from 'react';
import SvgUri from 'react-native-svg-uri';
import BackgroundHeader from '../components/BackgroundHeader';
import SearchIcon from '../img/Search.svg';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

const Border = () => (
  <View
    style={{
      height: 0.5,
      backgroundColor: '#aaa',
      marginLeft: 16,
    }}
  />
);

const ChangeCity = ({navigation}) => {
  const {groupBlock} = styles;
  const data = [
    'qwe',
    'asd',
    'zxc',
    'qwe',
    'asd',
    'zxc',
    'qwe',
    'asd',
    'zxc',
    'qwe',
    'asd',
    'zxc',
  ];
  const [city, setCity] = useState(
    navigation.state.params.city || 'Укажите город',
  );

  const cityInputRef = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={() => cityInputRef.current.blur()}>
      <View style={{flex: 1}}>
        <BackgroundHeader
          navigation={navigation}
          title={`Выбрать другой город`}
        />
        <View style={{flex: 1, paddingHorizontal: 8}}>
          <View
            style={{
              height: 60,
              padding: 10,
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 10}}>Ваш город</Text>
            <Text style={{fontSize: 13, fontWeight: 'bold'}}>{city}</Text>
          </View>
          <View
            style={{
              height: 60,
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 19,
              shadowColor: 'rgba(0, 0, 0, 0.17)',
              elevation: 2,
            }}>
            <SvgUri
              style={{marginRight: 10}}
              width="13"
              height="13"
              svgXmlData={SearchIcon}
            />

            <TextInput
              ref={cityInputRef}
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Найти город.."
              style={{width: '100%', paddingRight: 16}}
            />
          </View>

          <View style={[groupBlock]}>
            <ScrollView>
              {data.map((el, i) => {
                if (el) {
                  return (
                    <View key={i}>
                      <TouchableOpacity
                        onPress={e => {
                          setCity(data[i]);
                        }}
                        style={{
                          height: 50,
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                          {el}
                        </Text>
                      </TouchableOpacity>
                      <Border />
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    flex: 1,
    borderRadius: 0.2,
    shadowOpacity: 4,
    elevation: 0.4,
    marginTop: 20,
    paddingLeft: 16,
    marginBottom: 8,
  },
});

export default ChangeCity;
