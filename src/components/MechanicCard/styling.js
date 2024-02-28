import { StyleSheet } from "react-native";
import { Poppins_Regular, black, smoke } from "../../../font";
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'

export default styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        backgroundColor: smoke,
        height: moderateVerticalScale(90),
        marginHorizontal: moderateScale(15),
        padding:moderateScale(10),
        borderRadius:15,
        marginVertical:moderateScale(5),
    },
    text: {
        color: black,
        fontFamily: Poppins_Regular,
        fontSize: 12
    }
})