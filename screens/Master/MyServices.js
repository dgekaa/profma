import React, {useState, useEffect} from 'react';

import BackgroundHeader, {Header} from '../../components/BackgroundHeader';
import {InputWithText, InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';
import SaveSuccess from '../../components/SaveSuccess';

import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const Block = ({navigation, deleteService, el}) => {
  const {block, headerText, text, textBold} = styles;
  return (
    <TouchableOpacity
      style={block}
      onPress={() => {
        navigation.navigate('SelectedServiceDescription', {
          deleteService: bool => {
            deleteService(bool);
          },
        });
      }}>
      <View>
        <Image
          style={{width: 75, height: 75, marginRight: 8}}
          source={{
            uri: 'https://hornews.com/upload/images/blank-avatar.jpg',
          }}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <Text style={headerText}>{el.name}</Text>
          <Text style={{color: '#B986DA', fontSize: 10}}>!!!!!!!!!</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View style={{flex: 1}}>
            <Text style={text}>Стоимость сеанса</Text>
            <Text style={textBold}>{el.how_mach} руб</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={text}>Стоимость указана за</Text>
            <Text style={textBold}>!!!!!!</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MyServices = ({navigation}) => {
  const {blockTitle} = styles;

  const [successDeleted, setSuccessDeleted] = useState(false);
  const [successSaved, setSuccessSaved] = useState(false);

  const deleteOneService = bool => {
    setSuccessDeleted(bool);
    setTimeout(() => {
      setSuccessDeleted(false);
    }, 1000);
  };

  return (
    <View style={{flex: 1}}>
      {true && (
        <View style={{flex: 1}}>
          <BackgroundHeader title="Мои услуги" navigation={navigation} />
          <View style={{paddingHorizontal: 8, flex: 1}}>
            <Text style={blockTitle}>мои активные услуги</Text>
            {navigation.state.params.my_services.map(el => (
              <Block
                el={el}
                navigation={navigation}
                deleteService={bool => deleteOneService(bool)}
              />
            ))}
          </View>
          {successDeleted && (
            <SaveSuccess
              style={{margin: 8}}
              title="🗑 Услуга “Европейский маникюр” успешно удалена."
            />
          )}
          {successSaved && (
            <SaveSuccess
              style={{margin: 8}}
              title="👍 Услуга “Европейский маникюр” успешно добавлена."
            />
          )}
          {!successDeleted && !successSaved && (
            <ButtonDefault
              onPress={() => {
                navigation.navigate('SelectSpecialization', {
                  save: bool => {
                    setSuccessSaved(true);
                    setTimeout(() => {
                      setSuccessSaved(false);
                    }, 1000);
                    navigation.navigate(navigation.state.routeName);
                  },
                });
              }}
              title="Добавить услугу"
              active={true}
              style={{margin: 8}}
            />
          )}
        </View>
      )}
      {false && (
        <View style={{flex: 1}}>
          <Header navigation={navigation} />
          <View style={{paddingHorizontal: 8, flex: 1}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              Вы пока не предоставляете ни одной услуги😞
            </Text>
            <Text style={{fontSize: 13, marginTop: 15}}>
              Создайте свою первую услугу.
            </Text>
          </View>
          <ButtonDefault
            onPress={() => {
              navigation.navigate('SelectSpecialization');
            }}
            title="Добавить услугу"
            active={true}
            style={{margin: 8}}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  blockTitle: {
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 8,
    marginTop: 15,
  },
  block: {
    marginTop: 8,
    flexDirection: 'row',
    padding: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#B986DA',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 10,
  },
  textBold: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default MyServices;
