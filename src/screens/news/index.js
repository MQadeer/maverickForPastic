import React, { Component } from 'react'
import { Text, View, BackHandler, ScrollView, Alert, Image } from 'react-native';
import {
    Button, Icon,Left, Header, Title, Card, CardItem,
} from "native-base";
import { styles } from './style';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updates: {}
        }

    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Homes');
            return true;
        });
        this.setState({
            updates: this.props.navigation.getParam("verifiedMedicine", {}),
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
                    }}>Community Updates</Title>
                </Header>
                <ScrollView>
                    <View>
                        <Card transparent style={styles.cards}>
                            <CardItem style={styles.carditems}>
                                <View style={{}}>
                                    <Text style={styles.headText}>Status </Text>
                                    <Text style={styles.text}></Text>
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                </ScrollView>

            </View>
        )
    }
}
