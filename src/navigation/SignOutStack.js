import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from '../screens/GetStarted/GetStarted';
import SignUp from '../screens/SignUp/SignUp';
import LogIn from '../screens/LogIn/LogIn';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import OTPVerification from '../screens/OTPVerification/OTPVerification';
import NewPassword from '../screens/NewPassword/NewPassword';



const Stack = createNativeStackNavigator();
const SignOutStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      
    }}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  )
}

export default SignOutStack