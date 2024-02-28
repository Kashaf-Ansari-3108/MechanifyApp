import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import InputField from '../../components/InputField/InputField'
import { blue } from '../../../font'
import ToasterView from '../../components/ToasterView/ToasterView'
import axiosconfig from '../../axios/axios'
import axios from 'axios'
import BtnLoader from '../../components/BtnLoader/BtnLoader'

const ForgetPassword = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("")

  const handleSubmit = async () => {
    try {
      setloading(true);
      const response = await axiosconfig.post('/send-email', {email});
      ToasterView(response?.data?.message); 
      navigation.navigate('OTPVerification', { email: email });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToasterView(error.response?.data?.message || "An Error Occured")
      }
    } finally {
      setloading(false);
    }
  };
  return (
    <>

      <View style={{ flex: 1, marginHorizontal: moderateScale(30), marginVertical: moderateScale(60), justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginVertical: moderateScale(10) }}><Text style={styles.heading}>Forget Password</Text></View>
        <View style={{ paddingHorizontal: moderateScale(30) }}><Text style={styles.text}>Repair Vehicles anytime, anywhere</Text></View>
        <View style={{ marginVertical: moderateScale(50) }}>

          <InputField value={email} setVal={setEmail} placeholder="Email Address" />

        </View>
        {loading? <BtnLoader/>:
         <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
         <Text style={styles.btnText}>Send</Text>
       </TouchableOpacity>
        }
       
        <View style={{ alignItems: 'center', marginVertical: moderateScale(20) }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Back to </Text>
            <TouchableOpacity onPress={() => navigation.navigate("LogIn")}><Text style={[styles.text, { color: blue }]}>Log In</Text></TouchableOpacity>
          </View>
        </View>
      </View>

    </>
  )
}

export default ForgetPassword