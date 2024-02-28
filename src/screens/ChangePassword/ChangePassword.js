import { View, TouchableOpacity, Text, Dimensions, TextInput, Image, ScrollView } from 'react-native'
import React, { useContext, useRef, useState } from "react";
import Header from '../../components/Header/Header'
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import { red } from '../../../font'
import LinearGradient from 'react-native-linear-gradient'
import axiosconfig from '../../axios/axios'
import axios from 'axios';
import { getTokenFromStorage, getUserFromStorage } from '../../authUtils/authUtils';
import BtnLoader from '../../components/BtnLoader/BtnLoader';
import ToasterView from '../../components/ToasterView/ToasterView';



const ChangePassword = ({ navigation }) => {
  const [previousPwd, setPreviousPwd] = useState("")
  const [newPwd, setNewPwd] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Check if password and confirmPassword match
      if (newPwd !== confirmPwd) {
        ToasterView("Confirm Password does not match with Password");
        return;
      }

      const obj = {
        previousPassword:previousPwd,
        newPassword:newPwd
      };
      const user = await getUserFromStorage()
      const token = await getTokenFromStorage()
      const response = await axiosconfig.post(`users/changePassword`,obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      ToasterView(response?.data?.message);
      navigation.navigate('RequestorDrawer');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToasterView(error.response?.data?.message || 'An Error Occurred');
        console.log(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} title="Change Password" />
      <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>

        <View>
          <View style={styles.main}>
            <View style={{ marginVertical: moderateScale(10) }}>
              <Text style={styles.label}>Previous Password</Text>

            </View>
            <View>
              <TextInput onChangeText={(e) => setPreviousPwd(e)} value={previousPwd} secureTextEntry={true} style={styles.InputText} />
            </View>
          </View>
          <View style={styles.main}>
            <View style={{ marginVertical: moderateScale(10) }}>
              <Text style={styles.label}>New Password</Text>

            </View>
            <View>
              <TextInput onChangeText={(e) => setNewPwd(e)} value={newPwd} secureTextEntry={true} style={styles.InputText} />
            </View>
          </View>
          <View style={styles.main}>
            <View style={{ marginVertical: moderateScale(10) }}>
              <Text style={styles.label}>Confirm Password</Text>

            </View>
            <View>
              <TextInput onChangeText={(e) => setConfirmPwd(e)} value={confirmPwd} secureTextEntry={true} style={styles.InputText} />
            </View>
          </View>

        </View>
        {loading ? <BtnLoader /> :
          <TouchableOpacity onPress={handleSubmit} style={{ margin: moderateScale(20) }}>
            <LinearGradient style={styles.delBtn} colors={[red, "#74cded"]} start={{ x: 0.5, y: 0.5 }}
              end={{ x: 0.5, y: 1 }}><Text style={styles.btnText}>Save</Text></LinearGradient>
          </TouchableOpacity>
        }

      </ScrollView >


    </View >
  )
}

export default ChangePassword