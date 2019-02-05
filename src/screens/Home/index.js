import React, { Component } from "react";
import { ImageBackground, BackHandler, Image, Alert, ToastAndroid } from "react-native";
import NfcManager, { NdefParser, NfcTech } from 'react-native-nfc-manager';
import styles from "./style";
import {
  Text,
  Content,
  ListItem,
  Icon,
  View,
  Button,
  Left,
  Right,
  Header,
  Body,

  Title,

} from "native-base";
import Ripple from 'react-native-material-ripple';
import * as Animatable from "react-native-animatable";
import AwesomeButton from 'react-native-really-awesome-button';


function strToBytes(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i));
  }
  return result;
}
function buildTextPayload(valueToWrite) {
  const textBytes = strToBytes(valueToWrite);
  // in this example. we always use `en`
  const headerBytes = [0xD1, 0x01, (textBytes.length + 3), 0x54, 0x02, 0x65, 0x6e];
  return [...headerBytes, ...textBytes];
}

export default class Home extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      supported: false,
      enabled: false,
      isTestRunning: false,
      parsedText: null,
      tag: null,
      visible: false,
      checked: false,
      checkColors: ["5FFF49", "46FF2D", "#38FF1E", "#1DFF00"],
      checkColor: "white",
      tagVerified: false,
      user: {},
      progressAnimation: true
    };
  }
  componentDidMount() {
    NfcManager.isSupported()
      .then(supported => {
        this.setState({ supported: true });
        if (supported) {
          this.startNfc();
        }
      })
    this.setState({
      user: this.props.screenProps.user
    })
  }

  componentWillUnmount() {
    this.backHandler.remove();


  }

  closeDrawer = () => {
    this.props.navigation.closeDrawer();
  };
  openDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  showCheck = () => {

    if (true) {
      // this.setState({
      //   checked: true
      // })
      // setTimeout(() => {
      //   this.setState({
      //     checkColor: this.state.checkColors[0]
      //   })
      // }, 800);
      // setTimeout(() => {
      //   this.setState({
      //     checkColor: this.state.checkColors[1]
      //   })
      // }, 500);
      // setTimeout(() => {
      //   this.setState({
      //     checkColor: this.state.checkColors[2]
      //   })
      // }, 800);
      // setTimeout(() => {
      //   this.setState({
      //     checkColor: this.state.checkColors[2]
      //   })
      // }, 1000);
      // setTimeout(() => {
      //   this.props.navigation.navigate('History', { medicine: this.state.parsedText, user: this.state.user });
      //   this.setState({
      //     checked: false
      //   })
      // }, 1000)
      this.setState({
        progressAnimation: true
      })
      this.props.navigation.navigate('History', { medicine: this.state.parsedText, user: this.state.user });

    }
    else {
      Alert.alert(
        "Warning",
        "This Medicine is UnAuthorized"
      )
      this.state.cancelTest();
    }

  }
  render() {
    let { enabled, tag, parsedText, isTestRunning } = this.state;
    return (
      <View>
        {/* {!enabled && (alert("Please Turn on your Phones NFC First"))} */}
        {
          console.log("screen props are ", this.state.user)
        }
        <View >
          <Header style={{ backgroundColor: '#1BB9C4' }}>

            <Left>

              <Button transparent onPress={this.openDrawer}
                style={{}} >
                <Icon type="SimpleLineIcons"
                  name="menu" onPress={this.openDrawer} />
              </Button>
            </Left>
            <Body style={{ alignItems: 'center', marginRight: 70 }}>
              <Title style={{ fontSize: 20 }}>Home</Title>
            </Body>
          </Header>
        </View>


        <View style={styles.screenOverlay}>
          {isTestRunning && (<View>
            <Animatable.Image animation="fadeInDown" source={require("../../media/tutorial.gif")}
              style={styles.gifstyles} />
            <Animatable.Text animation="fadeInDown" style={{ fontSize: 17, marginTop: 5 }}>Tap your Phone on Medicine Bottle's Cap</Animatable.Text></View>
          )}
          {/* <Button
            light
            backgroundColor="#1BB9C4"
            style={styles.centeredBtn}
            onPress={() => this.runTest()}
          // onPress={this.props.navigation.navigate('Verification')}
          >
            {this.state.checked ? <Icon type="AntDesign" name="checkcircleo" style={{ color: this.state.checkColor, fontSize: 40 }}
            /> : <Ripple>
                <Text style={{ color: "white", fontWeight: 'bold', fontSize: 25, }}> IDENTIFY </Text></Ripple>}
          </Button> */}

          {!isTestRunning && (
            <AwesomeButton progress={false} width={150} borderRadius={5} backgroundColor="#1BB9C4"
              style={styles.centeredBtn}
              onPress={() => this.runTest()}><Text style={{ color: "white", fontWeight: 'bold', fontSize: 25, }}>Identify</Text></AwesomeButton>

          )}

          {/* {isTestRunning && (
            <View>
            <Image style={{height:300,width:280, marginLeft:70,marginTop:120,borderWidth:2,}} 
            source={require("../../media/tutorial.gif")}/>
            <Button
              light
              backgroundColor="#21DDE9"
              style={styles.centeredStopBtn}
              onPress={() => this.cancelTest()}>
              <Text style={{ color: "white", fontWeight: 'bold', fontSize: 25 }}>Stop</Text>
            </Button>
            </View>
          )} */}
        </View>
      </View>
    );
  }
  runTest = () => {

    const cleanUp = () => {
      this.setState({ isTestRunning: false });
      NfcManager.closeTechnology()
      NfcManager.unregisterTagEvent();
    }
    const parseText = (tag) => {
      if (tag.ndefMessage) {
        return NdefParser.parseText(tag.ndefMessage[0]);
      }
      return null;
    }
    const textToWrite = (text) => {
      this.state.parsedText.scannedtimes += 1;
      return JSON.stringify(text)
    }
    this.setState({
      isTestRunning: true,
      progressAnimation: false
    });
    NfcManager.registerTagEvent(tag => console.log(tag))
      .then(() => NfcManager.requestTechnology(NfcTech.Ndef))
      .then(() => NfcManager.getTag())
      .then(tag => {
      })
      .then(() => NfcManager.getNdefMessage())
      .then(tag => {
        console.log("tag set ", tag)
        let parsedText = parseText(tag);
        parsedText = JSON.parse(parsedText);
        parsedText.scannedtimes += 1;
        this.setState({ tag, parsedText });
        console.log("state tag ", this.state.tag);
        console.log("state text ", this.state.parsedText);
        return parsedText
      }).then((text) => { NfcManager.writeNdefMessage(buildTextPayload(JSON.stringify(text))) })
      .then(cleanUp)
      .then(() => {
        this.showCheck();
      })
  }
  cancelTest = () => {
    console.disableYellowBox = true;
    NfcManager.cancelTechnologyRequest();
    this.setState({ isTestRunning: false });
  }
  startNfc = () => {
    NfcManager.start()
      .then(() => NfcManager.isEnabled())
      .then(enabled => this.setState({ enabled }))
  }

}

