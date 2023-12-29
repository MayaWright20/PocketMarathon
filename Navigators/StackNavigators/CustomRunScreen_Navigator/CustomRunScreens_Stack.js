import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import OptionsContextProvider from '../../../Context/CustomRunContext/OptionsContext';
import CustomRun_HomeScreen from '../../../Screens/CustomRunScreens/CustomRun_HomeScreen';
import CustomRun_IntervalsSummaryScreen from '../../../Screens/CustomRunScreens/CustomRun_IntervalsSummaryScreen';
import CustomRun_StartRunScreen from '../../../Screens/CustomRunScreens/CustomRun_StartRunScreen';

import { COLORS } from '../../../Constants/COLORS';

const Stack = createStackNavigator();

export default function CustomRunScreens_Stack() {
  return (
    <OptionsContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
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
        <Stack.Screen
          name="CustomRun_IntervalsSummaryScreen"
          component={CustomRun_IntervalsSummaryScreen}
          options={{
            title: 'Summary'
          }}
        />
        <Stack.Screen
          name="CustomRun_StartRunScreen"
          component={CustomRun_StartRunScreen}
          options={{
            title: `GIVE THIS A NEW TITLE`
          }}
        />
      </Stack.Navigator>
    </OptionsContextProvider>
  );
}