import { StyleSheet } from "react-native";
import { Poppins_Regular, Poppins_SemiBold, black, blue, gray, smoke, white } from "../../../font";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";

export default styles = StyleSheet.create({
    InputText:{
        fontFamily:Poppins_Regular,
        fontSize:17,
        backgroundColor:smoke,
        paddingHorizontal:moderateVerticalScale(10),
        borderRadius:10,
        height:moderateVerticalScale(55),
        width:'100%'
    },
    
})