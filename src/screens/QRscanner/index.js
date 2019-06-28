import React, { Component } from 'react';

import {
    Text,
    View, BackHandler,
    Linking, Alert, Dimensions
} from 'react-native';
import { Header, Title, Right, Left, Button, Icon, Body } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import SendSMS from 'react-native-sms';
import Geocoder from 'react-native-geocoder';
import { config } from '../../config';



export default class QRscanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            medicine: {},
            qrData: "",
            modalVisible: false
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Homes');
            return true;
        });
        this.setState({
            user: this.props.navigation.getParam("user", {})
        })
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    onSuccess(e) {
        Linking
        type:
        Alert.alert("QRCode Data", e.data, [
            {
                text: "Verify online", onPress: () => {
                    // store.dispatch({
                    //     type: "QRverifyOnline",
                    //     payload: { medInfo: e.data, user: this.state.user },
                    // })
                    let payload = { medInfo: e.data, user: this.state.user }
                    this.verifyOnline(payload)
                }
            }, {
                text: "Verify on SMS", onPress: () => {
                    SendSMS.send({
                        body: e.data,
                        recipients: ['03044160930'],
                        successTypes: ['sent', 'queued'],
                        allowAndroidSendWithoutReadPermission: true
                    }, (completed, cancelled, error) => {
                        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
                    })

                }
            }
        ]);
        this.setState({
            qrData: e.data,
            modalVisible: true
        })
        this.gotoOfflineScreen();
    }
    gotoOfflineScreen = () => {
        this.props.navigation.navigate('Homes', { user: this.state.user });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.navigate('Homes') }}>
                            <Icon type="Ionicons" name="md-arrow-back" style={{ color: config.appColor, fontSize: 40 }} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center', alignContent: 'center' }}>
                        <Title style={{
                            fontSize: 28, color: config.appColor, fontFamily: 'Algerian', alignSelf: "center",
                            alignContent: 'center', justifyContent: 'center'
                            // backgroundColor: "#1BB9C4"
                        }}>QR
                        <Text style={{
                                fontSize: 28, color: config.appColor, fontFamily: 'Algerian',
                                alignSelf: "center", fontSize: 20
                            }}>  Scanner</Text>
                        </Title>
                    </Body>
                </Header>
                {/* <Modal visible={this.state.modalVisible}>
                    <Text>{this.state.qrData}</Text>
                </Modal> */}
                <QRCodeScanner
                    showMarker={true} fadeIn={true} cameraStyle={{ height: Dimensions.get('window').height }}
                    reactivate={true}
                    reactivateTimeout={2000}
                    onRead={this.onSuccess.bind(this)}
                />
            </View>
        );
    }
    verifyOnline = (payload) => {
        this.getLocation(payload.medInfo, payload.user);
    }

    getLocation = (medInfo, user) => {

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

                    let currentLocation = {
                        latitude: location.coords.latitude, longitude: location.coords.longitude,
                        locationName: response[0].locality, country: response[0].country
                    }
                    return currentLocation;
                }).then((currentLocation) => {
                    this.meddicineCheckRequest(medInfo, currentLocation, user);
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

    meddicineCheckRequest = (medInfo, currentLocation, user) => {
        let DateObject = new Date;
        let currentDate = DateObject.toLocaleDateString();
        fetch(`http://${config.systemip}/QRCheckMedicine`,
            // fetch(`https://maverickbackend.azurewebsites.net/checkMedicine`,
            {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    medicineInfo: {
                        info: medInfo, buyingDate: currentDate,
                        location: currentLocation,
                        hash: ''
                    }, user: user
                }),
            }
        )
            .then(res => {
                console.log("res parsed  QR response ", JSON.parse(res._bodyText));
                if (JSON.parse(res._bodyText) == false) {
                    alert("This Product is UnAuthorized")
                } else {
                    this.props.navigation.navigate('Verification', { verifiedMedicine: JSON.parse(res._bodyText) })
                }
            }).catch(err => {
                Alert.alert("Network error", "Check Your internet connection or login again ", [
                    { text: "ok", onPress: () => { this.props.navigation.navigate('Homes') } }
                ])
            })
    }
}

