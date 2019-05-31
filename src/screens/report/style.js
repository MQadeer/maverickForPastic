import { StyleSheet, Dimensions } from "react-native";
import {config} from '../../config';

export const styles = StyleSheet.create({
    
    text:{
        fontSize:15,
    },
    headText:{
        fontSize:20,
        color:'black'      
    },
    item:{
        marginBottom:15,
        borderBottomColor:config.appColor,
        borderBottomWidth:2
    }
    
});
