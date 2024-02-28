import { View, Text, FlatList, TouchableOpacity, Pressable, ActivityIndicator, useWindowDimensions, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { moderateScale } from 'react-native-size-matters';
import HTML from 'react-native-render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LayoutAnimation } from 'react-native';
import { Poppins_Bold, Poppins_Regular, Poppins_SemiBold, black, blue, gray, white } from '../../../../font';
import Header from '../../../components/Header/Header';
import ReqRequestCard from '../../../components/ReqRequestCard/ReqReuestCard';
import { getTokenFromStorage, getUserFromStorage } from '../../../authUtils/authUtils';
import axiosconfig from '../../../axios/axios'
import axios from 'axios';
import AppContext from '../../../Provider/AppContext';
import LoadingScreen from '../../../components/MainLoader/MainLoader';
import ToasterView from '../../../components/ToasterView/ToasterView';
import globalStyles from '../../../styling/styling'
import MechRequestCard from '../../../components/MechRequestCard/MechRequestCard';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';

const MechActiveRequest = ({ navigation }) => {
 const myContext = useContext(AppContext)
   
    const [pendingRequests, setPendingRequests] = useState([])
    const [progressRequests, setProgressRequests] = useState([])
    const [focused, setFocused] = useState("Pending")
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            myContext.setMainLoader(true);
      
            const token = await getTokenFromStorage();
            const user = await getUserFromStorage();
            const response = await axiosconfig.get(`requests/allRequestsOfMechanics/${user._id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            console.log(response.data);
      
            const allRequests = response?.data?.requestWithReviews;
            //  console.log(allRequests,'all');
            if (allRequests) {
              const pendingRequests = allRequests.filter(request => request.data.currentStatus === 'pending');
              const progressRequests = allRequests.filter(request => request.data.currentStatus === 'inprogress');
      
              setPendingRequests(pendingRequests);
              setProgressRequests(progressRequests);
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              ToasterView(error.response?.data?.message || "An Error Occurred");
              console.log(error.response?.data);
            }
          } finally {
            myContext.setMainLoader(false);
          }
        };
      
        fetchData();
      }, [myContext.requestRefresh]);
      
      const Tab = useCallback(({ tab }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setFocused(tab);
                }}
                style={[
                    styles.tab,
                    {
                        borderBottomColor: focused == tab ? blue : white,
                    },
                ]}>
                <Text
                    style={[globalStyles.heading, { color: blue, fontSize: 15 }]}>
                    {tab}
                </Text>
            </TouchableOpacity>
        );
    });

    return (
        <>
            {myContext.mainLoader ? <LoadingScreen/> :
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, marginBottom: moderateScale(20) }}>
                        <Header title={"Active Request"} navigation={navigation} />
                        <View style={styles.tabs}>
                            <Tab tab={'Pending'} />
                            <Tab tab={'In Progress'} />

                        </View>
                        {focused == 'Pending' ?
                        <>
                        {pendingRequests.length == 0 ? <NoDataFound/> :
                         <View style={{ width: '90%', alignSelf: 'center' }}>
                         <FlatList
                             scrollEnabled={true}
                             nestedScrollEnabled
                             data={pendingRequests}
                             keyExtractor={(item, index) => index.toString()}
                             style={{ width: '100%' }}
                             renderItem={({ item,index }) => (
                                 <View><MechRequestCard item={item} navigation={navigation} index={index}/></View>
                             )}
                         />
                     </View>
                        }
                        </>
                            :
                            <>
                            {progressRequests.length == 0? <NoDataFound/>:
                             <View style={{ width: '90%', alignSelf: 'center' }}>
                             <FlatList
                                 scrollEnabled={true}
                                 nestedScrollEnabled
                                 data={progressRequests}
                                 keyExtractor={(item, index) => index.toString()}
                                 style={{ width: '100%' }}
                                 renderItem={({ item }) => (
                                     <View><MechRequestCard item={item} navigation={navigation}/></View>
                                 )}
                             />
                         </View>
                            }
                            </>
                           
                        }

                    </View>
                </SafeAreaView>
            }
        </>
    )
}

export default MechActiveRequest
const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        backgroundColor: white,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: moderateScale(10),
        borderBottomWidth: 3,
    },
})