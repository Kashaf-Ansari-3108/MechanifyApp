import { StyleSheet } from "react-native";
import { Poppins_Bold, Poppins_Regular, Poppins_SemiBold, blue, gray, red, white } from "../../../font";
import { moderateScale } from "react-native-size-matters";

export default styles = StyleSheet.create({
     heading:{
        color:red,
        fontFamily:Poppins_SemiBold,
        fontSize:20,
     },
     text:{
        color:gray,
        fontFamily:Poppins_Regular,
        fontSize:12,
        textAlign:'center'
     },
     btn: {
        backgroundColor: blue,
        padding: moderateScale(15),
        borderRadius: 15,
       
    },
    btnText: {
        color: white,
        fontFamily: Poppins_SemiBold,
        fontSize: 15,
        textAlign: "center"
    },
})