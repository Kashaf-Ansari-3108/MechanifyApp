import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'
import styles from './styling'
import { blue, transparent } from '../../../font'

import logo from '../../assets/accessories.png'

const GetStarted = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <View style={{flex:1.5,justifyContent:'center',alignItems:'center'}}>
        <Image resizeMode='contain' style={{width:300,height:400}} source={logo}/>
      </View>
    <View style={{flex:1}}>
      <View style={{ alignItems: 'center', marginVertical:moderateScale(10) }}><Text style={styles.heading}>Vehicles Repair</Text></View>
      <View style={{ paddingHorizontal: moderateScale(65) }}><Text style={styles.text}>Book your appointment anytime anywhere in easy steps!!</Text></View>
      </View>
      <View style={{flex:1}}>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.btn}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")} style={[styles.btn,{backgroundColor:transparent}]}>
            <Text style={[styles.btnText,{color:blue}]}>Log In</Text>
          </TouchableOpacity>
          </View>
    </View>
  )
}

export default GetStarted