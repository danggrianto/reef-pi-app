import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { colors } from './src/Utils/theme'

import HomeScreen from './src/Screens/Home';
import SettingsScreen from './src/Screens/Settings';
import EquipmentsScreen from './src/Screens/Equipments';

export default createBottomTabNavigator({
  Dashboard: HomeScreen,
  Equipments: EquipmentsScreen,
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
      } else if (routeName === 'Equipments') {
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