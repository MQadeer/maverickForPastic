import React from 'react';
import {
    AppRegistry,
    ScrollView,
    Image,
    View,NetInfo,
    Alert
} from 'react-native';
// import NfcScanner from './components/NFCscanner';
import Navigation from '../navigation-setup/Setup';
import Home from '../screens/Home/index';
import { AzureInstance, AzureLoginView } from 'react-native-azure-ad-2';
import { Text } from 'native-base';
// The application registration (must match Azure AD config)
let credentials = {
    client_id: '2fa55851-89e0-4ccf-8b86-2a682bdb13d9',
    client_secret: 'prJaOuSFMppLGa9E2bCScRR',
    scope: 'User.Read'
};

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logedin: false,
            user: {},
            position:null
        }
        this.azureInstance = new AzureInstance(credentials);

        this._onLoginSuccess = this._onLoginSuccess.bind(this);
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({
                logedin:!isConnected
            })
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log("position is ",position)
                this.setState({
                    position
                })
            },(err)=>{
                console.log("err is ",err)
            },
            {enableHighAccuracy:true,timeout:20000,maximumAge:1000})
        });
    }
    _onLoginSuccess() {
        this.azureInstance.getUserInfo().then(result => {
            console.log(result);
            this.setState({
                logedin: true,
                user: {
                    name: result.displayName,
                    email: result.userPrincipalName
                }
            })
            // this.addUsertoDB();
            // return result.json();
        }).catch(err => {
            // console.log(err);
            Alert.alert("Network Error","check your Network Connection or  Restart the App and Login Again")
            alert(err, " check your Network Connection or  Restart the App and Login Again ")
        })


    };

    addUsertoDB() {
        console.log(this.state.user);
        fetch('http://192.168.1.6:8888/user', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(this.state.user)
        }).then(res => {
            alert(JSON.parse(res))
        })
    }

    render() {
        console.disableYellowBox = true;

        return (

            <View style={{ flex: 1 }}>
                {this.state.logedin ? <Navigation user={this.state.user} /> : <AzureLoginView
                    azureInstance={this.azureInstance}
                    loadingMessage={<Image style={{ height: 250, width: 250, marginTop: -70 }} source={require('../media/200.gif')} />}
                    onSuccess={this._onLoginSuccess}
                />}
            </View>
        )

    }
}

