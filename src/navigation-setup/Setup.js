import React from "react";

import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import HomeScreen from "../screens/Home";
import Offline from "../screens/offlineVerifictation/index";
import VerificationScreen from "../screens/verification";
import News from "../screens/news/index";


import DrawerScreen from "../screens/Sidebar";

const HomeStack = createStackNavigator(
  {
    Homes: HomeScreen,
    Offline:Offline,
    Verification:VerificationScreen,
    News:News,
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
