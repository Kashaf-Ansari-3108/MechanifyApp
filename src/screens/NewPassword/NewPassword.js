import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import InputField from '../../components/InputField/InputField'
import { blue } from '../../../font'

const NewPassword = ({ navigation }) => {
    return (
        <>
            <View style={{ flex: 1, marginHorizontal: moderateScale(30), marginVertical: moderateScale(60), justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', marginVertical: moderateScale(10) }}><Text style={styles.heading}>New Password</Text></View>

                <View style={{ marginVertical: moderateScale(50) }}>
                    <InputField placeholder="New Password" />
                    <InputField placeholder="Confirm Password" />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("LogIn")} style={styles.btn}>
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
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

export default NewPassword