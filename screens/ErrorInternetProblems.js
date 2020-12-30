import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {ButtonDefault} from '../components/Button';

const ErrorInternetProblems = ({navigation}) => {
  const {
    container,
    topText,
    bottomText,
    topTextContainer,
    imgContainer,
    buttonGroup,
  } = styles;

  return (
    <View style={container}>
      <View style={topTextContainer}>
        <Text style={topText}>Ой-ёй..</Text>
        <Text style={topText}>кажется, вы не подключены к интернету😵</Text>
      </View>
      <Text style={bottomText}>
        Проверьте соединение с сетью и попробуйте обновить страницу.
      </Text>
      <View style={imgContainer}>
        <Image source={require('../img/girl3.png')} />
      </View>
      <View style={buttonGroup}>
        <ButtonDefault
          style={{marginBottom: 8}}
          title="обновить страницу"
          active={true}
          onPress={() => {
            navigation.navigate('Main');
            // navigation.navigate(navigation.state.params.ROUTE);
            // navigation.goBack();
            // reload();
          }}
        />
        <ButtonDefault title="обратиться в поддержку Prof.ma" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    paddingHorizontal: 16,
  },
  topTextContainer: {
    flex: 2,
  },
  topText: {
    fontFamily: 'FuturaPT-Bold',
    fontSize: 24,
  },
  bottomText: {
    flex: 1.5,
    width: '80%',
    marginTop: 16,
    lineHeight: 17,
    fontSize: 13,
  },
  imgContainer: {
    flex: 5.5,
  },
  buttonGroup: {
    marginBottom: 8,
  },
});

export default ErrorInternetProblems;
