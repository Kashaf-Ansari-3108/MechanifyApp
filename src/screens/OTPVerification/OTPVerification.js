import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { red } from '../../../font'
import styles from './styling'
import OTPInputView from '@twotalltotems/react-native-otp-input'


const OTPVerification = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex:1,flexDirection: 'row', marginHorizontal: moderateScale(10), marginVertical: moderateScale(20) }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
            <AntDesign name="arrowleft" color={red} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4, justifyContent: 'center' }}>

        </View>
      </View>
      <View style={{flex:4,justifyContent:'center'}}>
      <View style={{ alignItems: 'center', marginVertical: moderateScale(10) }}><Text style={styles.heading}>OTP Verification</Text></View>
      <View style={{ paddingHorizontal: moderateScale(30) }}><Text style={styles.text}>Enter the 4 digit code we sent on email</Text></View>
      <View style={{ alignItems: 'center', marginTop:moderateScale(50)}}>
        <OTPInputView
          style={styles.OTPInput}
          pinCount={4}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.borderStyleBase}
          codeInputHighlightStyle={styles.borderStyleHighLighted}
          onCodeFilled = {(code => {
            console.log(`Code is ${code}, you are good to go!`)
            navigation.navigate("NewPassword")
        })} />
      </View>
      </View>
      <View style={{flex:2}}></View>
    </View>
  )
}

export default OTPVerification
