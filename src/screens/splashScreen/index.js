import React, { Component } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { styles } from "./styles";
export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{flex:1,justifyContent:'center'}}>
      <Image
        source={require("../../media/splashscreen.jpg")}
        style={{ width: 250, height: 200,marginTop:50,marginLeft:60 }}
      />
      </View>
    );
  }
}
