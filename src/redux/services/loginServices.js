import config from '../../config';
import store from '../store';

export default NFCservices = {

    addUser: function (user) {
        fetch(`http://${config.systemip}/addUser`, {
            // fetch('https://maverickbackend.azurewebsites.net/addUser', {

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