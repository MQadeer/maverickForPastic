import React, { Component } from "react";
import { Modal, BackHandler, Image, Alert, ToastAndroid,StatusBar } from "react-native";
import NfcManager, { NdefParser, NfcTech, nfcManager } from 'react-native-nfc-manager';
import { AES, enc, } from 'react-native-crypto-js';
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
import { Grid, Col, Row } from 'react-native-easy-grid';
import * as Animatable from "react-native-animatable";
import AwesomeButton from 'react-native-really-awesome-button';
import { config } from '../../config';

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
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {

      return true;
    });
    NfcManager.isSupported()
      .then(supported => {
        this.setState({ supported: true });
        if (supported) {
          // this.startNfc();
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

    if (this.state.tag.id == this.state.parsedText.tagId) {
      console.log("its show check");

      this.cancelTest();
      this.setState({
        progressAnimation: true,
      })
      this.props.navigation.navigate('Offline', { medicine: this.state.parsedText, user: this.state.user });
    }
    else {
      Alert.alert(
        "Warning",
        "This Product is UnAuthorized"
      )
      this.state.cancelTest();
    }

  }
  closeModal() {
    // this.cancelTest();
    this.setState({ modalVisible: false, isTestRunning: false });
    NfcManager.closeTechnology()
    NfcManager.unregisterTagEvent();
  }
  gotoQRscanner = () => {
    this.props.navigation.navigate('QRscanner', { user: this.state.user });
  }

  render() {
    let { enabled, tag, parsedText, isTestRunning } = this.state;
    return (
      <View>
        <StatusBar backgroundColor="red"></StatusBar>
        {/* {!enabled && (alert("Please Turn on your Phones NFC First"))} */}
        <Modal
          animationType="slide"
          style={{ backgroundColor: "white" }}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.closeModal()
          }}>
          <View style={{ marginTop: 10 }}>
            {/* <Animatable.Image animation="fadeInDown" source={require("../../media/tutorial.gif")}
              style={styles.gifstyles} /> */}

            <Button onPress={() => { this.closeModal() }} style={{
              backgroundColor: config.appColor,
            }}>
              <Icon type="MaterialCommunityIcons" name="window-close" onPress={() => { this.closeModal() }}
                style={{ color: "white", fontSize: 20 }}>
              </Icon>
            </Button>
            <Text style={{ fontSize: 17, marginTop: 10 }}>Tap your Phone on Medicine Bottle's Cap</Text>
            <Image source={require("../../media/tutorial.gif")} style={styles.gifstyles} />
            {/* <Animatable.Text animation="fadeInDown" style={{ fontSize: 17, marginTop: 10 }}>Tap your Phone on Medicine Bottle's Cap</Animatable.Text> */}

          </View>

        </Modal>
        <View >
          <Header style={{ backgroundColor: config.appColor }}>

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

          {/* {isTestRunning && (<View style={{ marginTop: 7 }}>
            <Animatable.Image animation="fadeInDown" source={require("../../media/tutorial.gif")}
              style={styles.gifstyles} />
            <Animatable.Text animation="fadeInDown" style={{ fontSize: 17, marginTop: 10 }}>Tap your Phone on Medicine Bottle's Cap</Animatable.Text></View>
          )} */}

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
            <Grid>
              <Col style={{ alignItems: "center" }}>
                {this.state.supported && <AwesomeButton progress={false} width={140} borderRadius={5} backgroundColor= {config.appColor}
                  style={styles.centeredBtn}
                  onPress={() => this.runTest()}><Text style={{ color: "white",  fontSize: 18,fontFamily:"notoserif" }}>Scan</Text>
                  <Text style={{ color: "white", fontWeight: 'bold', fontSize: 22,fontFamily:'notoserif'}}> NFC</Text></AwesomeButton>}
              </Col>
              <Col style={{ alignItems: "center" }}>
                <AwesomeButton progress={false} width={140} borderRadius={5} backgroundColor={config.appColor}
                  style={styles.centeredBtn}
                  onPress={() => this.gotoQRscanner()}><Text style={{ color: "white", fontSize: 18, }}>Scan</Text>
                  <Text style={{ color: "white", fontWeight: 'bold', fontSize: 25, }}> QR</Text></AwesomeButton>
              </Col>
            </Grid>
          )}


        </View>
      </View>
    );
  }
  runTest = () => {
    const cleanUp = () => {
      this.setState({ isTestRunning: false, });
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
      progressAnimation: false,
      modalVisible: true
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
        // parsedText = JSON.parse(parsedText);
        let bytes = AES.decrypt(parsedText, config.encryptionKey);
        let decryptedData = JSON.parse(bytes.toString(enc.Utf8));
        console.log("decryptedData  ", decryptedData);
        decryptedData[8] += 1;
        let parsedTextObj = {
          name: decryptedData[0], company: decryptedData[1], MFG: decryptedData[2], expiry: decryptedData[3],
          batchId: decryptedData[4], packing: decryptedData[5], description: decryptedData[6], tagId: decryptedData[7], scannedtimes: decryptedData[8]
        }
        console.log("parsed obj  ", parsedTextObj);
        this.setState({
          tag,
          parsedText: parsedTextObj
        });
        console.log("state tag ", this.state.tag);
        console.log("state parsedtext ", this.state.parsedText);
        return decryptedData
      }).then((text) => {
        let encrytedData = AES.encrypt(JSON.stringify(text), config.encryptionKey);
        NfcManager.writeNdefMessage(buildTextPayload(encrytedData.toString()))
      })
      .then(cleanUp)
      .then(() => {
        this.showCheck();
      }).catch(err => {
        if (err) {
          this.setState({
            modalVisible: false, isTestRunning: false
          });
          alert("NFC Tag is corrupted or not from authorized company", err);
          cleanUp();
        }
      })
  }
  cancelTest = () => {
    // console.disableYellowBox = true;
    this.setState({ isTestRunning: false, modalVisible: false });
    // NfcManager.cancelTechnologyRequest();
    NfcManager.closeTechnology()
    NfcManager.unregisterTagEvent();
  }

  startNfc = () => {
    NfcManager.start()
      .then(() => NfcManager.isEnabled())
      .then(enabled => this.setState({ enabled }))
  }

}

