import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styling'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import InputField from '../../components/InputField/InputField'
import { Poppins_Regular, blue, gray, silver, smoke } from '../../../font'
import SelectDropdown from 'react-native-select-dropdown'
import ToasterView from '../../components/ToasterView/ToasterView'
import axiosconfig from '../../axios/axios'
import axios from 'axios'
import BtnLoader from '../../components/BtnLoader/BtnLoader'
import logo from '../../assets/logo.png'

const SignUp = ({ navigation }) => {
  const users = ['Requestor', 'Mechanic']
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("")

  const handleSignUp = async () => {
    try {
      setLoading(true);

      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        ToasterView("Confirm Password does not match with Password");
        return;
      }

      // Convert username to Sentence Case
      const sentenceCaseUsername = fullName.replace(/\b\w/g, (match) => match.toUpperCase());

      // Convert email to lowercase
      const lowercaseEmail = email.toLowerCase();

      // Validate email format
      const isEmailValid = validateEmail(lowercaseEmail);

      if (!isEmailValid) {
        ToasterView("Invalid email address");
        return;
      }

      const obj = {
        username: sentenceCaseUsername,
        email: lowercaseEmail,
        phoneNum: contact,
        password,
        role
      };

      const response = await axiosconfig.post('users/signup', obj);
      ToasterView(response?.data?.message);
      navigation.navigate('LogIn');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToasterView(error.response?.data?.message || 'An Error Occurred');
        console.log(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };




  return (
    <>
      <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginHorizontal: moderateScale(30), marginVertical: moderateScale(20) }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
          </View>

          <View style={{ alignItems: 'center', marginVertical: moderateScale(10) }}><Text style={styles.heading}>Sign Up</Text></View>
          <View style={{ paddingHorizontal: moderateScale(30) }}><Text style={styles.text}>You can register yourself as a user to book an appointment, mechanic to provide services</Text></View>
          <View style={{ marginVertical: moderateScale(50) }}>
            <InputField placeholder="Full Name" setVal={setFullName} />
            <InputField placeholder="Email Address" setVal={setEmail} />
            <InputField placeholder="Contact" setVal={setContact} />
            <InputField placeholder="Password" setVal={setPassword} />
            <InputField placeholder="Confirm Password" setVal={setConfirmPassword} />
            <SelectDropdown
              buttonStyle={{
                marginVertical: moderateScale(7),
                backgroundColor: smoke,
                paddingHorizontal: moderateVerticalScale(10),
                borderRadius: 10,
                height: moderateVerticalScale(55),
                width: '100%'
              }}
              buttonTextStyle={{
                fontFamily: Poppins_Regular,
                fontSize: 17,
                color: gray,
                textAlign: 'left'
              }}
              defaultButtonText='Select user type...'
              data={users}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setRole(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
          </View>
          {loading ? <BtnLoader /> :
            <TouchableOpacity onPress={handleSignUp} style={styles.btn}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          }

          <View style={{ alignItems: 'center', marginVertical: moderateScale(20) }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("LogIn")}><Text style={[styles.text, { color: blue }]}>Sign In</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default SignUp