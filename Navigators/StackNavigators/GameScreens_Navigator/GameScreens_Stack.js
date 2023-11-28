import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import GamesScreen_HomeScreen from '../../../Screens/GamesScreens/GamesScreen_HomeScreen';

const Stack = createStackNavigator();

export default function GamesRunScreens_Stack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="GamesScreen_HomeScreen" 
      component={GamesScreen_HomeScreen} 
      options={{title: 'Games'}}
      />
    </Stack.Navigator>
  );
}