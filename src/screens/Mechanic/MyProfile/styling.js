import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import { Poppins_Bold, Poppins_Regular, Poppins_SemiBold, black, blue, gray, silver, smoke, white } from "../../../../font";



export default styles = StyleSheet.create({
    infoCard:{
    flexDirection:'row',
        shadowColor: "#000",
         shadowOffset: {
             width: 0,
             height: 2,
         },
         shadowOpacity: 0.25,
         shadowRadius: 3.84,
         elevation: 2,
         borderRadius: 10,
        padding:moderateScale(10),
        backgroundColor:white,
        marginVertical:moderateScale(5)
    },
    ReviewCard:{
       
            shadowColor: "#000",
             shadowOffset: {
                 width: 0,
                 height: 2,
             },
             shadowOpacity: 0.25,
             shadowRadius: 3.84,
             elevation: 2,
             borderRadius: 10,
            padding:moderateScale(15),
            backgroundColor:white,
            marginVertical:moderateScale(5)
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
    banner: {
        backgroundColor: blue,
        paddingVertical:moderateScale(10)
    },
    tabs: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        backgroundColor: white,
    },
    tab: {
        flex:1,
        alignItems: 'center',
        paddingVertical: moderateScale(10),
        borderBottomWidth:3,
    },
    address: {
        color: black,
        fontFamily: Poppins_Bold,
        fontSize: 12
    },
    picBox: {
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
})