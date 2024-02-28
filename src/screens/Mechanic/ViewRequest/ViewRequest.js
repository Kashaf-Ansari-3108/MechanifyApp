import { View, Text, ImageBackground, Switch, TouchableOpacity, FlatList, TextInput, ScrollView, Linking } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Poppins_Bold, Poppins_SemiBold, black, blue, red, white } from '../../../../font'
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import globalStyles from '../../../styling/styling'
import Modal from "react-native-modal";
import AppContext from '../../../Provider/AppContext'
import Feather from 'react-native-vector-icons/Feather'
import ServiceCard from '../../../components/ServiceCard/ServiceCard'
import modalBack from '../../../assets/modal-back.jpeg'
import StarRating from 'react-native-star-rating-widget';
import { formatDateTime, getTokenFromStorage } from '../../../authUtils/authUtils'
import Geocoder from 'react-native-geocoding'
import axiosconfig from '../../../axios/axios'
import axios from 'axios'
import ToasterView from '../../../components/ToasterView/ToasterView'



const MechViewRequest = ({ navigation, route }) => {
    const { _id, currentStatus, createdAt, description, appointment_date_time, services, latitude: routeLatitude, longitude: routeLongitude } = route.params.data;
    const { username, image, phoneNum } = route.params.requestor[0];
    // const { rating: ratingReview, description: review } = route.params.reviews[0]
    const [selectedServices, setSelectedServices] = useState([])
    const [modal, setModal] = useState(false)
    const [cModal, setCModal] = useState(false)
    const [modalAction, setActionModal] = useState(false)
    const myContext = useContext(AppContext)
    const [isEnabled, setIsEnabled] = useState(false);
    const [rating, setRating] = useState(4);
    const [comment, setComment] = useState("")
    const [reqAddress, setReqAddress] = useState("")
    const [isloading, setloading] = useState(false)

    const openWhatsApp = () => {
        const whatsappMessage = 'Hello, I have an issue.';
        Linking.openURL(`whatsapp://send?phone=${phoneNum}&text=${whatsappMessage}`);
    };

    const makePhoneCall = () => {
        Linking.openURL(`tel:${phoneNum}`);
    };
    const renderItem = ({ item, index }) => {
        const isSelected = true;
        return (
            <View key={index}>
                <ServiceCard item={item} isSelected={isSelected} />
            </View>
        );
    };


    useEffect(() => {
        const getAddressFromCoordinates = async (routeLatitude, routeLongitude) => {
            try {
                const response = await Geocoder.from(routeLatitude, routeLongitude);
                const newAddress = response.results[0].formatted_address;
                setReqAddress(newAddress);
            } catch (error) {
                console.error("Error fetching address:", error);
            }
        };
        getAddressFromCoordinates(routeLatitude, routeLongitude)
    }, [routeLatitude, routeLongitude])

    const handleDeleteRequest = async () => {
        try {

            setloading(true);
            const token = await getTokenFromStorage();
            const response = await axiosconfig.delete(`requests/delRequest/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            ToasterView(response?.data?.message)
            myContext.setRequestRefresh(!myContext.requestRefresh)
            setModal(!modal)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                ToasterView(error.response?.data?.message || "An Error Occured")
                console.log(error.response?.data);
            }
        } finally {
            setloading(false);
        }
    }

    const handleAccept = async () => {
        try {

            setloading(true);
            const obj = {
                currentStatus: 'inprogress',
                isAccepted: true,
            }
            console.log(obj, "obj to send");

            const token = await getTokenFromStorage();
            const response = await axiosconfig.put(`requests/updateRequest/${_id}`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            ToasterView(response?.data?.message)
            myContext.setRequestRefresh(!myContext.requestRefresh)
            setCModal(!cModal)
            navigation.navigate('MechanicDrawer');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                ToasterView(error.response?.data?.message || "An Error Occured")
                console.log(error.response?.data);
            }
        } finally {
            setloading(false);
        }
    }
    const handleDecline = async () => {
        try {

            setloading(true);
            const obj = {
                currentStatus: 'declined',
            }
            console.log(obj, "obj to send");

            const token = await getTokenFromStorage();
            const response = await axiosconfig.put(`requests/updateRequest/${_id}`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            ToasterView(response?.data?.message)
            myContext.setRequestRefresh(!myContext.requestRefresh)
            setCModal(!cModal)
            navigation.navigate('MechanicDrawer');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                ToasterView(error.response?.data?.message || "An Error Occured")
                console.log(error.response?.data);
            }
        } finally {
            setloading(false);
        }
    }
    return (
        <>
            <View style={{ height: '40%' }}>
                <ImageBackground resizeMode='contain' source={{ uri: image }} style={{ width: '100%', height: '100%' }}>
                    <View style={{
                        height: "100%",
                        width: "100%",
                        position: 'absolute',
                        backgroundColor: 'rgba(26,66,96,0.5)'
                    }} />
                    <View style={{ flexDirection: 'row', margin: moderateScale(10), }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                                <AntDesign name="arrowleft" color={red} size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4 }}></View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            {currentStatus == "inprogress" ?
                                <View style={styles.icon}>
                                    <Entypo name="dots-three-vertical" color={red} size={25} />

                                </View> : currentStatus == "pending" ?
                                    <TouchableOpacity onPress={() => setActionModal(!modalAction)} style={styles.icon}>
                                        <Entypo name="dots-three-vertical" color={red} size={25} />

                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => setModal(!modal)} style={styles.icon}>
                                        <MaterialCommunityIcons name="delete" color={red} size={25} />
                                    </TouchableOpacity>
                            }

                        </View>
                    </View>
                    <View style={{ top: moderateScale(90), marginHorizontal: moderateScale(20), flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.heading}>{username}</Text>
                        </View>


                    </View>
                </ImageBackground>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', position: 'absolute', top: moderateScale(200), left: 0, right: 0, bottom: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30, zIndex: 1 }}>
                <FlatList
                    data={services}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <>
                            <View style={{ flexDirection: 'row', margin: moderateScale(10) }}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <TouchableOpacity style={[styles.icon, { backgroundColor: blue }]}>
                                        <Feather name="map-pin" color={white} size={25} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 3, padding: moderateScale(5) }}>
                                    <Text style={styles.text}>{reqAddress}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={makePhoneCall} style={[styles.icon, { backgroundColor: blue }]}>
                                        <Feather name="phone-call" color={white} size={25} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={openWhatsApp} style={[styles.icon, { backgroundColor: blue }]}>
                                        <FontAwesome name="whatsapp" color={white} size={25} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.main}>
                                <View style={styles.mainBox}>
                                    <View style={{ paddingLeft: moderateScale(20), flex: 1 }}>
                                        <Text style={styles.mainText}>Status</Text>

                                    </View>
                                   
                                    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: Poppins_SemiBold, color: currentStatus == 'pending' || currentStatus == 'declined' ? 'red' : currentStatus == 'inprogress' ? 'green' : 'blue', fontSize: 20 }}>{currentStatus}</Text>
                                    </View>

                                </View>
                                {route?.params?.reviews?.length !== 0 && 
                                    <View style={styles.ReviewCard}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ paddingLeft: moderateScale(20), flex: 1 }}>
                                            <Text style={[styles.mainText,{fontSize:15}]}>Review by Requestor</Text>

                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <AntDesign name={'star'} color={'red'} size={30} />
                                            <View style={{ justifyContent: 'center', marginLeft: moderateScale(5) }}>
                                                <Text style={{ textAlign: 'center', color: blue, fontFamily: Poppins_Bold, fontSize: 20 }}>{route?.params?.reviews[0].rating}</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ padding: moderateScale(5) }}>
                                        <Text style={[styles.text, { textAlign: 'center' }]}>
                                            {route?.params?.reviews[0].description}
                                        </Text>
                                    </View>
                                </View>
                                }
                            
                            </View>

                            <View style={styles.main}>
                                <View style={styles.mainBox}>
                                    <View style={{ paddingLeft: moderateScale(20), flex: 1.5 }}>
                                        <Text style={[[styles.mainText, { fontSize: 15 }]]}>Appointment:</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Text style={[styles.text, { fontFamily: Poppins_SemiBold }]}>{formatDateTime(appointment_date_time)}</Text>
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: moderateScale(20) }}>
                                    <Text style={[styles.text, { fontFamily: Poppins_SemiBold }]}>Description</Text>
                                    <Text style={styles.text}>{description}</Text>
                                </View>
                                <View style={{ marginHorizontal: moderateScale(20) }}>
                                    <Text style={[styles.text, { fontFamily: Poppins_SemiBold }]}>Location</Text>
                                    <Text style={styles.text}>{reqAddress}</Text>
                                </View>


                            </View>


                            <View style={{ marginHorizontal: moderateScale(20) }}>
                                <Text style={globalStyles.heading}>Services</Text>
                            </View>
                        </>
                    )}
                    renderItem={renderItem}
                />
            </View>

            <Modal isVisible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}>
                <View
                    style={{
                        flex: 0.5,
                        marginHorizontal: 5,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        overflow: 'hidden',
                    }}
                >
                    <ImageBackground
                        style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',
                        }}
                        resizeMode='cover'
                        source={modalBack}
                    >
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <TouchableOpacity onPress={() => setModal(!modal)} style={{ margin: moderateScale(10) }}>
                                <MaterialIcons name="cancel" color="#FF5B5B" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 6 }}>
                            <View style={{ marginHorizontal: moderateScale(20) }}>
                                <Text style={[globalStyles.heading]}>Are you sure want to delete this request history? It can't be undone.</Text>
                            </View>
                            <TouchableOpacity onPress={handleDeleteRequest} style={styles.btn}>
                                <Text style={styles.btnText}>Delete Request</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>

            <Modal isVisible={modalAction}
                onRequestClose={() => {
                    setActionModal(!modalAction);
                }}>
                <View
                    style={{
                        flex: 0.5,
                        marginHorizontal: 5,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        overflow: 'hidden',
                    }}
                >
                    <ImageBackground
                        style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',
                        }}
                        resizeMode='cover'
                        source={modalBack}
                    >
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <TouchableOpacity onPress={() => setActionModal(!modalAction)} style={{ margin: moderateScale(10) }}>
                                <MaterialIcons name="cancel" color="#FF5B5B" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 6 }}>

                            <TouchableOpacity onPress={handleAccept} style={[styles.btn, { backgroundColor: 'green' }]}>
                                <Text style={styles.btnText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDecline} style={[styles.btn, { backgroundColor: 'red' }]}>
                                <Text style={styles.btnText}>Decline</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>

        </>


    )
}

export default MechViewRequest