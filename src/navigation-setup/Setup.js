import React from "react";

import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import HomeScreen from "../screens/Home";
import History from "../screens/history";
import VerificationScreen from "../screens/verification"


import DrawerScreen from "../screens/Sidebar";

const HomeStack = createStackNavigator(
  {
    Homes: HomeScreen,
    History:History,
    Verification:VerificationScreen
  },
  {
    headerMode: "none"
  }
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    HomeStack: HomeStack
  },
  {
    contentComponent: props => <DrawerScreen {...props} />
  }
);

export default createAppContainer(MyDrawerNavigator);
