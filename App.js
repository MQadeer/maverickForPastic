/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation-setup/Setup";
import Login from './src/login/login';
import Home from "./src/screens/Home";
import SplashScreen from "./src/screens/splashScreen";
import { Container } from "native-base";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splashScreen: true
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        splashScreen: false
      });
    }, 4000);
  }

  render() {
    return (
      <Container>
        {this.state.splashScreen ? <SplashScreen /> : <Login />}
      </Container>
    );
  }
}
