import React from 'react';
import {StyleSheet, Text, ImageBackground} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Start from './screens/Start';
import Registration from './screens/Registration';
import Login from './screens/Login';
import PasswordRecovery from './screens/PasswordRecovery';
import BackgroundHeader from './components/BackgroundHeader';
import {LeftArrowBlack} from './components/LeftArrow';

const styles = StyleSheet.create({
  header: {
    shadowOpacity: 0,
    elevation: 0,
    marginHorizontal: 5,
  },
});

const App = createStackNavigator(
  {
    Start: {
      screen: Start,
      navigationOptions: {
        header: null,
      },
    },
    Registration: {
      screen: Registration,
      navigationOptions: {
        headerBackImage: <LeftArrowBlack />,
        headerStyle: styles.header,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerBackImage: <LeftArrowBlack />,
        headerStyle: styles.header,
      },
    },
    PasswordRecovery: {
      screen: PasswordRecovery,
      navigationOptions: {
        header: props => <BackgroundHeader {...props} />,
        headerStyle: {...styles.header},
      },
    },
  },
  {initialRouteName: 'PasswordRecovery'},
);

export default createAppContainer(App);
