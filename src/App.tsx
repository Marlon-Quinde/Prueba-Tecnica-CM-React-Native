import 'react-native-gesture-handler';
import 'react-native-svg';

import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { DrawerNavigation } from './presentation/navigation/DrawerNavigation';


export const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
        {/* <StackNavigator /> */}
    </NavigationContainer>
  )
}
