import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import InputField from '../../components/InputField/InputField'
import { blue } from '../../../font'
import AppContext from '../../Provider/AppContext'
import ToasterView from '../../components/ToasterView/ToasterView'
import axiosconfig from '../../axios/axios'
import axios from 'axios'
import BtnLoader from '../../components/BtnLoader/BtnLoader'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LogIn = ({ navigation }) => {
  const myContext = useContext(AppContext);
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      setLoading(true);
      const lowercaseEmail = email.toLowerCase();
      const obj = {
        email: lowercaseEmail,
        password,
      }
      // console.log(obj);
      const response = await axiosconfig.post('users/login', obj);
      await AsyncStorage.setItem('token', response?.data?.token);
      await AsyncStorage.setItem('user', JSON.stringify(response?.data?.data));
      myContext.setAuthRefresh(!myContext.authRefresh)
      ToasterView(response?.data?.message);

      if (response?.data?.data?.role == "Requestor") {
        myContext.setUserRole("Requestor")

      } else if (response?.data?.data?.role == "Mechanic") {
        myContext.setUserRole('Mechanic');

      } else {
        ToasterView('An Error Occured');
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToasterView(error.response?.data?.message || 'An Error Occurred');
        console.log(error.response.data);
      }
    } finally {
      setLoading(false);
    }


  };

  return (
    <>
      <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginHorizontal: moderateScale(30), marginVertical: moderateScale(60) }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
          </View>
          <View style={{ alignItems: 'center', marginVertical: moderateScale(10) }}><Text style={styles.heading}>Log In</Text></View>
          <View style={{ paddingHorizontal: moderateScale(30) }}><Text style={styles.text}>Repair Vehicles anytime, anywhere</Text></View>
          <View style={{ marginVertical: moderateScale(50) }}>

            <InputField placeholder="Email Address" setVal={setEmail} />
            <InputField placeholder="Password" setVal={setPassword} secureTextEntry={true}  />
            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => navigation.navigate("ForgetPassword")}><Text style={[styles.text, { color: blue }]}>Forget Password?</Text></TouchableOpacity>
          </View>
          {loading ? <BtnLoader /> :
            <TouchableOpacity onPress={handleLogin} style={styles.btn}>
              <Text style={styles.btnText}>Log In</Text>
            </TouchableOpacity>
          }

          <View style={{ alignItems: 'center', marginVertical: moderateScale(20) }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}><Text style={[styles.text, { color: blue }]}>Sign Up</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default LogIn