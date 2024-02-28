import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header/Header'
import globalStyles from '../../styling/styling'
import LinearGradient from 'react-native-linear-gradient'
import { Poppins_Bold, Poppins_Regular, red } from '../../../font'
// import axios from 'axios'
// import axiosconfig from '../../store/axios'
// import { getTokenFromStorage } from '../../store/authUtils'


const HelpAndSupport = ({navigation}) => {
    const [loading, setloading] = useState(false);
    const [isloading, setLoading] = useState(false);
    const [supportEmail, setSupportEmail] = useState("support@mechanify.com");
    const [query, setQuery] = useState(null);
    const nav = useNavigation()

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         setLoading(true);

    //         const token = await getTokenFromStorage();
    //         const response = await axiosconfig.get('/get-setting', {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });
    //         // console.log(response.data.setting);
    //         setSupportEmail(response.data.setting.email);
    //       } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //           ToasterView(error.response?.data?.message || 'An error occurred');
    //         }
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchData();
    //   }, []);

    //   const handleSubmit = async () => {
    //     try {
    //       setloading(true);

    //       const formData = new FormData();
    //       formData.append('description', query);

    //       const token = await getTokenFromStorage();
    //       const response = await axiosconfig.post('/help_request', formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //       ToasterView(response?.data?.message);
    //       nav.navigate('HomeScreen');

    //     } catch (error) {
    //       if (axios.isAxiosError(error)) {
    //         ToasterView(error.response?.data?.message || "An Error Occured")
    //       }
    //     } finally {
    //       setloading(false);
    //     }
    //   };


    const subject = 'Support Request';
    const body = 'Hello AlumTox Support Team,\n\nI have the following query or issue:\n\n';

    const handleEmailPress = () => {
        const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.canOpenURL(mailtoUrl).then((supported) => {
            if (supported) {
                Linking.openURL(mailtoUrl);
            } else {
                console.error("Can't handle URL: " + mailtoUrl);
            }
        });
    };
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header title={'Help & Support'} navigation={navigation} />
                <View style={{ flex: 1, marginHorizontal: moderateScale(20, 0.1), marginBottom: moderateScale(150), marginTop: moderateScale(10) }}>


                    <TextInput
                        placeholder='Type here for Query'
                        multiline={true}
                        style={styles.mainViewInput}
                        value={query}
                        onChangeText={(text) => setQuery(text)} />
                    <View style={{ flexDirection: 'row', marginHorizontal: moderateScale(5) }}>
                        <View style={{ flex: 1.5, alignItems: 'flex-start' }}>

                            <TouchableOpacity >
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1.1 }}
                                    colors={[red, "#74cded"]}
                                    style={styles.linearGradientStyle}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={styles.loginButtonText}>
                                            Send
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>


                        </View>
                        <View style={{ flex: 0.8 }}></View>
                        <View style={{ flex: 1.5, alignItems: 'flex-start' }}><Text style={styles.redText}>Note: Our Team will contact you as soon as possible</Text></View>
                    </View>
                    <View style={{ marginVertical: 10, marginHorizontal: moderateScale(7, 0.1) }}>
                        <Text style={styles.emailText}>Or Send us email at</Text>
                        {isloading ? <ActivityIndicator color={TextBlue} /> :
                            <TouchableOpacity onPress={handleEmailPress}>
                                <Text style={styles.email}>{supportEmail}</Text>
                            </TouchableOpacity>}

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}
const style = StyleSheet.create({

})
export default HelpAndSupport

const styles = StyleSheet.create({
    mainViewInput: {
        color: 'black',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: moderateScale(16),
        fontSize: 14,
        width: '95%',
        alignSelf: 'center',
        height: moderateScale(300),
        margin: 10,
        marginTop: 20,
        textAlignVertical: 'top',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.01,
        shadowRadius: 3.84,
        elevation: 10,
    },
    redText: {
        color: red,
        fontSize: 9,
        fontFamily: Poppins_Regular,
    },
    emailText: {
        color: red,
        fontSize: 12,
        fontFamily: Poppins_Regular,
    },
    email: {
        color: '#ED1C24',
        fontSize: 12,
        fontFamily: Poppins_Bold,
    },
    linearGradientStyle: {

        justifyContent: 'center',
        borderRadius: 4,
        alignSelf: 'center',
        height: moderateScale(30),
        width: moderateScale(80),

    },
    loginButtonText: {
        fontFamily: Poppins_Bold,
        color: '#000',
        alignSelf: 'center',
        fontSize: 11,
    },
})