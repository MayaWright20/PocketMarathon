import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import PreviousRuns_HomeScreen from '../../../Screens/PreviousRunsScreens/PreviousRuns_HomeScreen';
import { COLORS } from '../../../Constants/General/COLORS';

const Stack = createStackNavigator();

export default function PreviousRunsScreens_Stack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: COLORS.WHITE
        }
      }}
    >
      <Stack.Screen 
      name="PreviousRuns_HomeScreen" 
      component={PreviousRuns_HomeScreen} 
      options={{
        title: 'Previous Runs'
      }}
      />
    </Stack.Navigator>
  );
}