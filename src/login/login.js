import React from 'react';
import {
    Image,
    View, NetInfo, BackHandler,
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
                
                user: {
                    name: result.displayName,
                    email: result.userPrincipalName,
                }
            })
            this.addUsertoDB();
             
             this.setState({
                logedin: true,
            })
            // return result.json();
        }).catch(err => {
            Alert.alert("Network Error", "check your Internet Connection and Login Again"
            ,[{text:"Ok",onPress:()=>{BackHandler.exitApp()}}
            ])
            
        })


    };

    addUsertoDB() {
        let medicineBought=[];
        console.log(this.state.user);
        fetch('http://192.168.1.21:8888/addUser', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(this.state.user)
        }).then(res => {
            console.log("user res  ",JSON.parse(res._bodyText))
            resp=JSON.parse(res._bodyText);
            this.setState({
                user:{
                    name:this.state.user.name,
                    email:this.state.user.email,
                    medicineBought:resp.medicineBought
                }
            })
        })
        
    }

    render() {
        console.disableYellowBox = true;

        return (

            <View style={{ flex: 1 }}>
                {this.state.logedin ? <Navigation screenProps={{user:this.state.user}} /> : <AzureLoginView
                    azureInstance={this.azureInstance}
                    loadingMessage={<Image style={{ height: 250, width: 250, marginTop: -70 }} source={require('../media/200.gif')} />}
                    onSuccess={this._onLoginSuccess}
                />}
            </View>
        )

    }
}

