/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import home from './src/assets/home.png';

import Home from './src/screen/Home';
import Favourite from './src/screen/Favourite';
import Login from './src/screen/Login';

import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge} from './src/redux/action';
import {Store} from './src/redux/store';

export interface RouteParams extends ParamListBase {
  Favourite: {ItemName: string; ItemId: number};
  Home: {message: string};
}

const Tab = createMaterialBottomTabNavigator<RouteParams>();

const App = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showWarming, setShowWarning] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const Tab = createBottomTabNavigator();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route, navigation}) => ({
            // tabBarIcon: ({focused, size, color}) => {
            // },
          })}>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen
            name="Favourite"
            component={Favourite}
            initialParams={{ItemName: 'passaggio dati', ItemId: 12}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
    // <SafeAreaView>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView contentInsetAdjustmentBehavior="automatic">
    //
    //   </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 300,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
