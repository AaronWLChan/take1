import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DiscoverStack from './stacks/DiscoverStack'
import Settings from '../screens/Settings'
import SearchStack from './stacks/SearchStack'
import { ROUTES } from '../constants/routes'
import { Ionicons } from '@expo/vector-icons';
import { COLOURS } from '../colours'

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
    return (
        <Tab.Navigator
        initialRouteName={ROUTES.DISCOVER}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === ROUTES.DISCOVER) {
              iconName = focused ? 'compass' : 'compass-outline';
            } 
            
            else if (route.name === ROUTES.SEARCH){
              iconName = focused ? 'search' : 'search-outline';
            }

            else if (route.name === ROUTES.SETTINGS) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
        })}

        tabBarOptions={{
          activeTintColor: COLOURS.accent,
          inactiveTintColor: COLOURS.secondary,
          showLabel: false,
          style: {
            backgroundColor: COLOURS.off_primary,
            borderColor: COLOURS.off_primary,
            borderTopWidth: 0
          }
        }}
      >
          <Tab.Screen name={ROUTES.DISCOVER} component={ DiscoverStack }/>
          <Tab.Screen name={ROUTES.SEARCH} component={ SearchStack }/>
          <Tab.Screen name={ROUTES.SETTINGS} component={ Settings }/>


      </Tab.Navigator>
    )
}


