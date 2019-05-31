import React, { Component } from 'react'
import { Text, View, BackHandler, ScrollView, Alert, Image } from 'react-native';
import {
    Button, Icon, Left, Header, Title, Content, Input, Item, Form, Label, Right, Textarea, Body
} from "native-base";
import { styles } from './style';
import { config } from "../../config";

export default class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contact: '',
            med_name: '',
            batch_id: '',
            complain: '',
        }

    }

    handleInput = (evt) => {
        console.log(evt.target.value)
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit = () => {

        // alert(this.state.name)
        this.reportRequest();

        console.log(this.state)
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
                    <Left >

                        <Icon onPress={() => { this.props.navigation.navigate('Homes') }}
                            type="AntDesign" name="arrowleft" style={{ color: config.appColor, fontSize: 30 }} />

                    </Left>
                    <Body>
                        <Title style={{
                            fontSize: 28, color: config.appColor, fontFamily: 'Algerian', alignSelf: "center"
                            // backgroundColor: "#1BB9C4"
                        }}>Report</Title>
                    </Body>
                    <Right />
                    {/* <Title style={{
                        fontSize: 28, color: "#1BB9C4", fontFamily: 'Algerian', alignSelf: "center"
                        // backgroundColor: "#1BB9C4"
                    }}>Report</Title> */}
                </Header>
                <ScrollView>
                    <Content style={{ marginTop: 20, padding: 10 }}>
                        <Form>
                            <Item style={{ borderBottomColor: config.appColor, borderBottomWidth: 2, marginBottom: 10 }}>
                                {/* <Icon active name='home' /> */}
                                <Icon type="Ionicons" name="md-contact" style={{ color: config.appColor, fontSize: 20, }} />
                                {/* <Label>Name</Label> */}
                                <Input
                                    placeholder="Name"
                                    name="name"
                                    // onChange={this.handleInput.bind(this)}
                                    value={this.state.name}
                                    onChangeText={name =>
                                        this.setState({ name })
                                    }


                                />


                            </Item>
                            <Item style={{ borderBottomColor: config.appColor, borderBottomWidth: 2, marginBottom: 10 }}>
                                {/* <Icon active name='contact' /> */}
                                <Icon type="Entypo" name="old-phone" style={{ color: config.appColor, fontSize: 20, }} />
                                {/* <Label style={{marginLeft:8}}>Contact</Label> */}
                                <Input
                                    placeholder="Contact"
                                    name="contact"
                                    // onChange={this.handleInput}
                                    value={this.state.contact}
                                    onChangeText={contact =>
                                        this.setState({ contact })
                                    }
                                />
                            </Item>
                            <Item style={{ borderBottomColor: config.appColor, borderBottomWidth: 2, marginBottom: 10 }}>
                                <Icon type='FontAwesome5' name="prescription-bottle-alt" style={{ color: config.appColor, fontSize: 20, }} />
                                {/* <Label>Medcine</Label> */}
                                <Input
                                    placeholder='Medicine'
                                    name="med_name"
                                    // onChange={this.handleInput}
                                    value={this.state.med_name}
                                    onChangeText={med_name =>
                                        this.setState({ med_name })
                                    }
                                />
                            </Item>
                            <Item style={styles.item}>
                                <Icon type='FontAwesome5' name='id-card' style={{ color: config.appColor, fontSize: 20 }} />
                                {/* <Label>Batch ID</Label> */}
                                <Input
                                    placeholder="Batch ID"
                                    name="batch_id"
                                    // onChange={this.handleInput}
                                    value={this.state.batch_id}
                                    onChangeText={batch_id =>
                                        this.setState({ batch_id })
                                    }
                                />
                            </Item>
                            <Text style={{ marginLeft: 10, fontSize: 15 }}>
                                <Icon name="new-message" type="Entypo" />
                                Complain Box
                        </Text>
                            <Item
                                style={{ marginBottom: 10 }}

                            >

                                <Textarea
                                    rowSpan='5'
                                    style={{ width: '100%' }}
                                    bordered
                                    placeholder="Complain"
                                    value={this.state.complain}
                                    onChangeText={complain =>
                                        this.setState({ complain })
                                    }
                                />
                                {/* <Input
                            placeholder='complain' 
                            onChange={this.handleInput}
                            /> */}
                            </Item>
                            <Button
                                block
                                primary
                                onPress={this.handleSubmit}
                                style={{
                                    alignContent: "center", width: 200, alignSelf: "center", color: config.appColor,
                                    borderRadius: 5
                                }}
                            >
                                <Text
                                    style={{ color: 'white', fontSize: 20 }}
                                >Submit</Text>
                            </Button>
                        </Form>
                    </Content>
                </ScrollView>
            </View>
        )
    }
    reportRequest = () => {

        let DateObject = new Date;
        let currentDate = DateObject.toLocaleDateString();
        fetch(`http://${config.systemip}/report`,
            {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ report: this.state, date: currentDate }),
            }
        )
            .then(res => {
                console.log("res parsed  ", JSON.parse(res._bodyText));
                res._bodyText ? alert("Report submitted") : alert("Report submittion failed");
                this.props.navigation.navigate('Homes');
            }).catch(err => {
                console.log("report err ", err)
                Alert.alert("Network error", "Report not submitted , please Check Your internet connection", [
                    { text: "ok", onPress: () => { this.props.navigation.navigate('Homes') } }
                ])
            })
    }
}

