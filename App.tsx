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
import {Image, Text, TouchableOpacity, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Favourite from './src/screen/Favourite/Favourite';
import Login from './src/screen/Login/Login';
import DetailProduct from './src/screen/DetailProduct/DetailProduct';
import ToDo from './src/screen/ToDo/ToDo';
import ListProduct from './src/screen/ListProduct/ListProduct';

import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import Task from './src/screen/Task/Task';
import Done from './src/screen/Done/Done';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import home from './src/assets/home.png';
import checkActive from './src/assets/checkActive.png';

export interface RouteParams extends ParamListBase {
  Done: undefined;
  Task: undefined;
  ToDo: undefined;
  Favourite: {
    ItemName: string;
    ItemId: number;
    screenNumber: number;
    movie: {
      title: string;
      des: string;
    };
  };
  Home: {message: string; title: string; thumbnailUrl: string};
  ListProduct: {
    title: string;
    image: string;
    description: string;
    price: number;
    category: string;
  };
}
// / creo l'instanza che mi da la root
const RootStack = createNativeStackNavigator<RouteParams>();
// / bottom tab
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarInactiveBackgroundColor: '#fff0f5',
        tabBarActiveBackgroundColor: 'pink',
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: '#9400d3',
        tabBarStyle: {
          backgroundColor: '#fffaf0',
          height: 100,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
      })}>
      <Tab.Screen
        name="Prodotti"
        component={ListProduct}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => {
            return (
              <Text style={{color, fontWeight: focused ? 'bold' : 'normal'}}>
                Prodotti
              </Text>
            );
          },
          tabBarIcon: ({color, focused, size}) => (
            <Image
              source={home}
              style={{
                tintColor: focused ? '#9400d3' : 'black',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ToDo"
        component={ToDo}
        options={{
          headerShown: false,

          tabBarLabel: ({focused, color}) => {
            return (
              <Text style={{color, fontWeight: focused ? 'bold' : 'normal'}}>
                ToDo
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Done"
        component={Done}
        options={{
          headerShown: false,

          tabBarLabel: ({focused, color}) => {
            return (
              <Text style={{color, fontWeight: focused ? 'bold' : 'normal'}}>
                Done
              </Text>
            );
          },
          tabBarIcon: ({color, focused}) => <Image source={checkActive} />,
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        initialParams={{ItemName: 'passaggio dati', ItemId: 12}}
        options={{
          headerShown: false,

          tabBarLabel: ({focused, color}) => {
            return (
              <Text style={{color, fontWeight: focused ? 'bold' : 'normal'}}>
                Favourite
              </Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

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
        <RootStack.Navigator
          screenOptions={({route, navigation}) => ({
            // tabBarIcon: ({focused, size, color}) => {
            // },
          })}>
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTitle: () => <Text style={{fontSize: 20}}>Login</Text>,
            }}
          />
          <RootStack.Screen
            name="Home"
            component={HomeTabs}
            options={{
              headerStyle: {
                backgroundColor: '#faf0e6',
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTitle: () => <Text style={{fontSize: 20}}>Prodotti</Text>,
            }}
          />

          <RootStack.Screen
            name="DetailProduct"
            component={DetailProduct}
            options={{
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTitle: () => (
                <Text style={{fontSize: 20}}>Dettaglio prodotti</Text>
              ),
            }}

            // initialParams={{ItemName: 'passaggio dati', ItemId: 12}}
          />
          <RootStack.Screen
            name="Task"
            component={Task}
            options={{
              headerBackTitleVisible: false,
              headerShadowVisible: false,
            }}

            // initialParams={{ItemName: 'passaggio dati', ItemId: 12}}
          />
        </RootStack.Navigator>
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
