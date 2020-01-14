import React from 'react';
import {StyleSheet, Text, ImageBackground} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Start from './screens/Start';
import Registration from './screens/Registration';
import Login from './screens/Login';
import PasswordRecovery from './screens/PasswordRecovery';
import ErrorSomethingWentWrong from './screens/ErrorSomethingWentWrong';
import ClientProfile from './screens/ClientProfile';
import ChangeCity from './screens/ChangeCity';
import Main from './screens/Main';
import MyNotes from './screens/MyNotes';
import PublickMasterProfile from './screens/PublickMasterProfile';
import NoteInformation from './screens/NoteInformation';
import ChangePassword from './screens/ChangePassword';
import PersonalData from './screens/PersonalData';
import ErrorInternetProblems from './screens/ErrorInternetProblems';
import ErrorDepartmentConstruction from './screens/ErrorDepartmentConstruction';
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
        header: null,
        // headerBackImage: <LeftArrowBlack />,
        headerStyle: styles.header,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
        // headerBackImage: <LeftArrowBlack />,
        headerStyle: styles.header,
      },
    },
    PasswordRecovery: {
      screen: PasswordRecovery,
      navigationOptions: {
        header: props => (
          <BackgroundHeader {...props} title="Восстановление пароля" />
        ),
        headerStyle: {...styles.header},
      },
    },
    ErrorSomethingWentWrong: {
      screen: ErrorSomethingWentWrong,
      navigationOptions: {
        headerStyle: {...styles.header},
      },
    },
    ErrorInternetProblems: {
      screen: ErrorInternetProblems,
      navigationOptions: {
        headerStyle: {...styles.header},
      },
    },
    ErrorDepartmentConstruction: {
      screen: ErrorDepartmentConstruction,
      navigationOptions: {
        headerStyle: {...styles.header},
      },
    },
    ClientProfile: {
      screen: ClientProfile,
      navigationOptions: {
        header: null,
        headerStyle: {...styles.header},
      },
    },
    PersonalData: {
      screen: PersonalData,
      navigationOptions: {
        header: null,
        headerStyle: {...styles.header},
      },
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
        header: null,
        headerStyle: {...styles.header},
      },
    },
    MyNotes: {
      screen: MyNotes,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    ChangeCity: {
      screen: ChangeCity,
      navigationOptions: {
        header: null,
        headerStyle: {...styles.header},
      },
    },
    NoteInformation: {
      screen: NoteInformation,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    PublickMasterProfile: {
      screen: PublickMasterProfile,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
  },
  {initialRouteName: 'Start'},
);

export default createAppContainer(App);
