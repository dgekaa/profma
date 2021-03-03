import React, {useState, useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

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
import loaderPage from './loaderPage';

import ChangeCity from './screens/ChangeCity';
import PublickMasterProfile from './screens/PublickMasterProfile';
import ErrorSomethingWentWrong from './screens/ErrorSomethingWentWrong';
import ErrorInternetProblems from './screens/ErrorInternetProblems';
import ErrorDepartmentConstruction from './screens/ErrorDepartmentConstruction';

import {getToken, signIn, signOut} from './util';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false),
    [loading, setLoading] = useState(false);

  const httpLink = new HttpLink({
    uri: 'http://194.87.145.192/graphql',
  });

  const authLink = setContext(async (req, {headers}) => {
    const token = await getToken();

    return {
      ...headers,
      headers: {
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  });

  const link = authLink.concat(httpLink);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
    },
  });

  const getAsyncToken = async () => {
    setLoading(true);
    const token = await getToken();
    if (token) {
      setLoading(false);
      setLoggedIn(true);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(loading, '----loading');
  }, [loading]);

  useEffect(() => {
    getAsyncToken();
  }, []);

  const navOptionHandler = () => ({
    header: null,
  });

  const handleChangeLoginState = (loggedIn = false, token) => {
    setLoggedIn(loggedIn);
    loggedIn ? signIn(token) : signOut();
  };

  const MainStack = createStackNavigator(
    {
      Start: {
        screen: Start,
        navigationOptions: navOptionHandler,
      },
      Registration: {
        screen: props => (
          <Registration
            {...props}
            handleChangeLoginState={handleChangeLoginState}
          />
        ),
        navigationOptions: navOptionHandler,
      },
      Login: {
        screen: props => (
          <Login {...props} handleChangeLoginState={handleChangeLoginState} />
        ),
        navigationOptions: navOptionHandler,
      },
      loaderPage: {
        screen: loaderPage,
        navigationOptions: navOptionHandler,
      },
      PasswordRecovery: {
        screen: PasswordRecovery,
        navigationOptions: navOptionHandler,
      },
      Main: {
        screen: Main,
        navigationOptions: navOptionHandler,
      },
      ErrorSomethingWentWrong: {
        screen: ErrorSomethingWentWrong,
        navigationOptions: navOptionHandler,
      },
      ErrorInternetProblems: {
        screen: ErrorInternetProblems,
        navigationOptions: navOptionHandler,
      },
      ErrorDepartmentConstruction: {
        screen: ErrorDepartmentConstruction,
        navigationOptions: navOptionHandler,
      },
      ClientProfile: {
        screen: props => (
          <ClientProfile
            {...props}
            handleChangeLoginState={handleChangeLoginState}
          />
        ),
        navigationOptions: navOptionHandler,
      },
      MasterProfile: {
        screen: props => (
          <MasterProfile
            {...props}
            handleChangeLoginState={handleChangeLoginState}
          />
        ),
        navigationOptions: navOptionHandler,
      },
      PersonalData: {
        screen: PersonalData,
        navigationOptions: navOptionHandler,
      },
      ChangePassword: {
        screen: ChangePassword,
        navigationOptions: navOptionHandler,
      },
      MyNotes: {
        screen: MyNotes,
        navigationOptions: navOptionHandler,
      },
      ChangeCity: {
        screen: ChangeCity,
        navigationOptions: navOptionHandler,
      },
      NoteInformation: {
        screen: NoteInformation,
        navigationOptions: navOptionHandler,
      },
      PublickMasterProfile: {
        screen: PublickMasterProfile,
        navigationOptions: navOptionHandler,
      },
      MyServices: {
        screen: MyServices,
        navigationOptions: navOptionHandler,
      },
      SelectSpecialization: {
        screen: SelectSpecialization,
        navigationOptions: navOptionHandler,
      },
      SelectServices: {
        screen: SelectServices,
        navigationOptions: navOptionHandler,
      },
      ServiceDescription: {
        screen: ServiceDescription,
        navigationOptions: navOptionHandler,
      },
      SelectedServiceDescription: {
        screen: SelectedServiceDescription,
        navigationOptions: navOptionHandler,
      },
      MyNotesMaster: {
        screen: MyNotesMaster,
        navigationOptions: navOptionHandler,
      },
      NoteInformationMaster: {
        screen: NoteInformationMaster,
        navigationOptions: navOptionHandler,
      },
      CompleteSeance: {
        screen: CompleteSeance,
        navigationOptions: navOptionHandler,
      },
      MasterCalendar: {
        screen: MasterCalendar,
        navigationOptions: navOptionHandler,
      },
      WorkTimeSettings: {
        screen: WorkTimeSettings,
        navigationOptions: navOptionHandler,
      },
      SelectWorkTime: {
        screen: SelectWorkTime,
        navigationOptions: navOptionHandler,
      },
      PersonalDataMaster: {
        screen: props => (
          <PersonalDataMaster
            {...props}
            handleChangeLoginState={handleChangeLoginState}
          />
        ),
        navigationOptions: navOptionHandler,
      },
    },
    {initialRouteName: loggedIn ? 'Main' : loading ? 'loaderPage' : 'Start'},
  );

  const AppContainer = createAppContainer(MainStack);

  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
};

export default App;
