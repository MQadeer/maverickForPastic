import React, { Component } from 'react'
import { Text, View, BackHandler, ScrollView, Alert, Image } from 'react-native';
import {
    Button, Icon, Left, Header, Title,Content,Input,Item,Textarea,Label
} from "native-base";
import { styles } from './style';

export default class Report extends Component {
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
                    }}>Report</Title>
                </Header>
                <ScrollView>
                    <Content style={{marginTop:20,padding:10}}>
                        <Item style={{borderBottomColor:"#1BB9C4",borderBottomWidth:2 }}>
                            <Icon active name='home' />
                            <Input placeholder='Name'/>
                        </Item>
                        <Item>
                            <Icon active name='swap' />
                            <Textarea style={{
                            
                            }}  rowSpan={5} bordered placeholder="Complaint" />
                        </Item>
                    </Content>
                </ScrollView>
            </View>
        )
    }
}
