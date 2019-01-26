import React, { Component } from 'react'
import { ImageBackground, Text, View, BackHandler, ScrollView } from 'react-native';
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
            modalVisible: false,
            progress: true

        };
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Homes');

            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();

    }

    gotoOnlineVerification = () => {
        setTimeout(() => {

            this.props.navigation.navigate('Verification')
        }, 3000)

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
                            <CardItem style={{ margin:0,padding:0, justifyContent: "center" }}>
                                {/* <Button
                                        light
                                        style={styles.cardBtn}
                                        onPress={()=>{this.props.navigation.navigate('Verification')}}
                                    >
                                        <Text style={{
                                            color: "white", fontWeight: 'bold', fontSize: 25, padding: 10
                                        }}> Verify Online </Text>

                                    </Button> */}
                                <AwesomeButton progress backgroundColor="#1BB9C4" style={{ textColor: "white" }}
                                    onPress={this.gotoOnlineVerification} >
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, backgroundColor: "#1BB9C4" }}>Verify Online</Text>
                                </AwesomeButton>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Medicine Name</Text>
                                    <Text style={styles.text}>Acefyl Cough Syrup</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Scanned</Text>
                                    <Text style={styles.text}>4 Times</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Manufacturing Date</Text>
                                    <Text style={styles.text}>10/2018</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Expiry</Text>
                                    <Text style={styles.text}>10/2020</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Batch ID</Text>
                                    <Text style={styles.text}>10634</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Company Name</Text>
                                    <Text style={styles.text}>Nabiqasim Industeries</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View>
                                    <Text style={styles.headText}>Company ID</Text>
                                    <Text style={styles.text}>144</Text>
                                </View>
                            </CardItem>
                            


                        </Card>
                    </View>
                </ImageBackground>

            </View>


        )
    }
}