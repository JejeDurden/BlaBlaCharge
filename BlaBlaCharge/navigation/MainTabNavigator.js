import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import PlanifierScreen from '../screens/PlanifierScreen';
import RechercherScreen from '../screens/RechercherScreen';
import ProposerScreen from '../screens/ProposerScreen';
import AccountScreen from '../screens/AccountScreen';

export default TabNavigator(
  {
    Accueil: {
      screen: HomeScreen,
    },
    Planifier: {
      screen: PlanifierScreen,
    },
    Rechercher: {
      screen: RechercherScreen,
    },
    Proposer: {
      screen: ProposerScreen,
    },
    Compte: {
      screen: AccountScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Accueil':
            iconName = Platform.OS === 'ios'
              ? `ios-home${focused ? '' : '-outline'}`
              : 'md-home';
            break;
          case 'Planifier':
            iconName = Platform.OS === 'ios'
              ? `ios-map${focused ? '' : '-outline'}`
              : 'md-map';
            break;
          case 'Rechercher':
            iconName = Platform.OS === 'ios'
              ? `ios-pin${focused ? '' : '-outline'}`
              : 'md-pin';
            break;
          case 'Proposer':
            iconName = Platform.OS === 'ios'
              ? `ios-add${focused ? '' : '-outline'}`
              : 'md-add';
            break;
          case 'Compte':
            iconName = Platform.OS === 'ios'
              ? `ios-people${focused ? '' : '-outline'}`
              : 'md-people';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      animationEnabled: false,
      swipeEnabled: false,
      tabBarOptions: {
          activeTintColor: Colors.tabIconSelected,
          inactiveTintColor: Colors.tabIconDefault
      }
  }
);
