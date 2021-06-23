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

const ChangeMetro = ({navigation}) => {
  const {groupBlock, groupBlockIos, input, topTextWrap} = styles;

  const [metro, setMetro] = useState(
      navigation.state.params.metro.name || 'Укажите метро',
    ),
    [metroId, setMetroID] = useState(null),
    [manualMetro, setManualMetro] = useState(''),
    [filteredData, setFilteredData] = useState([]),
    [isLoading, setIsLoading] = useState(false);

  const metroInputRef = useRef(null);

  const {data, loading} = useQuery(ALL_CITIES);

  useEffect(() => {
    data && data.cities && setFilteredData(data.cities.data);
  }, [data]);

  const USER = useQuery(ME);

  useEffect(() => {
    const filteredCities =
      data &&
      data.cities.data.filter(el => {
        return !el.name.toLowerCase().indexOf(manualMetro.toLowerCase());
      });

    setFilteredData(filteredCities);
  }, [manualMetro]);

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
    // setIsLoading(true);
    // UPDATE_PROFILE_mutation({
    //   variables: {
    //     id: navigation.state.params.id,
    //     city_id: cityId,
    //   },
    //   optimisticResponse: null,
    // })
    //   .then(res => {
    //     setIsLoading(false);
    //     USER.data.me.type === 'Master'
    //       ? navigation.navigate('MasterProfile', {
    //           ID: res.data.updateProfile.id,
    //         })
    //       : navigation.navigate('ClientProfile', {
    //           ID: res.data.updateProfile.id,
    //         });
    //     navigation.state.params.reload();
    //   })
    //   .catch(err => {
    //     console.log(err, '__ERR');
    //     setIsLoading(false);
    //   });
  };

  return (
    <TouchableWithoutFeedback onPress={() => metroInputRef.current.blur()}>
      <View style={{flex: 1}}>
        <BackgroundHeader
          navigation={navigation}
          title={`Выбрать другое метро`}
        />
        <View style={{flex: 1, paddingHorizontal: 8}}>
          <View style={topTextWrap}>
            <Text style={{fontSize: 10}}>Ваше метро</Text>
            <Text style={{fontSize: 13, fontWeight: 'bold'}}>{metro}</Text>
          </View>

          <View style={input}>
            <SvgUri
              style={{marginRight: 10}}
              width="13"
              height="13"
              svgXmlData={SearchIcon}
            />

            <TextInput
              onChangeText={text => setManualMetro(text)}
              value={manualMetro}
              ref={metroInputRef}
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Найти метро.."
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
              {[
                {id: 1, name: 'Метро 1'},
                {id: 2, name: 'Метро 2'},
                {id: 3, name: 'Метро 3'},
                {id: 4, name: 'Метро 4'},
                {id: 5, name: 'Метро 5'},
                {id: 6, name: 'Метро 6'},
                {id: 7, name: 'Метро 7'},
                {id: 8, name: 'Метро 8'},
                {id: 9, name: 'Метро 9'},
                {id: 10, name: 'Метро 10'},
              ].map((el, i) => {
                if (el) {
                  return (
                    <View key={i}>
                      <TouchableOpacity
                        onPress={e => {
                          setMetro(el.name);
                          setMetroID(el.id);
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
              {/* {data &&
                !!filteredData &&
                !!filteredData.length &&
                filteredData.map((el, i) => {
                  if (el) {
                    return (
                      <View key={i}>
                        <TouchableOpacity
                          onPress={e => {
                            setMetro(el.name);
                            setMetroID(el.id);
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
                })} */}
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

export default ChangeMetro;
