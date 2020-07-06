import React from 'react';
import {StyleSheet, Text, ImageBackground} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';

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
import WorkTimeSettings from './screens/Master/WorkTimeSettings';
import SelectWorkTime from './screens/Master/SelectWorkTime';
import PersonalDataMaster from './screens/Master/PersonalDataMaster';

import ChangeCity from './screens/ChangeCity';
import PublickMasterProfile from './screens/PublickMasterProfile';
import ErrorSomethingWentWrong from './screens/ErrorSomethingWentWrong';
import ErrorInternetProblems from './screens/ErrorInternetProblems';
import ErrorDepartmentConstruction from './screens/ErrorDepartmentConstruction';

import {getToken, signIn, signOut} from './src/util';

const httpLink = new HttpLink({
  uri: 'http://194.87.145.192/graphql',
});

const authLink = setContext(async (req, {headers}) => {
  const token = await getToken();
  return {
    ...headers,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const navigationOptions = {
  header: null,
  headerStyle: styles.header,
};

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
      navigationOptions,
    },
    Login: {
      screen: Login,
      navigationOptions,
    },
    PasswordRecovery: {
      screen: PasswordRecovery,
      navigationOptions,
    },
    Main: {
      screen: Main,
      navigationOptions,
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
      navigationOptions,
    },
    MasterProfile: {
      screen: MasterProfile,
      navigationOptions,
    },
    PersonalData: {
      screen: PersonalData,
      navigationOptions,
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions,
    },
    MyNotes: {
      screen: MyNotes,
      navigationOptions,
    },
    ChangeCity: {
      screen: ChangeCity,
      navigationOptions,
    },
    NoteInformation: {
      screen: NoteInformation,
      navigationOptions,
    },
    PublickMasterProfile: {
      screen: PublickMasterProfile,
      navigationOptions,
    },
    MyServices: {
      screen: MyServices,
      navigationOptions,
    },
    SelectSpecialization: {
      screen: SelectSpecialization,
      navigationOptions,
    },
    SelectServices: {
      screen: SelectServices,
      navigationOptions,
    },
    ServiceDescription: {
      screen: ServiceDescription,
      navigationOptions,
    },
    SelectedServiceDescription: {
      screen: SelectedServiceDescription,
      navigationOptions,
    },
    MyNotesMaster: {
      screen: MyNotesMaster,
      navigationOptions,
    },
    NoteInformationMaster: {
      screen: NoteInformationMaster,
      navigationOptions,
    },
    CompleteSeance: {
      screen: CompleteSeance,
      navigationOptions,
    },
    MasterCalendar: {
      screen: MasterCalendar,
      navigationOptions,
    },
    WorkTimeSettings: {
      screen: WorkTimeSettings,
      navigationOptions,
    },
    SelectWorkTime: {
      screen: SelectWorkTime,
      navigationOptions,
    },
    PersonalDataMaster: {
      screen: PersonalDataMaster,
      navigationOptions,
    },
  },
  {initialRouteName: 'Start'},
);

const styles = StyleSheet.create({
  header: {
    shadowOpacity: 0,
    elevation: 0,
    marginHorizontal: 5,
  },
});

export default createAppContainer(App);
