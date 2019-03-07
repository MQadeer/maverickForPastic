import {config} from '../../config';
import store from '../store';

export default NFCservices = {

    addUser: function (user) {
        fetch(`http://${config.systemip}/addUser`, {
            // fetch('https://52.173.76.33,52.165.157.71,52.165.164.201,52.176.148.33,52.176.145.195/addUser', {

            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(user)
        }).then(res => {
            console.log("user res  ", res._bodyText)
            resp = res._bodyText;
            store.dispatch({
                type:showUserHistory,
                payload: resp.medicineBought
            })
        }).catch((err) => {
            console.log("err  ", err);
        })
    }

}