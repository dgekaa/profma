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

const Block = ({navigation, deleteService}) => {
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
            uri:
              'http://nogti.by/upload/resize_cache/iblock/0ea/400_300_240cd750bba9870f18aada2478b24840a/0eace166e2c0070125bccd5ce5dd4c97.jpg',
          }}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <Text style={headerText}>Европейский маникюр</Text>
          <Text style={{color: '#B986DA', fontSize: 10}}>Мастер маникюра</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View style={{flex: 1}}>
            <Text style={text}>Стоимость сеанса</Text>
            <Text style={textBold}>750 руб</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={text}>Стоимость указана за</Text>
            <Text style={textBold}>1</Text>
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
            <Block
              navigation={navigation}
              deleteService={bool => deleteOneService(bool)}
            />
            <Block
              navigation={navigation}
              deleteService={bool => deleteOneService(bool)}
            />
            <Block
              navigation={navigation}
              deleteService={bool => deleteOneService(bool)}
            />
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
    elevation: 2,
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
