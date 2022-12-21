import {createBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/ListProduct/ListProduct';
import Login from '../screen/Login/Login';

export interface RouteParams extends ParamListBase {
  Favourite: {ItemName: string; ItemId: number};
  Home: {message: string};
  DetailAlbum: undefined;
  Login: undefined;
}

const Tab = createBottomTabNavigator<RouteParams>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 80,
          backgroundColor: 'red',
        },
      }}>
      <Tab.Screen name="Login" component={Login} />
      {/* <Tab.Screen name="Home" component={Home} /> */}
    </Tab.Navigator>
  );
};

export default MainTabs;
