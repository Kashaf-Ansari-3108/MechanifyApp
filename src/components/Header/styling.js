import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";



export default styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        padding: moderateScale(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
    }
})