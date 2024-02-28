import { StyleSheet } from "react-native";
import { Poppins_Bold, Poppins_Regular, Poppins_SemiBold, black, blue, gray, smoke, white } from "../../../../font";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";


export default styles = StyleSheet.create({
    icon: {
        backgroundColor: white,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: 'center'
    },
    text: {
        color: black,
        fontFamily: Poppins_Regular,
        fontSize: 12
    },
    InputText:{
        fontFamily:Poppins_Regular,
        fontSize:17,
        color:gray,
        backgroundColor:smoke,
        paddingHorizontal:moderateVerticalScale(10),
        borderRadius:10,
        height:moderateVerticalScale(55),
        width:'100%'
    },
    heading: {
        color: white,
        fontFamily: Poppins_Bold,
        fontSize: 20,
    },
    modalView: {
        height:'50%',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    modalText: {
        fontFamily: Poppins_Regular,
        fontSize: 10,
        textAlign: 'center',
        marginVertical: moderateScale(15),
    },
    btn: {
        backgroundColor: blue,
        padding: moderateScale(15),
        borderRadius: 15,
        marginVertical: moderateScale(10),
        width:'70%'
    },
    btnText: {
        color: white,
        fontFamily: Poppins_SemiBold,
        fontSize: 15,
        textAlign: "center"
    },
    mainViewInput: {
        color: 'black',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: moderateScale(16),
        fontSize: 14,
        width: '95%',
        alignSelf: 'center',
        height: moderateScale(100),
        margin: 10,
        marginTop: 20,
        textAlignVertical: 'top',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.01,
        shadowRadius: 3.84,
        elevation: 10,
    },
    main: {
        flex:1,
        backgroundColor:smoke,
        paddingVertical:moderateScale(15),
        paddingHorizontal: moderateScale(20),
        borderRadius:10,
        marginHorizontal:moderateScale(20),
        marginVertical:moderateScale(10),
    },
    label:{
        fontFamily:Poppins_Regular,
        fontSize:12,
        color:gray,
    },
    InputText:{
        fontFamily:Poppins_SemiBold,
        fontSize:14,
        color:gray,
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

})