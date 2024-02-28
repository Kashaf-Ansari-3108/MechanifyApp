import { StyleSheet } from "react-native";
import { Poppins_Regular, Poppins_SemiBold, black, blue, red, white } from "../../../font";
import { moderateScale } from "react-native-size-matters";

export default styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    icon: {
        backgroundColor: white,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: 'center'
    },
    heading: {
        color: red,
        fontFamily: Poppins_SemiBold,
        fontSize: 15,
    },
    input: {
        height: 40,
        backgroundColor: white,
        marginHorizontal: moderateScale(20),
        borderRadius: 5,
        paddingHorizontal: moderateScale(10),
        fontSize: 15,
        fontFamily: Poppins_Regular,
        color: black,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btn: {
        backgroundColor: blue,
        padding: moderateScale(15),
        marginHorizontal: moderateScale(20),
        borderRadius: 15,

    },
    btnText: {
        color: white,
        fontFamily: Poppins_SemiBold,
        fontSize: 15,
        textAlign: "center"
    },
    markerFixed: {
        position: 'absolute',
            top: '50%',       
            left: '50%',     
            marginLeft: -20,  
            marginTop: -40, 
    },
});