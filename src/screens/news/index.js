import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Left, Right, Icon, Title, Item, Input, View } from 'native-base';
import { config } from '../../config';


export default class News extends Component {
    state = {
        news: [],
        reports: [
            // {
            //     medName: 'tyno',
            //     date: '10-Dec-2016',
            //     batch_id: 3434,
            //     issue: " NativeBase is a free and open source framework that enable  developers to build high-quality mobile apps using React Native iOS and Android apps  with a fusion of ES6."
            // },
            // {
            //     medName: 'myPickin',
            //     date: '13-Feb-2016',
            //     batch_id: 3674,
            //     issue: " NativeBase is a free and open source framework that enable  developers to build high-quality mobile apps using React Native iOS and Android apps  with a fusion of ES6."
            // },
            // {
            //     medName: 'resochin',
            //     date: '10-Jan-2013',
            //     batch_id: 9934,
            //     issue: " NativeBase is a free and open source framework that enable  developers to build high-quality mobile apps using React Native iOS and Android apps  with a fusion of ES6."
            // },
            // {
            //     medName: 'cox2',
            //     date: '10-Dec-2016',
            //     batch_id: 4534,
            //     issue: " NativeBase is a free and open source framework that enable  developers to build high-quality mobile apps using React Native iOS and Android apps  with a fusion of ES6."
            // },
            // {
            //     medName: 'tyno',
            //     date: '10-Nov-2015',
            //     batch_id: 9484,
            //     issue: " NativeBase is a free and open source framework that enable  developers to build high-quality mobile apps using React Native iOS and Android apps  with a fusion of ES6."
            // }
        ],
        searched: []
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Homes');
            return true;
        });
        this.getNews();
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleSearch(evt) {
        console.log(evt.target.value)
        let { reports } = this.state;
        let searchedItem = reports.filter((report) => {
            return report.medName === evt.target.value
        })
        console.log(searchedItem)
        this.setState({
            searched: searchedItem
        })
    }
    render() {
        let { reports, searched } = this.state;

        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left >

                        <Icon onPress={() => { this.props.navigation.navigate('Homes') }}
                            type="AntDesign" name="arrowleft" style={{ color: config.appColor, fontSize: 30 }} />

                    </Left>
                    <Body>
                        <Title style={{
                            fontSize: 28, color: config.appColor, fontFamily: 'Algerian', alignSelf: "center"
                            // backgroundColor: "#1BB9C4"
                        }}>News</Title>
                    </Body>
                    <Right />

                </Header>

                <Content padder>
                    <Item>
                        <Icon active name='search' />
                        <Input
                            placeholder='medicine name'
                            // onChange={this.handleSearch.bind(this)}
                            // value={this.state.name}
                            onChangeText={name =>
                                this.setState({ searched: this.state.reports.filter((report => name === report.medicineName)) })
                            }
                        />
                    </Item>
                    {
                        searched.length > 0
                            ? searched.map((report, index) => {
                                return (
                                    <Card key={index}>
                                        <CardItem header >
                                            <Text style={{ color: "#e8300b" }} ><Icon name='warning' style={{ color: '#e8a50b' }} />
                                                {report.medicineName}</Text>
                                            <Right>
                                                <Text>
                                                    <Icon name='calendar' style={{ color: '#107541' }} />
                                                    <Text style={{ color: '#065f68' }}>{report.publishedDate}</Text>


                                                </Text>
                                                <Text>
                                                    <Icon name='people' style={{ color: '#107541' }} />

                                                    <Text>BatchID :{report.batch_id}</Text>

                                                </Text>
                                            </Right>
                                        </CardItem>
                                        <CardItem bordered>
                                            <Body>

                                                <Text style={{ color: '#074b68' }}>  Issue</Text>
                                                <Text>  {report.issue} </Text>
                                            </Body>
                                        </CardItem>
                                        <CardItem footer bordered>
                                            <Body>

                                                <Button iconLeft light>
                                                    <Icon name='share' />
                                                    <Text>share</Text>
                                                </Button>
                                            </Body>
                                        </CardItem>


                                    </Card>
                                )
                            })
                            :
                            reports.map((report, index) => {
                                return (
                                    <Card key={index}>
                                        <CardItem header >
                                            <Text style={{ color: "#e8300b" }} ><Icon name='warning' style={{ color: '#e8a50b' }} /> {report.medicineName}</Text>
                                            <Right>
                                                <Text>
                                                    <Icon name='calendar' style={{ color: '#107541' }} />
                                                    <Text style={{ color: '#065f68' }}>{report.publishedDate}</Text>


                                                </Text>
                                                <Text>
                                                    <Icon name='people' style={{ color: '#107541' }} />
                                                    <Text>BatchID:{report.batch_id}</Text>

                                                </Text>
                                            </Right>
                                        </CardItem>
                                        <CardItem bordered>
                                            <Body>

                                                <Text style={{ color: '#074b68' }}>  Issue</Text>
                                                <Text>  {report.issue} </Text>
                                            </Body>
                                        </CardItem>
                                        <CardItem footer bordered>
                                            <Body>
                                                <Button iconLeft light>
                                                    <Icon name='share' />
                                                    <Text>share</Text>
                                                </Button>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                )
                            })
                    }
                </Content>
            </Container>
        );
    }

    getNews = () => {
        fetch(`http://${config.systemip}/getNews`,
            {
                method: "get",
            }
        )
            .then(res => {
                console.log("res parsed  ", JSON.parse(res._bodyText));
                this.setState({
                    reports: JSON.parse(res._bodyText)
                })
            }).catch(err => {
                Alert.alert("Network error", "Check Your internet connection or login again ", [
                    { text: "ok", onPress: () => { this.props.navigation.navigate('Homes') } }
                ])
            })
    }

}