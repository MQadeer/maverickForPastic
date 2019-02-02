import React, { Component } from 'react'
import { Text, View, BackHandler, ScrollView, Alert, Image } from 'react-native';
import {
    Button, Icon,
    Right, Left, Header, Title, Card, CardItem,
} from "native-base";
import { Divider } from 'react-native-elements'
import { Row, Col, Grid } from 'react-native-easy-grid'
import { styles } from './style';
import AwesomeButton from 'react-native-really-awesome-button';

export default class index extends Component {
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
        this.getLocation();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.navigate('Homes') }}
                            style={{ marginLeft: -50 }} >
                            <Icon type="Ionicons" name="md-arrow-back" style={{ color: "#1BB9C4", fontSize: 40 }} />
                        </Button>
                    </Left>
                    <Title style={{
                        fontSize: 28, color: "#1BB9C4", fontFamily: 'Algerian', alignSelf: "center"
                        // backgroundColor: "#1BB9C4"
                    }}>Medicine Status</Title>
                </Header>
                <ScrollView>
                <View>
                    <View style={{}}>
                        
                        {/* <Image source={require("'../../media/",this.state.medicine.company,".jpg'")} style={{ */}
                        <Image source={require('../../media/Qarshi.jpg')} style={{
                            marginTop: 8
                            , alignSelf: "center", height: 120, width: 120, borderRadius: 100, borderColor: '1BB9C4', borderWidth: 5,
                        }} />
                        <Text style={{
                            fontSize: 24, color: "black", marginTop: 3,
                            fontFamily: 'Algerian', alignSelf: "center"
                        }}>{this.state.medicine.name}</Text>
                        <Text style={{
                            fontSize: 24, 
                            fontFamily: 'Algerian', alignSelf: "center"
                        }}>{"By "+this.state.medicine.company}</Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "center" }}>
                        <View style={{ borderRightWidth: 2, borderRightColor: "#95a5a6" }}>
                            <Text style={{ marginRight: 20, color: "black", fontSize: 18, }}>Scanned  </Text>
                            <Text style={{ marginRight: 20, alignSelf: "center", fontSize: 15, }}>{this.state.medicine.scannedtimes+" Times"} </Text>
                        </View>
                        <View >
                            <Text style={{ marginLeft: 25, color: "black", fontSize: 18, }}>Packing </Text>
                            <Text style={{ marginLeft: 25, fontSize: 15, alignSelf: "center" }}>{this.state.medicine.packing} </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 18, justifyContent: "center" }}>
                        <AwesomeButton progress backgroundColor="#1BB9C4" height={40} width={160} borderRadius={20} style={{
                            alignSelf: "center",
                            color: "white"
                        }}
                            onPress={this.gotoOnlineVerification} >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, backgroundColor: "#1BB9C4" }}>Verify Online</Text>
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
                this.setState({
                    location: { latitude: location.coords.latitude, longitude: location.coords.longitude }
                })
                this.meddicineCheckRequest();
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
                body: JSON.stringify({
                    medicineInfo: {
                        info: this.state.medicine, buyingDate: currentDate,
                        location: this.state.location
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
}
