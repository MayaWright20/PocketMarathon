import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Profile_HomeScreen from '../../../Screens/ProfilesScreens/Profile_HomeScreen';
import { COLORS } from '../../../Constants/COLORS';

const Stack = createStackNavigator();

export default function ProfileScreens_Stack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: COLORS.WHITE
        }
      }}
    >
      <Stack.Screen 
      name="Profile_HomeScreen" 
      component={Profile_HomeScreen} 
      options={{
        title: 'Profile'
      }}
      />
    </Stack.Navigator>
  );
}