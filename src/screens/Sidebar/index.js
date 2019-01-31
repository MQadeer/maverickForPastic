import React, { Component } from 'react';
import {
  Text,
  Image,
  BackHandler,
  ScrollView
} from 'react-native';
import { Content, ListItem, Left, Body, Button, View, Icon } from 'native-base';
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

  render() {


    return (
      <Content style={styles.sidebarWrapper} style={{ backgroundColor: "#fff", opacity: 1, }}>
        {console.log(this.props.screenProps)}
        <View style={{ backgroundColor: "#1BB9C4", alignItems: "center" }} >
          <Icon type="FontAwesome5" name="user-circle" style={{ fontSize: 30, color: "white", marginTop: 15 }} />
          <Text style={{
            fontSize: 23, color: "white", padding: 10, textAlign: "center",
            fontWeight: "bold", backgroundColor: "#1BB9C4"
          }}> {this.props.screenProps.user ? this.props.screenProps.user.name : this.state.message} </Text>
        </View>
        <Text style={{
          fontSize: 23, padding: 10, textAlign: "center", fontWeight: "bold",
        }}> History</Text>
        <Content>
          <ScrollView>
            {this.props.screenProps.medicineBought && this.props.screenProps.medicineBought.map((element) => {
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
            })}

            {/* <ListItem icon style={styles.barLinkContainer} onPress={() => this.props.navigation.navigate("Homes")}>
            <Left>
              <Button style={{ backgroundColor: "#1BB9C4" }}>
                <Icon active name="check" type="AntDesign" />
              </Button>
            </Left>
            <Body style={{ borderBottomWidth: 2, marginLeft: 15, borderBottomColor: "#1BB9C4" }}>
              <Text style={{ fontSize: 15 }}>Acefyl Cough Serup</Text>
              <Text style={{ fontSize: 15 }}>Scanned on : 18/12/2018</Text>
            </Body>
          </ListItem>
          <ListItem icon style={styles.barLinkContainer} onPress={() => this.props.navigation.navigate("Homes")}>
            <Left>
              <Button style={{ backgroundColor: "#1BB9C4" }}>
                <Icon active name="check" type="AntDesign" />
              </Button>
            </Left>
            <Body style={{ borderBottomWidth: 2, marginLeft: 15, borderBottomColor: "#1BB9C4" }}>
              <Text style={{ fontSize: 15 }}>Hydralin Cough Serup</Text>
              <Text style={{ fontSize: 15 }}>Scanned on : 03/01/2019</Text>
            </Body>
          </ListItem>
          <ListItem icon style={styles.barLinkContainer} onPress={() => this.props.navigation.navigate("Homes")}>
            <Left>
              <Button style={{ backgroundColor: "#1BB9C4" }}>
                <Icon active name="check" type="AntDesign" />
              </Button>
            </Left>
            <Body style={{ borderBottomWidth: 2, marginLeft: 15, borderBottomColor: "#1BB9C4" }}>
              <Text style={{ fontSize: 15 }}>Calmax </Text>
              <Text style={{ fontSize: 15 }}>Scanned on : 06/01/2019</Text>
            </Body>
          </ListItem> */}
          </ScrollView>
        </Content>
      </Content>
    );
  }
}
