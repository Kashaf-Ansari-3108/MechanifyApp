import { ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale } from 'react-native-size-matters';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import OIcons from 'react-native-vector-icons/Octicons'
import { Poppins_Bold, Poppins_Regular, black, blue, gray, red } from '../../../font';
import modalBack from '../../assets/modal-back.jpeg'
import globalStyles from '../../styling/styling'
import { formatDateTime } from '../../authUtils/authUtils';


const ReqRequestCard = ({ navigation, item }) => {
    const { currentStatus, createdAt, description, services, appointment_date_time } = item.data;
    const { username } = item.mechanic[0];

    return (
        <>
            <View style={[styles.main, { flexDirection: 'row' }]}>
                <View style={{ flex: 4,padding:moderateScale(5) }}>
                    
                    <Text style={styles.childName}>{username}</Text>
                    <Text style={styles.date}>Services: {services.map(obj => obj['item']).join(', ')}</Text>
                    <Text style={styles.text}>Appointment: {formatDateTime(appointment_date_time)}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View>
                        <Text style={styles.date}>{formatDateTime(createdAt)}</Text>
                    </View>
                    <View><Text style={[styles.text, { color: currentStatus == 'pending' || currentStatus == 'declined' ? 'red' :currentStatus == 'inprogress' ? 'green' : 'blue' }]}>{currentStatus}</Text></View>
                    <TouchableOpacity onPress={() => navigation.navigate("ViewRequest", item)} style={[styles.icon, { backgroundColor: blue, }]}>
                        <MIcons name="eye-arrow-right" color="#FFFFFF" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default ReqRequestCard

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: moderateScale(15),
        paddingVertical: moderateScale(5),
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        backgroundColor: '#FFF',
        marginVertical: moderateScale(7),

    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    childName: {
        color: gray,
        fontFamily: Poppins_Bold,
        fontSize: 17,
    },
    reportNo: {
        color: "#818181",
        fontFamily: Poppins_Regular,
        fontSize: 11,
    },
    text: {
        color: "#A3A3A3",
        fontFamily: Poppins_Regular,
        fontSize: 10,
    },
    date: {
        color: "#B3B3B3",
        fontFamily: Poppins_Regular,
        fontSize: 9,
    }
})