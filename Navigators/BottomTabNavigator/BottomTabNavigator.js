import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomRunScreens_Stack from '../StackNavigators/CustomRunScreen_Navigator/CustomRunScreens_Stack';
import GamesRunScreens_Stack from '../StackNavigators/GameScreens_Navigator/GameScreens_Stack';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="CustomRunScreens_Stack" component={CustomRunScreens_Stack} />
      <Tab.Screen name="GamesRunScreens_Stack" component={GamesRunScreens_Stack} />
    </Tab.Navigator>
  )
}