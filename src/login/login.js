import React from 'react';
import {
    Image,
    View, NetInfo, BackAndroid, BackHandler,
    Alert
} from 'react-native';
// import NfcScanner from './components/NFCscanner';
import Navigation from '../navigation-setup/Setup';
import { AzureInstance, AzureLoginView } from 'react-native-azure-ad-2';
import geocoder from 'react-native-geocoder/js/geocoder';
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
            logedin: true,
            user: {},
            position:{}

        }
        this.azureInstance = new AzureInstance(credentials);

        this._onLoginSuccess = this._onLoginSuccess.bind(this);
    }

    componentWillMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({
                logedin: !isConnected
            })
            if (isConnected) {
                this.getLocation();
            }
        });
    }

    getLocation = () => {
        
        navigator.geolocation.getCurrentPosition((location) => {
            console.log("position is ", location)
            if (location) {
                geocoder.geocodePosition({ lat: location.coords.latitude, lng: location.coords.longitude }).then(res => {

                    this.setState({
                        position: { city: res[0].locality, country: res[0].country }
                    })
                    console.log("city name ", this.state.position.city, " Countrey name ", this.state.position.country);
                })
            }
        }, (err) => {
            console.log("err is ", err);
            Alert.alert("Network error","check your internet connection and try again",[
                {text:"Ok",onPress:()=>{BackHandler.exitApp()}}
            ]);

        },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }

    _onLoginSuccess() {
        this.azureInstance.getUserInfo().then(result => {
            console.log(result);
            this.setState({
                logedin: true,
                user: {
                    name: result.displayName,
                    email: result.userPrincipalName,
                    city:this.state.position.city,
                    country:this.state.position.country
                }
            })
            // this.addUsertoDB();
            // return result.json();
        }).catch(err => {
            // console.log(err);
            Alert.alert("Network Error", "check your Internet Connection and Login Again"
            ,[{text:"Ok",onPress:()=>{BackHandler.exitApp()}}
            ])
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
                {this.state.logedin ? <Navigation screenProps={this.state.user} /> : <AzureLoginView
                    azureInstance={this.azureInstance}
                    loadingMessage={<Image style={{ height: 250, width: 250, marginTop: -70 }} source={require('../media/200.gif')} />}
                    onSuccess={this._onLoginSuccess}
                />}
            </View>
        )

    }
}

