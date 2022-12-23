import {createBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Image} from 'react-native';
import Done from '../screen/Done/Done';
import Favourite from '../screen/Favourite/Favourite';
import ListProduct from '../screen/ListProduct/ListProduct';
import ToDo from '../screen/ToDo/ToDo';
import home from '../assets/home.png';
import checkActive from '../assets/checkActive.png';
import {ParamListBase} from '@react-navigation/native';

export type HomeTabsParamList = {
  ListProduct: undefined;
  Done: undefined;
  ToDo: undefined;
  Favourite: {ItemName: string; ItemId: number};
};

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarLabelStyle: {fontSize: 16},
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'blue',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 100,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
      })}>
      <Tab.Screen
        name="Prodotti"
        component={ListProduct}
        options={{tabBarIcon: ({color}) => <Image source={home} />}}
      />
      <Tab.Screen name="ToDo" component={ToDo} />
      <Tab.Screen
        name="Done"
        component={Done}
        options={{
          tabBarIcon: ({color}) => <Image source={checkActive} />,
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        initialParams={{ItemName: 'passaggio dati', ItemId: 12}}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
