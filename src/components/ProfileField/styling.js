import { StyleSheet } from 'react-native'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { Poppins_Regular, Poppins_SemiBold, gray, silver, smoke } from '../../../font'

export default styles = StyleSheet.create({
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
    
})