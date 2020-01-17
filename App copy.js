import React from 'react';
import {StyleSheet, Text, ImageBackground} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Start from './screens/Start';
import Registration from './screens/Registration';
import Login from './screens/Login';
import PasswordRecovery from './screens/PasswordRecovery';

import Main from './screens/Main';

import ClientProfile from './screens/Client/ClientProfile';
import PersonalData from './screens/Client/PersonalData';
import ChangePassword from './screens/Client/ChangePassword';
import MyNotes from './screens/Client/MyNotes';
import NoteInformation from './screens/Client/NoteInformation';

import MasterProfile from './screens/Master/MasterProfile';
import MyServices from './screens/Master/MyServices';
import SelectSpecialization from './screens/Master/SelectSpecialization';
import SelectServices from './screens/Master/SelectServices';
import ServiceDescription from './screens/Master/ServiceDescription';
import SelectedServiceDescription from './screens/Master/SelectedServiceDescription';
import MyNotesMaster from './screens/Master/MyNotesMaster';
import NoteInformationMaster from './screens/Master/NoteInformationMaster';
import CompleteSeance from './screens/Master/CompleteSeance';
import MasterCalendar from './screens/Master/MasterCalendar';
import CalendarSettings from './screens/Master/CalendarSettings';

import ChangeCity from './screens/ChangeCity';
import PublickMasterProfile from './screens/PublickMasterProfile';
import ErrorSomethingWentWrong from './screens/ErrorSomethingWentWrong';
import ErrorInternetProblems from './screens/ErrorInternetProblems';
import ErrorDepartmentConstruction from './screens/ErrorDepartmentConstruction';

import BackgroundHeader from './components/BackgroundHeader';

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
        headerStyle: styles.header,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
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
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
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
    MasterProfile: {
      screen: MasterProfile,
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
    PublickMasterProfile: {
      screen: PublickMasterProfile,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    MyServices: {
      screen: MyServices,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    SelectSpecialization: {
      screen: SelectSpecialization,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    SelectServices: {
      screen: SelectServices,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    ServiceDescription: {
      screen: ServiceDescription,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    SelectedServiceDescription: {
      screen: SelectedServiceDescription,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    MyNotesMaster: {
      screen: MyNotesMaster,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    NoteInformationMaster: {
      screen: NoteInformationMaster,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    CompleteSeance: {
      screen: CompleteSeance,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    MasterCalendar: {
      screen: MasterCalendar,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
    CalendarSettings: {
      screen: CalendarSettings,
      navigationOptions: {
        header: null,
        headerStyle: styles.header,
      },
    },
  },
  {initialRouteName: 'Start'},
);

export default createAppContainer(App);
