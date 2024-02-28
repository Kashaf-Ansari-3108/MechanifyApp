import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native'
import React, { useState, useContext,useRef } from 'react'
import styles from './styling'
import MIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FIcons from "react-native-vector-icons/FontAwesome"
import { moderateScale } from 'react-native-size-matters'
import ToggleSwitch from 'toggle-switch-react-native'
import AppContext from '../../../Provider/AppContext'
import Header from '../../../components/Header/Header'
import { blue, smoke } from '../../../../font'
import RBSheet from "react-native-raw-bottom-sheet";
import BtnLoader from '../../../components/BtnLoader/BtnLoader'
import { getTokenFromStorage, getUserFromStorage } from '../../../authUtils/authUtils'
import axiosconfig from '../../../axios/axios'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ToasterView from '../../../components/ToasterView/ToasterView'

const ReqSettings = ({ navigation }) => {
    const myContext = useContext(AppContext);
    const [nToggle, setNToggle] = useState(false);
    const [aNToggle, setANToggle] = useState(false);
    const refDelSheet = useRef();
    const [pwd, setPwd] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const [loading, setLoading] = useState(false)

    const ItemSeprator = () => <View style={{
        height: 2,
        width: "100%",
        backgroundColor: "#BFBFBF"
    }} />

    const Items = ({ label, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
                <Text style={styles.itemText}>{label}</Text>
                <FIcons name='angle-right' size={20} color="#818181" />
            </TouchableOpacity>
        )
    }
    const handleSubmit = async () => {
        try {
            setLoading(true);

            // Check if password and confirmPassword match
            if (pwd !== confirmPwd) {
                ToasterView("Confirm Password does not match with Password");
                return;
            }

            const obj = {
                password: pwd,
            };
          
            const token = await getTokenFromStorage()
            console.log(token);
            const response = await axiosconfig.post(`users/deleteUser`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            myContext.setAuthRefresh(!myContext.authRefresh)
            ToasterView(response?.data?.message);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                ToasterView(error.response?.data?.message || 'An Error Occurred');
                console.log(error.response.data);
            }
        } finally {
            setLoading(false);
        }
    }
    const handleLogout = async () => {
        // console.log("logout");

        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        myContext.setAuthRefresh(!myContext.authRefresh)
    };

    return (

        <ScrollView showsVerticalScrollIndicator={false}>
            <Header navigation={navigation} title={'Settings'} />
            <View style={{ padding: 30 }}>

                <View>
                    <View style={{ flexDirection: 'row', margin: moderateScale(10) }}>
                        <MIcons name="account-circle-outline" size={30} color={blue} />
                        <Text style={styles.subHeading}>Account</Text>
                    </View>
                    <ItemSeprator />
                    <Items label="Change Password" onPress={() => navigation.navigate("ChangePassword")} />
                    <Items label="Delete Account" onPress={() => refDelSheet.current.open()} />
                </View>
                <View style={{ marginTop: moderateScale(30) }}>
                    <View style={{ flexDirection: 'row', margin: moderateScale(10) }}>
                        <MIcons name="bell-outline" size={30} color={blue} />
                        <Text style={styles.subHeading}>Notifications</Text>
                    </View>
                    <ItemSeprator />
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Notifications</Text>
                        <ToggleSwitch
                            isOn={nToggle}
                            trackOffStyle={{ backgroundColor: "#FFF" }}
                            thumbOffStyle={{ backgroundColor: "#9E9E9E" }}
                            trackOnStyle={{ backgroundColor: "#FFF" }}
                            thumbOnStyle={{ backgroundColor: "#FF5757" }}
                            onToggle={() => setNToggle(!nToggle)}
                            size="small"
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>App Notifications</Text>
                        <ToggleSwitch
                            isOn={aNToggle}
                            trackOffStyle={{ backgroundColor: "#FFF" }}
                            thumbOffStyle={{ backgroundColor: "#9E9E9E" }}
                            trackOnStyle={{ backgroundColor: "#FFF" }}
                            thumbOnStyle={{ backgroundColor: "#FF5757" }}
                            onToggle={() => setANToggle(!nToggle)}
                            size="small"
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={handleLogout} style={{ marginHorizontal: moderateScale(30), marginTop: moderateScale(130), margin: moderateScale(30), flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={styles.logoutText}>Logout</Text>
                <MIcons name="logout" color={blue} size={25} />
            </TouchableOpacity>
            <RBSheet
                height={Dimensions.get('window').height * 0.7}
                ref={refDelSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",

                    },
                    draggableIcon: {
                        backgroundColor: smoke
                    },

                }}
            >
                <View>
                    <View style={styles.main}>
                        <View style={{ marginVertical: moderateScale(10) }}>
                            <Text style={styles.label}>Password</Text>

                        </View>
                        <View>
                            <TextInput onChangeText={(e)=>setPwd(e)} value={pwd} secureTextEntry={true} style={styles.InputText} />
                        </View>
                    </View>
                    <View style={styles.main}>
                        <View style={{ marginVertical: moderateScale(10) }}>
                            <Text style={styles.label}>Confirm Password</Text>

                        </View>
                        <View>
                            <TextInput onChangeText={(e)=>setConfirmPwd(e)} value={confirmPwd} secureTextEntry={true} style={styles.InputText} />
                        </View>
                    </View>
                    {loading? <BtnLoader/>:
                     <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                     <Text style={styles.btnText}>Delete</Text>
                 </TouchableOpacity>
                    }
                   
                </View>
            </RBSheet>
        </ScrollView>

    )
}

export default ReqSettings