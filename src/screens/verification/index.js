import React, { Component } from 'react'
import { Text, View, BackHandler, ScrollView, Alert, Image } from 'react-native';
import {
    Button, Icon,
    Right, Left, Header, Title, Card, CardItem,
} from "native-base";
import { styles } from './style';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state={
           medicine:{}
        }

    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Homes')
            return true;
        });
        this.setState({
            medicine:this.props.navigation.getParam("verifiedMedicine",{}),
        })
    }

    componentWillUnmount() {
        this.backHandler.remove();
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
                    }}>Online Status</Title>
                </Header>
                <ScrollView>
                    <View>
                        <Card transparent style={styles.cards}>
                        <CardItem style={styles.carditems}>
                                <View style={{}}>
                                    <Text style={styles.headText}>Status </Text>
                                    <Text style={styles.text}>{this.state.medicine.status}</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.carditems}>
                                <View style={{}}>
                                    <Text style={styles.headText}>Sold On  </Text>
                                    <Text style={styles.text}>{this.state.medicine.soldOnDate}</Text>
                                </View>
                            </CardItem>
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
}
