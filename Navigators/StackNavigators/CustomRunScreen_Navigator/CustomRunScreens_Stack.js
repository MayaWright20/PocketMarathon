import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import CustomRun_HomeScreen from '../../../Screens/CustomRunScreens/CustomRun_HomeScreen';

const Stack = createStackNavigator();

export default function CustomRunScreens_Stack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CustomRun_HomeScreen" component={CustomRun_HomeScreen} options={{title: 'Cutomise Run'}}/>
    </Stack.Navigator>
  );
}