import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../Screens/Home";
import { Game } from "../Screens/Game";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }} //isso esconde a barra de title
    >
      <Screen
        name="home"
        component={Home}
      />
      <Screen
        name="game"
        component={Game}
      />


    </Navigator>
  );
}
