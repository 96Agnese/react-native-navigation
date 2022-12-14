/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import home from './src/assets/home.png';

import Home from './src/screen/Home';
import Favourite from './src/screen/Favourite';
import Login from './src/screen/Login';
import DetailAlbum from './src/screen/DetailAlbum';

import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge} from './src/redux/action';
import {Store} from './src/redux/store';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MyTabs from './src/BottomTabs/MainTabs';
import MainTabs from './src/BottomTabs/MainTabs';
import Map from './src/screen/Map';

export interface RouteParams extends ParamListBase {
  Favourite: {ItemName: string; ItemId: number};
  Home: {message: string; title: string; thumbnailUrl: string};
  DetailAlbum: {
    title: string;
    image: string;
    description: string;
    price: number;
    category: string;
  };
}

const Stack = createNativeStackNavigator<RouteParams>();

const App = () => {
  const [name, setName] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const Tab = createBottomTabNavigator();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({route, navigation}) => ({
            // tabBarIcon: ({focused, size, color}) => {
            // },
          })}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTitle: () => (
                <Text style={{fontSize: 16}}>Dettaglio prodotto</Text>
              ),
            }}
          />
          <Stack.Screen
            name="Favourite"
            component={Favourite}
            initialParams={{ItemName: 'passaggio dati', ItemId: 12}}
          />
          <Stack.Screen
            name="DetailAlbum"
            component={DetailAlbum}
            options={{
              headerBackTitleVisible: false,
              headerShadowVisible: false,
            }}

            // initialParams={{ItemName: 'passaggio dati', ItemId: 12}}
          />

          {/* <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{
              headerShown: false,
              headerLeft: () => false,
            }}
          /> */}
        </Stack.Navigator>
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

export default App;
