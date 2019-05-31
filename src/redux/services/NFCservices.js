import {config} from '../../config';
import store from '../store';

export default NFCservices={

    verifyOnline:function(){
        let DateObject = new Date;
        let currentDate = DateObject.toLocaleDateString();
        fetch(`http://${config.systemip}/checkMedicine`,
        // fetch(`https://secure-hollows-61354.herokuapp.com/checkMedicine`,
            {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    medicineInfo: {
                        info: this.state.medicine, buyingDate: currentDate,
                        location: this.state.location
                    }, user: this.state.user
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

}