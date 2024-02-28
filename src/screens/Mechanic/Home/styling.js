import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import { Poppins_Bold, Poppins_Regular, Poppins_SemiBold, black, blue, gray, silver, smoke, white } from "../../../../font";



export default styles = StyleSheet.create({
    container: {
       alignItems: 'center',
       marginTop: moderateScale(20),
       flexDirection:'row'
    },
    header: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    linearGradient: {
        borderRadius: 8,
        padding: moderateScale(10),
        flex:1,
        height:moderateScale(110),
    },
    heading: {
        color: "#FFF",
        fontFamily: "Poppins-Bold",
        fontSize: 15,
        textAlign: 'center'
    },
    count: {
        color: "#FFF",
        fontFamily: "Poppins-Bold",
        fontSize: 30,
        textAlign: 'center'
    },
    text: {
        color: "#FFF",
        fontFamily: "Poppins-Regular",
        fontSize: 6,
        textAlign: 'center'
    },
})