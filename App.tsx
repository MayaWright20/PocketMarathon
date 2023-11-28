import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './Navigators/BottomTabNavigator/BottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator>

      </BottomTabNavigator>
    </NavigationContainer>
  );
}