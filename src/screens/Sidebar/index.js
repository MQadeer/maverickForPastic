import React, { Component } from 'react';
import {
  Text,
  Image,
  BackHandler,
  ScrollView
} from 'react-native';
import { Content, ListItem, Left, Body, Button, View, Icon,Label } from 'native-base';
import { styles } from './style';


export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "user not logedin "

    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.closeDrawer();
      return true;
    });
    this.setState({
      userHistory: this.props.screenProps.medicineBought
    })
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  gotoNews = () => {
    this.props.navigation.navigate("News");
  }
  gotoReport = () => {
    this.props.navigation.navigate("Report");
  }
  render() {


    return (
      <Content style={styles.sidebarWrapper} style={{ backgroundColor: "#fff", opacity: 1, }}>
        <View style={{ backgroundColor: "#1BB9C4", alignItems: "center",height:150}} >
          <Icon type="FontAwesome5" name="user-circle" style={{ fontSize: 40, color: "white", marginTop: 20 }} />
          <Text style={{
            fontSize: 23, color: "white", padding: 10, textAlign: "center",
            fontWeight: "bold", backgroundColor: "#1BB9C4"
          }}> {this.props.screenProps.user ? this.props.screenProps.user.name : this.state.message} </Text>
        </View>
        {/* <Text style={{
          fontSize: 23, padding: 10, textAlign: "center", fontWeight: "bold",
        }}> History</Text> */}
        <Content style={{marginTop:15}}>
          <ScrollView>
            {/* {this.props.screenProps.medicineBought && this.props.screenProps.medicineBought.map((element) => {
              return <ListItem icon style={styles.barLinkContainer} onPress={() => this.props.navigation.navigate("Homes")}>
                <Left>
                  <Button style={{ backgroundColor: "#1BB9C4" }}>
                    <Icon active name="check" type="AntDesign" />
                  </Button>
                </Left>
                <Body style={{ borderBottomWidth: 2, marginLeft: 15, borderBottomColor: "#1BB9C4" }}>
                  <Text style={{ fontSize: 15 }}>{element.info.name}</Text>
                  <Text style={{ fontSize: 15 }}>Bought on :{element.buyingDate}</Text>
                </Body>
              </ListItem>
            })} */}

            <ListItem icon style={styles.barLinkContainer} onPress={() => this.props.navigation.navigate("Homes")}>
              <Left>
                <Button transparent onPress={this.gotoNews}
                  style={{}} >
                  <Icon type="FontAwesome" style={{ fontSize: 25, color: "#1BB9C4" }}
                    name="newspaper-o" onPress={this.gotoNews} />
                </Button>
              </Left>
              <Body style={{ }} onPress={this.gotoNews}>
                <Text style={{ fontSize: 20, alignSelf: 'center' }} onPress={this.gotoNews}>News</Text>

              </Body>
            </ListItem>
            <ListItem icon style={styles.barLinkContainer} onPress={() => this.props.navigation.navigate("Homes")}>
              <Left>
                <Button transparent onPress={this.gotoReport}
                  style={{}} >
                  <Icon type="MaterialIcons" name='report' style={{ fontSize: 32, color: "#1BB9C4" }}
                     onPress={this.gotoReport} />
                </Button>
              </Left>
              <Body style={{ }}>
                <Text style={{ fontSize: 20, alignSelf: 'center' }} onPress={this.gotoReport}>Report</Text>

              </Body>
            </ListItem>

          </ScrollView>
        </Content>
      </Content>
    );
  }
}
