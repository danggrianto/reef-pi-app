import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { colors } from './src/Utils/theme'

import HomeNav from './src/Screens/Home';
import SettingsScreen from './src/Screens/Settings';
import EquipmentsScreen from './src/Screens/Equipments';

const Main = createBottomTabNavigator({
  Dashboard: HomeNav,
  Controllers: EquipmentsScreen,
  Settings: SettingsScreen,
},
{
  initialRouteName: 'Dashboard',
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Dashboard') {
        iconName = `ios-speedometer${focused ? '' : '-outline'}`;
      } else if (routeName === 'Controllers') {
        iconName = `ios-bulb${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: 'gray',
  },
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: Main,
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}