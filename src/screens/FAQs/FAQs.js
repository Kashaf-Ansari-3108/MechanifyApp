import { View, Text, FlatList, TouchableOpacity, Pressable, ActivityIndicator, useWindowDimensions, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale } from 'react-native-size-matters';
import HTML from 'react-native-render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LayoutAnimation } from 'react-native';
import { Poppins_Bold, Poppins_Regular, Poppins_SemiBold, black, gray } from '../../../font';
import Header from '../../components/Header/Header';
// import { getTokenFromStorage } from '../../store/authUtils';
// import axiosconfig from '../../store/axios';
// import axios from 'axios'




const Faqs = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [press, setPress] = useState('');
    const [data, setData] = useState([{ id: 1, title: "What is Mechanify?", description: "Mechanify is the solution of your every problem :))))" },
    { id: 2, title: "How mechanify is the solution of every problem?", description: "Ye tw mjhe bhi nhi pta, puch k btaungi :))))" }]);
    const windowWidth = useWindowDimensions().width;
    function questionPick(item) {
        setPress(item.id)
    }


    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         setLoading(true);

    //         const token = await getTokenFromStorage();
    //         const response = await axiosconfig.get('/get-faq', {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });
    //         // console.log(response.data.faqs, "res");
    //         setData(response?.data?.faqs);
    //       } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //           ToasterView(error.response?.data?.message || "An Error Occured")

    //         }
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchData();
    //   }, []);

    return (
        <>
            {loading ? <></> :
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, marginBottom: moderateScale(60) }}>
                        <Header title={"FAQs"} navigation={navigation} />
                        <View style={{ width: '80%', alignSelf: 'center' }}>
                            <FlatList
                                scrollEnabled={true}
                                nestedScrollEnabled
                                data={data}
                                keyExtractor={(item, index) => index.toString()}
                                style={{ width: '100%' }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => { LayoutAnimation.easeInEaseOut(); questionPick(item) }}
                                        style={{ marginTop: 20, width: '100%', padding: 0 }}
                                    >
                                        {press === item.id ?
                                            <TouchableOpacity onPress={() => { LayoutAnimation.easeInEaseOut(); setPress('') }} >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAEAEA', paddingHorizontal: 15, height: 55, borderRadius: 8, color: "White", }}>
                                                    <View style={{ flex: 11, justifyContent: 'center', alignItems: 'flex-start' }}>
                                                        <HTML baseStyle={{ fontFamily: Poppins_Bold, fontWeight: 'bold', fontSize: 12, color: black, }} source={{ html: item.title }} contentWidth={windowWidth} />
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        <AntDesign name={'up'} size={15} color={gray} />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAEAEA', paddingHorizontal: 15, height: 55, borderRadius: 8, color: "White", }}>
                                                <View style={{ flex: 11, justifyContent: 'center', alignItems: 'flex-start' }}>
                                                    <HTML baseStyle={{ fontFamily: Poppins_SemiBold, fontWeight: 'bold', fontSize: 12, color: black, }} source={{ html: item.title }} contentWidth={windowWidth} />
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <AntDesign name={'down'} size={15} color={gray} />
                                                </View>

                                            </View>
                                        }
                                        {press === item.id ?
                                            <Pressable onPress={() => { LayoutAnimation.easeInEaseOut(); setPress('') }} style={{ zIndex: -999 }} >
                                                <View style={{ backgroundColor: "white", color: "#B4B4B4", borderBottomLeftRadius: 8, borderBottomRightRadius: 8, }}>
                                                    <View style={{ paddingHorizontal: moderateScale(15), padding: moderateScale(15), marginHorizontal: moderateScale(0), marginTop: moderateScale(-10), backgroundColor: "white", borderBottomLeftRadius: 8, borderBottomRightRadius: 8, }}>
                                                        <HTML baseStyle={{ color: '#777777', fontFamily: Poppins_Regular, fontSize: 12 }} source={{ html: item.description }} contentWidth={windowWidth} />
                                                        <View style={{ alignSelf: 'flex-end' }}>
                                                            <AntDesign name={'up'} size={15} color={gray} />
                                                        </View>
                                                    </View>

                                                </View>
                                            </Pressable>
                                            :
                                            null
                                        }
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            }

        </>
    )
}

export default Faqs