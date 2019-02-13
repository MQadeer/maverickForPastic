import React from 'react';
import {
    Image,
    View, NetInfo, BackHandler,
    Alert
} from 'react-native';
import { config } from '../config';
import Navigation from '../navigation-setup/Setup';
import { AzureInstance, AzureLoginView } from 'react-native-azure-ad-2';

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
            medicineBought: []

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
                , [{ text: "Ok", onPress: () => { BackHandler.exitApp() } }
                ])

        })


    };

    addUsertoDB() {
        

        let medicineBought = [];
        console.log(this.state.user);
        // fetch(`http://${config.systemip}/addUser`, {
        fetch('https://maverickapp.azurewebsites.net/addUser', {

            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(this.state.user)
        }).then(res => {
            console.log("user res  ", JSON.parse(res._bodyText))
            resp = JSON.parse(res._bodyText);
            this.setState({
                medicineBought: resp.medicineBought
            })
        })
    }

    render() {
        console.disableYellowBox = true;
        return (
            <View style={{ flex: 1 }}>
                {this.state.logedin ? <Navigation screenProps={{ user: this.state.user, medicineBought: this.state.medicineBought }} /> : <AzureLoginView
                    azureInstance={this.azureInstance}
                    loadingMessage={<Image style={{ height: 250, width: 250, marginTop: -70 }} source={require('../media/200.gif')} />}
                    onSuccess={this._onLoginSuccess}
                />}
            </View>
        )

    }
}

