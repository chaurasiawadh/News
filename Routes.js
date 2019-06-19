import {createStackNavigator} from "react-navigation";

import Home from "./screen/Home";
import Gits from "./screen/git";

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Git: { screen: Gits},
  },
  {
    headerMode:"none"
  }
);
export default AppNavigator;
