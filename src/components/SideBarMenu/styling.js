import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import {white,black,red,Poppins_Regular,Poppins_Bold, silver} from '../../../font'

export default styles = StyleSheet.create({
    profileBox: {
        height:moderateVerticalScale(110),
        width:scale(110),
        borderRadius:10,
        backgroundColor:silver,
        justifyContent:'flex-end',
        alignItems:'center',
        padding:moderateScale(8),
    },
    profileBoxText: {
        color: red,
        textAlign: 'center',
        fontFamily:Poppins_Bold,
    },
    accordBody:{
        backgroundColor:white,
        padding:moderateScale(15),
        borderRadius:10,
    },
    text:{
        fontFamily:Poppins_Bold,
        color:black,
     
    },
    item:{
      fontFamily:Poppins_Regular,
      color:black,
      fontSize:14
    }
   
});
