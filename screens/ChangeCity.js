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
  ActivityIndicator,
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
  const {groupBlock, groupBlockIos, input, topTextWrap} = styles;

  const [city, setCity] = useState(
      navigation.state.params.city.name || 'Укажите город',
    ),
    [cityId, setCityID] = useState(null),
    [manualCity, setManualCity] = useState(''),
    [filteredData, setFilteredData] = useState([]),
    [isLoading, setIsLoading] = useState(false);

  const cityInputRef = useRef(null);

  const {data, loading} = useQuery(ALL_CITIES);

  useEffect(() => {
    data && data.cities && setFilteredData(data.cities.data);
  }, [data]);

  const USER = useQuery(ME);

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
        variables: {},
      },
    ],
    awaitRefetchQueries: true,
  };

  const [UPDATE_PROFILE_mutation] = useMutation(UPDATE_PROFILE, refreshObject);

  const SAVE = () => {
    setIsLoading(true);
    UPDATE_PROFILE_mutation({
      variables: {
        id: navigation.state.params.id,
        city_id: cityId,
      },
      optimisticResponse: null,
    })
      .then(res => {
        setIsLoading(false);
        USER.data.me.type === 'Master'
          ? navigation.navigate('MasterProfile', {
              ID: res.data.updateProfile.id,
            })
          : navigation.navigate('ClientProfile', {
              ID: res.data.updateProfile.id,
            });
        navigation.state.params.reload();
      })
      .catch(err => {
        console.log(err, '__ERR');
        setIsLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => cityInputRef.current.blur()}>
      <View style={{flex: 1}}>
        <BackgroundHeader
          navigation={navigation}
          title={`Выбрать другой город`}
        />
        <View style={{flex: 1, paddingHorizontal: 8}}>
          <View style={topTextWrap}>
            <Text style={{fontSize: 10}}>Ваш город</Text>
            <Text style={{fontSize: 13, fontWeight: 'bold'}}>{city}</Text>
          </View>

          <View style={input}>
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
          <View
            style={[
              Platform.OS === 'ios' ? groupBlockIos : groupBlock,
              data && !!filteredData && filteredData.length === 1
                ? {height: 50}
                : {flex: 1},
            ]}>
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
                        {filteredData.length - 1 !== i && <Border />}
                      </View>
                    );
                  }
                })}
              {loading && (
                <View
                  style={{
                    marginTop: 100,
                  }}>
                  <ActivityIndicator size="large" color="#00ff00" />
                </View>
              )}
              {isLoading && (
                <View
                  style={{
                    position: 'absolute',
                    marginTop: 100,
                    alignSelf: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#00ff00" />
                </View>
              )}
            </ScrollView>
          </View>

          <View style={{padding: 16}}>
            <ButtonDefault title="Сохранить изменения" onPress={() => SAVE()} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    borderRadius: 0.2,
    shadowOpacity: 4,
    elevation: 0.4,
    marginTop: 20,
    paddingLeft: 16,
    marginBottom: 8,
  },
  groupBlockIos: {
    borderRadius: 0.2,
    marginTop: 20,
    paddingLeft: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.01,
    shadowRadius: 0.1,
  },
  topTextWrap: {
    height: 60,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 2,
    shadowOpacity: 0.5,
    shadowRadius: 1.0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});

export default ChangeCity;
