import React, { useState, useContext, useEffect } from 'react';
import { Share, SafeAreaView, View, Text, TouchableOpacity,Image } from 'react-native';
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { red } from '../../../font';
import AppContext from '../../Provider/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToasterView from '../ToasterView/ToasterView';
import { getUserFromStorage } from '../../authUtils/authUtils';



const ReqSideBar = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const myContext = useContext(AppContext)
    const [user, setUser] = useState({})

    function toggleItem() {
        setExpanded(!expanded);
    }
    function toggleItem2() {
        setExpanded2(!expanded2);
    }
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            ToasterView(error.message);
        }
    };
    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        myContext.setAuthRefresh(!myContext.authRefresh)
    };
    useEffect(()=>{
        const getUser = async ()=>{
            const u = await getUserFromStorage();
            setUser(u);
            console.log(user,'uuu');
        }
      getUser();
    },[myContext.userRefresh])

    return (
        <LinearGradient
            colors={[red, "#74cded"]}
            style={{ flex: 1 }}
            start={{ x: 0.5, y: 0.7 }}
            end={{ x: 0.5, y: 1 }}
        >
            <SafeAreaView style={{ flex: 1, padding: moderateScale(15) }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.profileBox}><Image style={{ width: '100%', height: '100%' }} source={{ uri: user.image || 'https://cdn-icons-png.flaticon.com/128/3171/3171065.png' }} /></View>
                    <View style={{ margin: moderateScale(5) }}><Text style={[styles.text, { fontSize: 15 }]}>{user.username}</Text></View>

                </View>
                <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
                    <DrawerItemList  {...props} />
                    <DrawerItem
                        onPress={onShare}
                        label="Share Us"
                        icon={() => <MaterialCommunityIcons name="monitor-share" color="#FFF" size={25} />}
                        labelStyle={styles.item} />

                    <DrawerItem
                        labelStyle={styles.item}
                        label="Help Center"
                        icon={() => {
                            return (
                                <>
                                    <FontAwesome name="user-md" color="#FFF" size={25} />
                                    <TouchableOpacity style={{
                                        alignSelf: "center",
                                        position: "absolute",
                                        right: 5,
                                    }} onPress={toggleItem}><Entypo name={expanded ? 'chevron-up' : 'chevron-down'} color="#FFF" size={20} /></TouchableOpacity>


                                </>)
                        }} />
                    <View style={expanded ? [styles.accordBody] : [styles.accordBody, { display: 'none' }]}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("HelpSupport")} style={{ flexDirection: 'row', marginVertical: moderateScale(5) }}>
                            <FontAwesome6 style={{ flex: 1 }} name="question-circle" size={25} color={red} />
                            <Text style={[styles.item, { flex: 4 }]}>Help & Support</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("FAQs")} style={{ flexDirection: 'row', marginVertical: moderateScale(5) }}>
                            <FontAwesome6 style={{ flex: 1 }} name="person-circle-question" size={25} color={red} />
                            <Text style={[styles.item, { flex: 4 }]}>FAQ's</Text>
                        </TouchableOpacity>
                    </View>
                    <DrawerItem
                        labelStyle={styles.item}
                        label="Legals"
                        icon={() => {
                            return (
                                <>
                                    <MaterialCommunityIcons name="file-document-outline" color="#FFF" size={25} />
                                    <TouchableOpacity style={{
                                        alignSelf: "center",
                                        position: "absolute",
                                        right: 5,
                                    }} onPress={toggleItem2}><Entypo name={expanded2 ? 'chevron-up' : 'chevron-down'} color="#FFF" size={20} /></TouchableOpacity>


                                </>)
                        }} />
                    <View style={expanded2 ? [styles.accordBody] : [styles.accordBody, { display: 'none' }]}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("PrivacyPolicy")} style={{ flexDirection: 'row', marginVertical: moderateScale(5) }}>
                            <MaterialIcons style={{ flex: 1 }} name="policy" size={25} color={red} />
                            <Text style={[styles.item, { flex: 4 }]}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("TermsConditions")} style={{ flexDirection: 'row', marginVertical: moderateScale(5) }}>
                            <FontAwesome6 style={{ flex: 1 }} name="file-lines" size={25} color={red} />
                            <Text style={[styles.item, { flex: 4 }]}>Terms & Conditions</Text>
                        </TouchableOpacity>
                    </View>
                </DrawerContentScrollView>

                <DrawerItem
                    onPress={handleLogout}
                    labelStyle={styles.item}
                    label="Log out"
                    icon={() => <MaterialIcons name="logout" color="#FFF" size={25} />} />
            </SafeAreaView>
        </LinearGradient>
    );
}

export default ReqSideBar;