import {config} from '../../config';
import Geocoder from 'react-native-geocoder';
import {Alert} from 'react-native';

export default QRservices={

    verifyOnline:(payload)=>{
        getLocation(payload.medInfo,payload.user);
    }

}

const getLocation = (medInfo,user) => {

    navigator.geolocation.getCurrentPosition((location) => {
        console.log("position is ", location)
        if (location) {
            let NY = {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            };
            Geocoder.geocodePosition(NY).then(response => {
                // res is an Array of geocoding object (see below)
                console.log("position  response ", response[0].locality, response[0].country);
                
                let currentLocation= {
                        latitude: location.coords.latitude, longitude: location.coords.longitude,
                        locationName: response[0].locality, country: response[0].country
                    }
                return currentLocation;
            }).then((currentLocation) => {
                meddicineCheckRequest(medInfo,currentLocation,user);
            })
                .catch(err => console.log(err))
        }
    }, (err) => {
        console.log("err is ", err);
        Alert.alert("Network error", "check your internet connection and try again", [
            {
                text: "Ok", onPress: () => {
                    this.props.navigation.navigate('Homes',
                        { user: this.state.user, medicine: this.state.medicine })
                }
            }
        ]);
    },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
    )
}

const meddicineCheckRequest = (medInfo,currentLocation,user) => {
    let DateObject = new Date;
    let currentDate = DateObject.toLocaleDateString();
    fetch(`http://${config.systemip}/QR/checkMedicine`,
        // fetch(`https://maverickbackend.azurewebsites.net/checkMedicine`,
        {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                medicineInfo: {
                    info: medInfo, buyingDate: currentDate,
                    location: currentLocation,
                    hash: ''
                }, user: user
            }),
        }
    )
        .then(res => {
            console.log("res parsed  ", JSON.parse(res._bodyText));
            this.props.navigation.navigate('Verification', { verifiedMedicine: JSON.parse(res._bodyText) })
        }).catch(err => {
            Alert.alert("Network error", "Check Your internet connection or login again ", [
                { text: "ok", onPress: () => { this.props.navigation.navigate('Homes') } }
            ])
        })
}