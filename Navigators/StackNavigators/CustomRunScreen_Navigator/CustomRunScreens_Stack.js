import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import CustomRun_HomeScreen from '../../../Screens/CustomRunScreens/CustomRun_HomeScreen';
import { COLORS } from '../../../Constants/COLORS';

const Stack = createStackNavigator();

export default function CustomRunScreens_Stack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: COLORS.WHITE
        }
      }}
    >
      <Stack.Screen 
      name="CustomRun_HomeScreen" 
      component={CustomRun_HomeScreen} 
      options={{
        title: 'Cutomise Run'
      }}
      />
    </Stack.Navigator>
  );
}