import { StyleSheet, Dimensions } from "react-native";
import {config} from "../../config";

export const styles = StyleSheet.create({
    text: {
        fontSize: 15,
    },
    headText: {
        fontSize: 16,
        color: 'black'
    },
    cards: {
        marginTop: 5,
        backgroundColor: "white"
    },
    carditems: {
        marginRight: 14,
        marginLeft: 14,
        borderBottomColor: config.appColor,
        borderBottomWidth: 1
    },
    cardBtn: {
        justifyContent: 'center',
        borderRadius: 7,
        width: 150,
        backgroundColor: config.appColor,

    }
});
