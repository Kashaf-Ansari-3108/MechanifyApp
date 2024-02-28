import { StyleSheet } from "react-native";
import { Poppins_Bold, Poppins_Regular, Poppins_SemiBold, black} from "../../../../font";


export default styles = StyleSheet.create({
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
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,

    },
    heading: {
        color: black,
        fontFamily: Poppins_SemiBold,
        fontSize: 15
    },
    address: {
        color: black,
        fontFamily: Poppins_Regular,
        fontSize: 12
    }
})