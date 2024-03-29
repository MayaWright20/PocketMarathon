import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import CustomRunScreens_Stack from '../StackNavigators/CustomRunScreen_Navigator/CustomRunScreens_Stack';
import GamesRunScreens_Stack from '../StackNavigators/GameScreens_Navigator/GameScreens_Stack';
import PreviousRunsScreens_Stack from '../StackNavigators/PreviousRunsScreens_Navigator/CustomRunScreens_Stack';
import ProfileScreens_Stack from '../StackNavigators/Profiles_Navigator/ProfileScreens_Stack';

import { COLORS } from '../../Constants/General/COLORS';

const Tab = createMaterialBottomTabNavigator();


export default function BottomTabNavigator() {
  const myNavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      notification: 'rgba(255, 255, 255, 0.5)',
      secondaryContainer: 'transparent',
    },
  };

  return (
    <PaperProvider theme={myNavigationTheme}>
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      activeColor={COLORS.HIGHTLIGHT_DARK_BLUE}
      inactiveColor={COLORS.DARK_GREY}
      barStyle={{ 
        backgroundColor: COLORS.WHITE,
        overflow: 'hidden',
        borderTopLeftRadius:50,
        borderTopRightRadius: 50,
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Tab.Screen
        name="CustomRunScreens_Stack"
        component={CustomRunScreens_Stack}
        options={{
          tabBarLabel: 'Customise',
          tabBarIcon: ({color}) => (
            <EvilIcons name="pencil" size={40} color={color}/>
          ),
          
        }} />
      <Tab.Screen
        name="GamesRunScreens_Stack"
        component={GamesRunScreens_Stack}
        options={{
          tabBarLabel: 'Games',
          tabBarIcon: ({color}) => (
            <Ionicons name="md-game-controller-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PreviousRunsScreens_Stack"
        component={PreviousRunsScreens_Stack}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color}) => (
            <Octicons name="history" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfilesScreens_Stack"
        component={ProfileScreens_Stack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Octicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    </PaperProvider>
  )
}