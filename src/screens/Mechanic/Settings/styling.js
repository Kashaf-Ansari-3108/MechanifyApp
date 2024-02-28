import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { Poppins_Regular, Poppins_SemiBold, black, blue, gray, smoke, white } from "../../../../font";

const styling = {
    delBtn: {
        padding: moderateScale(20),
        marginHorizontal: moderateScale(10),
        borderRadius: 15,
    },
    text: {
        color: black,
        fontFamily: Poppins_Regular,
        fontSize: 12,
    },
    main: {
        backgroundColor: smoke,
        paddingVertical: moderateScale(20),
        paddingHorizontal: moderateScale(20),
        borderRadius: 10,
        marginHorizontal: moderateScale(20),
        marginVertical: moderateScale(10),
    },
    label: {
        fontFamily: Poppins_Regular,
        fontSize: 12,
        color: black,
    },
    InputText: {
        fontFamily: Poppins_SemiBold,
        fontSize: 15,
        color: gray,
        backgroundColor: white,
        paddingHorizontal: moderateScale(10),
        borderRadius: 10,
        height: moderateVerticalScale(60),
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
    heading: {
        color: "#00539F",
        fontFamily: "Poppins-Bold",
        fontSize: 24,
        margin: moderateScale(15)
    },
    subHeading: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: blue
    },
    itemText: {
        color: "#565656",
        fontSize: 13,
        fontFamily: "Poppins-Regular",
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        margin: moderateScale(8)
    },
    logoutText: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: blue
    }
}

const styles = StyleSheet.create(styling);
export default styles;