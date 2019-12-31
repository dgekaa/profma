import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Start from './screens/Start';
import ClientRegistration from './screens/ClientRegistration';
import LeftArrow from './components/LeftArrow';

const App = createStackNavigator(
  {
    Start: {
      screen: Start,
      navigationOptions: {
        header: null,
      },
    },
    ClientRegistration: {
      screen: ClientRegistration,
      navigationOptions: {
        headerBackImage: <LeftArrow />,
        headerStyle: {
          shadowOpacity: 0,
          elevation: 0,
          marginHorizontal: 5,
        },
      },
    },
  },
  {initialRouteName: 'Start'},
);

export default createAppContainer(App);
