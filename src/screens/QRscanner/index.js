import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, BackHandler,
    Linking,
} from 'react-native';
import {Header,Title,Right,Left,Button,Icon,Body} from 'native-base';
import styles from './style';
import QRCodeScanner from 'react-native-qrcode-scanner';


export default class QRscanner extends Component {
    constructor(props){
        super(props);
        this.state={
            user:{},
            medicine:{}
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Homes');
            return true;
        });
        this.setState({
            user:this.props.navigation.getParam("user", {})
        })
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    onSuccess(e) {
        Linking
        // .openURL(e.data)
        console.log("user  ",this.state.user);
        console.log("qrcode data  ",e.data);
        let decryptedData=JSON.parse(e.data);
        let scannedData = {
            name: decryptedData[0], company: decryptedData[1], MFG: decryptedData[2], expiry: decryptedData[3],
            batchId: decryptedData[4], packing: decryptedData[5], description: decryptedData[6], tagId: decryptedData[7], scannedtimes: decryptedData[8]
        }
        this.setState({
            medicine:scannedData
        })
        this.gotoOfflineScreen();
    }
    gotoOfflineScreen=()=>{
        this.props.navigation.navigate('Offline',{medicine: this.state.medicine, user: this.state.user });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.navigate('Homes') }}>
                            <Icon type="Ionicons" name="md-arrow-back" style={{ color: "#1BB9C4", fontSize: 40 }} />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{
                        fontSize: 28, color: "#1BB9C4", fontFamily: 'Algerian', alignSelf: "center"
                        // backgroundColor: "#1BB9C4"
                    }}>QRCode Scanner</Title>
                    </Body>
                </Header>
                <QRCodeScanner
                    showMarker={true}
                    reactivate={true}
                    reactivateTimeout={2000}
                    onRead={this.onSuccess.bind(this)}
                    // topContent={
                    //     <Text style={styles.centerText} >
                    //         Go to
                    // </Text>
                    // }
                    // bottomContent={
                    //     <View style={{ backgroundColor: '#777', width: '100%' }}>

                    //     </View>
                    // }
                />
            </View>
        );
    }
}


