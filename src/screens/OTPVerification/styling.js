import { StyleSheet } from "react-native";
import { Poppins_Bold, Poppins_Regular, Poppins_SemiBold, black, blue, gray, red, silver, smoke, white } from "../../../font";
import { moderateScale } from "react-native-size-matters";

export default styles = StyleSheet.create({
    heading: {
        color: red,
        fontFamily: Poppins_SemiBold,
        fontSize: 20,
    },
    text: {
        color: gray,
        fontFamily: Poppins_Regular,
        fontSize: 12,
        textAlign: 'center'
    },
    OTPInput: {
        width: '80%',
        height: 100
    },
    borderStyleBase: {
        backgroundColor: smoke,
        borderRadius: 4,
        shadowColor: "#FFF",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        color: black,
        fontFamily: 'Poppins',
        fontSize: 16,

    },

    borderStyleHighLighted: {
        borderColor: red,
    },



})