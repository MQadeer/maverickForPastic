import React, { Component } from "react";
import { ImageBackground, BackHandler, Image, Alert } from "react-native";
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
import Video from 'react-native-video';

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
      tagVerified:false
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
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.closeDrawer();
      return true;
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
  // setModalVisible(visible) {
  //   this.setState({modalVisible: visible});
  //   setTimeout(()=>{
  //     this.setState({
  //       modalVisible:false
  //     })
  //     this.props.navigation.navigate('History');
  //   },3000)

  // }
  showCheck = () => {
    if(this.state.tag.type=="NDEF"){
      this.setState({
        checked: true
      })
      setTimeout(() => {
        this.setState({
          checkColor: this.state.checkColors[0]
        })
      }, 800);
      setTimeout(() => {
        this.setState({
          checkColor: this.state.checkColors[1]
        })
      }, 500);
      setTimeout(() => {
        this.setState({
          checkColor: this.state.checkColors[2]
        })
      }, 800);
      setTimeout(() => {
        this.setState({
          checkColor: this.state.checkColors[2]
        })
      }, 1000);
      setTimeout(() => {
        this.props.navigation.navigate('History');
        this.setState({
          checked: false
        })
      }, 1000)  
    }
    else{
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
        <View >
          <Header style={{ backgroundColor: '#1BB9C4' }}>

            <Left>

              <Button transparent onPress={this.openDrawer}>
                <Icon type="SimpleLineIcons"
                  name="menu" onPress={this.openDrawer} />
              </Button>
            </Left>
            <Body style={{ alignItems: 'center', marginRight: 70 }}>
              <Title style={{ fontSize: 20 }}>Home</Title>
            </Body>
            {/* <Right>
              <Button transparent>
                <Icon
                  type="MaterialCommungityIcons"
                  name="menu"
                  onPress={() => this.props.navigation.navigate('History')}
                />
              </Button>
            </Right> */}
          </Header>
        </View>

        {/* <Image
            style={{height:200,width:200, marginLeft:100,marginTop:120}} 
            source={require("../../media/logo.png")}/> */}



        <View style={styles.screenOverlay}>

          <Video source={require("../../media/animation.mp4")}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}
            repeat
            style={styles.backgroundVideo} />

          {/* <Image style={{ height: 300, width: 280, marginLeft: 70, borderWidth: 2, }}
            source={require("../../media/tutorial.gif")} /> */}
          <Ripple onPress={() => setTimeout(() => {
            this.runTest()
          }, 200)}>
            <Button
              light
              backgroundColor="#1BB9C4"
              style={styles.centeredBtn}
              onPress={() => this.runTest()}
            >
              {this.state.checked ? <Icon type="AntDesign" name="checkcircleo" style={{ color: this.state.checkColor, fontSize: 40 }}
              /> : <Ripple>
                  <Text style={{ color: "white", fontWeight: 'bold', fontSize: 25, }}> IDENTIFY </Text></Ripple>}
            </Button></Ripple>
          {/* {!isTestRunning && (
             <View>
             <Image style={{height:300,width:280, marginLeft:70,borderWidth:2,}} 
             source={require("../../media/tutorial.gif")}/>
           <Ripple onPress={() => setTimeout(()=>{
            this.runTest()
           },200)}>
           <Button
              light
              backgroundColor="#21DDE9"
              style={styles.centeredBtn}
              onPress={() => this.runTest()}
            >
            {this.state.checked ? <Icon  type="AntDesign" name="checkcircleo" style={{color:this.state.checkColor,fontSize:80}} 
            /> :<Ripple>
              <Text style={{ color: "white", fontWeight: 'bold', fontSize: 35 }}> Start </Text></Ripple>}
            </Button></Ripple></View>
          )} */}

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
          {/* <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={this.requestServer.bind(this)}>
              <Text style={{ color: 'blue' }}>request server </Text>
            </TouchableOpacity> */}
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
    this.setState({ isTestRunning: true });
    NfcManager.registerTagEvent(tag => console.log(tag))
      .then(() => NfcManager.requestTechnology(NfcTech.Ndef))
      .then(() => NfcManager.getTag())
      .then(tag => {
        this.setState({ tag });
      })
      .then(() => NfcManager.getNdefMessage())
      .then(tag => {
        let parsedText = parseText(tag);
        let text=JSON.parse(parsedText);
        text.scannedtimes+=1;
        this.setState({  parsedText:text });
        console.log("state text ", this.state.parsedText);
        // this.setModalVisible(!this.state.modalVisible);
        // this.props.navigation.navigate('History');
        this.showCheck();
      })
      .then(cleanUp)

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
  
  requestServer = () => {
    let DateObject = new Date;
    let currentDate = DateObject.toLocaleDateString();
    fetch('http://192.168.1.6:8888/checkSyrup',
      {
        method: "POST",
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: this.state.parsedText, user: this.props.user, CurrentTime: currentDate }),
      }
    )
      .then(res => {
        alert(JSON.stringify(JSON.parse(res._bodyInit.body)));
        //res.json();
      })
      // .then(info => {
      //   alert(JSON.stringify( info._bodyInit))
      // })
      .catch(err => {
        alert(err)
      })
  }
}

