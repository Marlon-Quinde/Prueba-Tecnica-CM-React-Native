import { createDrawerNavigator } from '@react-navigation/drawer';
import { MapeoScreen } from '../screens/mapeo/MapeoScreen';
import { TablaScreen } from '../screens/tabla/TablaScreen';


export type RootDrawerParams = {
    MapeoScreen: undefined;
    TablaScreen: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName='MapeoScreen'>
      <Drawer.Screen name="MapeoScreen" component={MapeoScreen} options={{drawerLabel: 'Pagina de Gráficos', headerTitle: 'Gráfico'}} />
      <Drawer.Screen name="TablaScreen" component={TablaScreen} options={{drawerLabel: 'Pagina de Tablas', headerTitle: 'Tablas'}}/>
    </Drawer.Navigator>
  );
}