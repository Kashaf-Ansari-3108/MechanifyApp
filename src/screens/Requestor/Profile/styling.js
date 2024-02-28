import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import { Poppins_Regular, Poppins_SemiBold, black, blue, gray, silver, smoke, white } from "../../../../font";



export default styles = StyleSheet.create({
    picBox:{
        height:moderateVerticalScale(110),
        width:scale(110),
        borderRadius:10,
        backgroundColor:silver,
        justifyContent:'flex-end',
        alignItems:'center',
        padding:moderateScale(8),
        
    },
    delBtn: {
        padding: moderateScale(20),
        marginHorizontal: moderateScale(10),
        borderRadius: 15,

    },
   
    text:{
        color:black,
        fontFamily:Poppins_Regular,
        fontSize:12,
    },
    main: {
        backgroundColor:smoke,
        paddingVertical:moderateScale(20),
        paddingHorizontal: moderateScale(20),
        borderRadius:10,
        marginHorizontal:moderateScale(20),
        marginVertical:moderateScale(10),
    },
    label:{
        fontFamily:Poppins_Regular,
        fontSize:12,
        color:black,
    },
    InputText:{
        fontFamily:Poppins_SemiBold,
        fontSize:15,
        color:gray,
        backgroundColor:white,
        paddingHorizontal:moderateScale(10),
        borderRadius:10,
        height:moderateVerticalScale(60),
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
})