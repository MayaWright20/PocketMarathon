import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import CustomRunScreens_Stack from '../StackNavigators/CustomRunScreen_Navigator/CustomRunScreens_Stack';
import GamesRunScreens_Stack from '../StackNavigators/GameScreens_Navigator/GameScreens_Stack';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { COLORS } from '../../Constants/COLORS';

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
            <EvilIcons name="pencil" size={35} color={color}/>
          ),
          
        }} />
      <Tab.Screen
        name="GamesRunScreens_Stack"
        component={GamesRunScreens_Stack}
        options={{
          tabBarLabel: 'Games',
          tabBarIcon: ({color}) => (
            <Ionicons name="md-game-controller-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    </PaperProvider>
  )
}