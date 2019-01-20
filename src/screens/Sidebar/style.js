import { StyleSheet, Dimensions } from "react-native";
import { Left } from "native-base";
const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    sidebarWrapper:{
        backgroundColor:"#fff",
        opacity :1,
    },
    sideBarTopPanel:{
        backgroundColor:"#f5f5f5",
        paddingVertical:12
    },
    barLinkContainer:{
        
        marginVertical:5,
        
        // borderBottomWidth:1,
    }
});
