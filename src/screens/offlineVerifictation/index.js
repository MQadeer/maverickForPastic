import React, { Component } from 'react'
import { Text, View, BackHandler, ScrollView, Alert, Image } from 'react-native';
import {
    Button, Icon,
    Right, Left, Header, Title, Card, CardItem, Body,
} from "native-base";
import { styles } from './style';
import AwesomeButton from 'react-native-really-awesome-button';
import { config } from '../../config';
import store from '../../redux/store';
import Geocoder from 'react-native-geocoder';
import SendSMS from 'react-native-sms';

export default class Offline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: true,
            medicine: {},
            user: {},
            location: {}

        };
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Homes');

            return true;
        });
        this.setState({
            medicine: this.props.navigation.getParam("medicine", {}),
            user: this.props.navigation.getParam("user", {})
        })
        Alert.alert("Notification", "Click Verify Online button only if you are buying this Medicine")

    }

    componentWillUnmount() {
        this.backHandler.remove();

    }

    gotoOnlineVerification = () => {
        this.state.user.name ?  this.getLocation() : alert("login with an acount first the try online verification ")
        

    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.navigate('Homes') }}
                            style={{ }} >
                            <Icon type="Ionicons" name="md-arrow-back" style={{ color: config.appColor, fontSize: 40 }} />
                        </Button>
                    </Left>
                    <Body style={{alignContent:"center"}}>
                        <Title style={{
                            fontSize: 28, color: config.appColor, fontFamily: 'Algerian', alignSelf: "center"
                            // backgroundColor: "#1BB9C4"
                        }}>Medicine Status</Title>
                    </Body>
                        {/* <Right/> */}
                </Header>
                <ScrollView>
                    <View>
                        <View style={{}}>
                            {/* <Image source={require(`../../media/${this.state.medicine.company}.jpg`)} style={{ */}
                            <Image source={require('../../media/medLogo.png')} style={{
                                marginTop: 8
                                , alignSelf: "center", height: 120, width: 120, borderRadius: 100, borderColor: config.appColor, borderWidth: 5,
                            }} />
                            <Text style={{
                                fontSize: 24, color: "black", marginTop: 3,
                                fontFamily: 'Algerian', alignSelf: "center"
                            }}>{this.state.medicine.name}</Text>
                            <Text style={{
                                fontSize: 24,
                                fontFamily: 'Algerian', alignSelf: "center"
                            }}>{"By " + this.state.medicine.company}</Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "center" }}>
                            <View style={{ borderRightWidth: 2, borderRightColor: config.appColor }}>
                                <Text style={{ marginRight: 20, color: "black", fontSize: 18, }}>Scanned  </Text>
                                <Text style={{ marginRight: 20, alignSelf: "center", fontSize: 15, }}>{this.state.medicine.scannedtimes + " Times"} </Text>
                            </View>
                            <View >
                                <Text style={{ marginLeft: 25, color: "black", fontSize: 18, }}>Packing </Text>
                                <Text style={{ marginLeft: 25, fontSize: 15, alignSelf: "center" }}>{this.state.medicine.packing} </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 18, justifyContent: "center" }}>
                            <AwesomeButton
                                // disabled={this.state.user.name ? false : true}
                                progress backgroundColor={config.appColor} height={40} width={160} borderRadius={20} style={{
                                    alignSelf: "center",
                                    color: "white"
                                }}
                                onPress={this.gotoOnlineVerification} >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, backgroundColor: config.appColor }}>Verify Online</Text>
                            </AwesomeButton>
                        </View>
                        <View style={{ marginTop: 18, justifyContent: "center" }}>
                            <AwesomeButton
                                progress backgroundColor={config.appColor} height={40} width={160} borderRadius={20} style={{
                                    alignSelf: "center",
                                    color: "white"
                                }}
                                onPress={this.verifyBySms} >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, backgroundColor:config.appColor }}>Verify By SMS</Text>
                            </AwesomeButton>
                        </View>
                        <Card transparent style={styles.cards}>


                            <CardItem style={styles.carditems}>
                                <View style={{}}>
                                    <Text style={styles.headText}>Description </Text>
                                    <Text style={styles.text}>{this.state.medicine.description}</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Manufacturing Date</Text>
                                    <Text style={styles.text}>{this.state.medicine.MFG}</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Expiry</Text>
                                    <Text style={styles.text}>{this.state.medicine.expiry}</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Batch ID</Text>
                                    <Text style={styles.text}>{this.state.medicine.batchId}</Text>
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                </ScrollView>
            </View>
        )
    }


    getLocation = () => {

        navigator.geolocation.getCurrentPosition((location) => {
            console.log("position is ", location)
            if (location) {
                let NY = {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                };
                Geocoder.geocodePosition(NY).then(response => {
                    // res is an Array of geocoding object (see below)
                    console.log("position  response ", response[0].locality, response[0].country);
                    this.setState({
                        location: {
                            latitude: location.coords.latitude, longitude: location.coords.longitude,
                            locationName: response[0].locality, country: response[0].country
                        }
                    })
                }).then(() => {
                    this.meddicineCheckRequest();
                })
                    .catch(err => console.log(err))
            }
        }, (err) => {
            console.log("err is ", err);
            Alert.alert("Network error", "check your internet connection and try again", [
                {
                    text: "Ok", onPress: () => {
                        this.props.navigation.navigate('Homes',
                            { user: this.state.user, medicine: this.state.medicine })
                    }
                }
            ]);
        },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
        )
    }

    meddicineCheckRequest = () => {

        let DateObject = new Date;
        let currentDate = DateObject.toLocaleDateString();
        fetch(`http://${config.systemip}/checkMedicine`,
            // fetch(`https://maverickbackend.azurewebsites.net/checkMedicine`,
            {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    medicineInfo: {
                        info: this.state.medicine, buyingDate: currentDate,
                        location: this.state.location,
                        hash: ''
                    }, user: this.state.user
                }),
            }
        )
            .then(res => {
                console.log("res parsed  ", JSON.parse(res._bodyText));
                this.props.navigation.navigate('Verification', { verifiedMedicine: JSON.parse(res._bodyText) })
            }).catch(err => {
                Alert.alert("Network error", "Check Your internet connection or login again ", [
                    { text: "ok", onPress: () => { this.props.navigation.navigate('Homes') } }
                ])
            })
    }
    verifyBySms=()=>{
        SendSMS.send({
            body:this.state.medicine.tagId ,
            recipients: ['03044160930'],
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
        }, (completed, cancelled, error) => {
            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        })
    }
}
