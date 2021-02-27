import React, {useState} from 'react';

import BackgroundHeader from '../../components/BackgroundHeader';
import {InputWithPassword} from '../../components/Input';
import {ButtonDisabled, ButtonDefault} from '../../components/Button';

import {
  Text,
  View,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {useMutation} from 'react-apollo';

import {UPDATE_PASSWORD} from '../../QUERYES';

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
    groupBlockIos,
  } = styles;

  const [pass, setPass] = useState(''),
    [repass, setRepass] = useState(''),
    [loading, setLoading] = useState(false);

  const [validationErr, setValidationErr] = useState('');

  const [UPDATE_PASSWORD_mutation] = useMutation(UPDATE_PASSWORD);

  const UPDATE = () => {
    setLoading(true);
    UPDATE_PASSWORD_mutation({
      variables: {
        password: pass,
        password_confirmation: repass,
      },
      optimisticResponse: null,
    })
      .then(res => {
        console.log(res, '__RES PASSWORD');
        navigation.state.params.onGoBack(true);
        setLoading(false);
        navigation.goBack();
      })
      .catch(err => {
        setLoading(false);
        setValidationErr(true);
        console.log(JSON.stringify(err), '----err password');
        // if (JSON.stringify(err.networkError)) {
        //   navigation.navigate('ErrorInternetProblems', {
        //     navigation: navigation,
        //   });
        // }
      });
  };

  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={{flex: 1}}>
        <BackgroundHeader navigation={navigation} title={`Изменить пароль`} />
        <View style={{flex: 1, paddingHorizontal: 8}}>
          <View>
            <Text style={blockTitle}>изменить пароль</Text>
            <View style={Platform.OS === 'ios' ? groupBlockIos : groupBlock}>
              <InputWithPassword
                validationErr={validationErr}
                value={pass}
                text="Введите новый пароль"
                withoutShadow={true}
                secureTextEntry={true}
                onChangeText={text => {
                  setPass(text);
                  setValidationErr('');
                }}
              />
              <View style={border} />
              <InputWithPassword
                validationErr={validationErr}
                value={repass}
                text="Повторите новый пароль"
                withoutShadow={true}
                secureTextEntry={true}
                onChangeText={text => {
                  setRepass(text);
                  setValidationErr('');
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 16}}>
            <View style={wrapper}>
              <View style={rightBlock}>
                <Image
                  style={imgSize}
                  source={require('../../img/girl4.png')}
                />
              </View>
              <View style={textWrap}>
                <Text style={textBold}>Мы советуем вам</Text>
                <Text style={{fontSize: 13}}>
                  Использовать пароль, содержащий не менее 6-ти знаков и хотя бы
                  с одним специальным символом
                </Text>
              </View>
            </View>
          </View>
        </View>

        {loading && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}

        <View style={{padding: 16}}>
          {false && <ButtonDisabled title="введённые пароли не совпадают" />}
          {true && (
            <ButtonDefault
              title="Сохранить новый пароль"
              active={true}
              onPress={() => UPDATE()}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  groupBlock: {
    borderRadius: 2,
    shadowOpacity: 4,
    backgroundColor: '#fff',
    elevation: 1,
  },
  groupBlockIos: {
    borderRadius: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
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
