import React, {useState, useRef, useEffect} from 'react';
import SvgUri from 'react-native-svg-uri';
import BackgroundHeader from '../components/BackgroundHeader';
import SearchIcon from '../img/Search.svg';
import {Query, useMutation, useQuery} from 'react-apollo';
import {ButtonDefault} from '../components/Button';

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

import {ALL_CITIES, UPDATE_PROFILE, ME} from '../QUERYES';

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

  const [city, setCity] = useState(
    navigation.state.params.city.name || 'Укажите город',
  );
  const [cityId, setCityID] = useState(null);
  const [manualCity, setManualCity] = useState('');

  const cityInputRef = useRef(null);

  const {data} = useQuery(ALL_CITIES, {
    variables: {},
  });

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    console.log(data, '___DATA+++');
    console.log(navigation.state.params, '___DATA+++');
    data && data.cities && setFilteredData(data.cities.data);
  }, [data]);

  useEffect(() => {
    console.log(filteredData, '____filteredData');
  }, [filteredData]);

  useEffect(() => {
    const filteredCities =
      data &&
      data.cities.data.filter(el => {
        return !el.name.toLowerCase().indexOf(manualCity.toLowerCase());
      });

    setFilteredData(filteredCities);
  }, [manualCity]);

  const refreshObject = {
    refetchQueries: [
      {
        query: ME,
      },
    ],
    awaitRefetchQueries: true,
  };
  const [UPDATE_PROFILE_mutation] = useMutation(UPDATE_PROFILE, refreshObject);

  const SAVE = () => {
    UPDATE_PROFILE_mutation({
      variables: {
        id: navigation.state.params.id,
        city_id: cityId,
      },
      optimisticResponse: null,
    })
      .then(res => {
        console.log(res, '__RES');
      })
      .catch(err => console.log(err, '__ERR'));
  };

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
              onChangeText={text => setManualCity(text)}
              value={manualCity}
              ref={cityInputRef}
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Найти город.."
              style={{width: '100%', paddingRight: 16}}
            />
          </View>

          <View style={[groupBlock]}>
            <ScrollView>
              {data &&
                !!filteredData &&
                !!filteredData.length &&
                filteredData.map((el, i) => {
                  if (el) {
                    return (
                      <View key={i}>
                        <TouchableOpacity
                          onPress={e => {
                            setCity(el.name);
                            setCityID(el.id);
                          }}
                          style={{
                            height: 50,
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                            {el.name}
                          </Text>
                        </TouchableOpacity>
                        <Border />
                      </View>
                    );
                  }
                })}
              {true && (
                <View style={{padding: 16}}>
                  <ButtonDefault
                    title="Сохранить изменения"
                    onPress={() => SAVE()}
                  />
                </View>
              )}
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
