import React from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';

import {Text, View, StyleSheet, Image} from 'react-native';

const ChangePassword = ({navigation}) => {
  const {
    blockTitle,
    groupBlock,
    border,
    wrapper,
    rightBlock,
    imgSize,
    textWrap,
    textBold,
  } = styles;

  return (
    <View style={{flex: 1}}>
      <BackgroundHeader navigation={navigation} title={`Изменить пароль`} />
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <View>
          <Text style={blockTitle}>изменить пароль</Text>
          <View style={groupBlock}>
            <InputWithPassword
              text="Введите новый пароль"
              withoutShadow={true}
              secureTextEntry={true}
              onChangeText={text => {
                console.log(text);
              }}
            />
            <View style={border} />
            <InputWithPassword
              text="Повторите новый пароль"
              withoutShadow={true}
              secureTextEntry={true}
              onChangeText={text => {
                console.log(text);
              }}
            />
          </View>
        </View>
        <View style={{marginTop: 16}}>
          <View style={wrapper}>
            <View style={rightBlock}>
              <Image style={imgSize} source={require('../../img/girl4.png')} />
            </View>
            <View style={textWrap}>
              <Text style={textBold}>Мы советуем вам</Text>
              <Text style={{fontSize: 13}}>
                Использовать пароль, содержащий не менее 6-ти знаков и хотя бы с
                одним специальным символом
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{padding: 16}}>
        {false && <ButtonDisabled title="введённые пароли не совпадают" />}
        {true && (
          <ButtonDefault
            title="Сохранить новый пароль"
            active={true}
            onPress={() => {
              navigation.state.params.onGoBack(true);
              navigation.goBack();
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    borderRadius: 2,
    shadowOpacity: 4,
    backgroundColor: '#fff',
    elevation: 1,
  },
  blockTitle: {
    marginTop: 20,
    marginBottom: 8,
    color: '#011627',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginLeft: 8,
  },
  border: {
    height: 0.5,
    backgroundColor: '#aaa',
    marginLeft: 16,
  },
  wrapper: {
    flexDirection: 'row',
    height: 75,
    width: '90%',
    alignSelf: 'center',
  },
  rightBlock: {
    width: '20%',
    marginRight: 5,
  },
  imgSize: {
    height: 75,
    width: 75,
  },
  textWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 8,
    width: '75%',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default ChangePassword;
