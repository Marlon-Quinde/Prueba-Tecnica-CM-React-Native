import {createStackNavigator} from '@react-navigation/stack';
import {LoadingScreen} from '../screens/loading/LoadingScreen';
import { MapeoScreen } from '../screens/mapeo/MapeoScreen';
import { LoginScreen } from '../screens/login/LoginScreen';
import { RegisterScreen } from '../screens/login/RegisterScreen';
import { TablaScreen } from '../screens/tabla/TablaScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  MapeoScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  TablaScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MapeoScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="MapeoScreen" component={MapeoScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="TablaScreen" component={TablaScreen} />
    </Stack.Navigator>
  );
};
