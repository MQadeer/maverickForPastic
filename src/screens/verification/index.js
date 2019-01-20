import React, { Component } from 'react'
import { ImageBackground, Text, View, BackHandler, ScrollView } from 'react-native';
import {
    Content,
    ListItem,
    Icon, Button,
    Left,
    Body,
    Card, CardItem, Right
} from "native-base";
import { styles } from './style';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,

        };
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Homes')
            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Text style={{
                        fontSize: 28, color: "white", padding: 10, textAlign: "center", fontFamily: 'Algerian',
                        backgroundColor: "#1BB9C4"
                    }}>Online Status</Text>
                </View>
                <ImageBackground source={require("../../media/back.jpeg")}
                    style={{ height: '100%', width: '100%' }}>
                    <View style={{ marginBottom:50}}>
                        <Card style={styles.cards}>
                            <ScrollView>
                                <CardItem style={styles.carditems}>
                                    <View>
                                        <Text style={styles.headText}>Status</Text>
                                        <Text style={styles.text}>Used</Text>
                                    </View>
                                </CardItem>
                                <CardItem style={styles.carditems}>
                                    <View>
                                        <Text style={styles.headText}>Medicine Name</Text>
                                        <Text style={styles.text}>Acefyl Cough Syrup</Text>
                                    </View>
                                </CardItem>
                                <CardItem style={styles.carditems}>
                                    <View>
                                        <Text style={styles.headText}>Manufacturing Date</Text>
                                        <Text style={styles.text}>10-Jan-2018</Text>
                                    </View>
                                </CardItem>
                                <CardItem style={styles.carditems}>
                                    <View>
                                        <Text style={styles.headText}>Expiry</Text>
                                        <Text style={styles.text}>10-jan-2020</Text>
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
                                        <Text style={styles.text}>1474</Text>
                                    </View>
                                </CardItem>
                                <CardItem style={styles.carditems}>
                                    <View>
                                        <Text style={styles.headText}>No Of Times Scanned</Text>
                                        <Text style={styles.text}>4</Text>
                                    </View>
                                </CardItem>
                                

                            </ScrollView>
                        </Card>
                    </View>
                </ImageBackground>

            </View>




        )
    }
}
