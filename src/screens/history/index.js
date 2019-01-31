import React, { Component } from 'react'
import { ImageBackground, Text, View, BackHandler, ScrollView,Alert } from 'react-native';
import {
    Button,
    Card, CardItem, Right
} from "native-base";
import { styles } from './style';
import AwesomeButton from 'react-native-really-awesome-button';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: true,
            medicine: {},
            user:{},
            location:{}

        };
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Homes');

            return true;
        });
        this.setState({
            medicine: this.props.navigation.getParam("medicine", {}),
            user:this.props.navigation.getParam("user", {})
        })
        Alert.alert("Notification","Click Verify Online button only if you are buying this Medicine")

    }

    componentWillUnmount() {
        this.backHandler.remove();

    }

    gotoOnlineVerification = () => {
        this.getLocation();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Text style={{
                        fontSize: 28, color: "white", padding: 10, textAlign: "center", fontFamily: 'Algerian',
                        backgroundColor: "#1BB9C4"
                    }}>Medicine Status</Text>
                </View>
                <ImageBackground source={require("../../media/back.jpeg")}
                    style={{ height: '100%', width: '100%' }}>
                    <View style={{ marginBottom: 20 }}>
                        <Card style={styles.cards}>
                            
                            <CardItem style={{ margin: 0, padding: 0, justifyContent: "center" }}>
                                {/* <Button
                                        light
                                        style={styles.cardBtn}
                                        onPress={()=>{this.props.navigation.navigate('Verification')}}
                                    >
                                        <Text style={{
                                            color: "white", fontWeight: 'bold', fontSize: 25, padding: 10
                                        }}> Verify Online </Text>

                                    </Button> */}
                                <AwesomeButton progress backgroundColor="#1BB9C4" style={{ color: "white" }}
                                    onPress={this.gotoOnlineVerification} >
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, backgroundColor: "#1BB9C4" }}>Verify Online</Text>
                                </AwesomeButton>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Medicine Name</Text>
                                    <Text style={styles.text}>{this.state.medicine.name}</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>No of Times Scanned </Text>
                                    <Text style={styles.text}>{this.state.medicine.scannedtimes }</Text>
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
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Company Name</Text>
                                    <Text style={styles.text}>{this.state.medicine.company}</Text>
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                </ImageBackground>
            </View>
        )
    }


    getLocation = () => {

        navigator.geolocation.getCurrentPosition((location) => {
            console.log("position is ", location)
            if(location){
                this.setState({
                    location:{latitude:location.coords.latitude,longitude:location.coords.longitude}
                })
                this.meddicineCheckRequest();
            }
        }, (err) => {
            console.log("err is ", err);
            Alert.alert("Network error", "check your internet connection and try again", [
                { text: "Ok", onPress: () => { this.props.navigation.navigate('Homes',
                {user:this.state.user,medicine:this.state.medicine})} }
            ]);
        },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }

    meddicineCheckRequest = () => {
        let DateObject = new Date;
        let currentDate = DateObject.toLocaleDateString();
        fetch('http://192.168.1.16:8888/checkMedicine',
            {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ medicineInfo: {info:this.state.medicine,buyingDate:currentDate,
                    location:this.state.location}, user: this.state.user}),
            }
        )
            .then(res => {
                console.log("res parsed  ",JSON.parse(res._bodyText));
                this.props.navigation.navigate('Verification',{ verifiedMedicine:JSON.parse(res._bodyText)})
            }).catch(err => {
               Alert.alert("Network error","Check Your internet connection or login again ",[
                   {text:"ok",onPress:()=>{this.props.navigation.navigate('Homes')}}
               ])
            })
    }
}
