import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import React, { useContext, useRef, useState, useEffect, useCallback } from "react";
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'
import { Poppins_Regular, blue, red, white } from '../../../../font'
import Feather from 'react-native-vector-icons/Feather';
import globalStyles from '../../../styling/styling'
import AppContext from '../../../Provider/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location';
import PieChart from 'react-native-pie-chart'
import LinearGradient from 'react-native-linear-gradient';
import { getTokenFromStorage, getUserFromStorage } from '../../../authUtils/authUtils';
import axiosconfig from '../../../axios/axios'
import axios from 'axios';
import ToasterView from '../../../components/ToasterView/ToasterView';
import LoadingScreen from '../../../components/MainLoader/MainLoader';

const MechHome = ({ navigation }) => {
  const myContext = useContext(AppContext)
  const [pendingRequests, setPendingRequests] = useState(1)
  const [progressRequests, setProgressRequests] = useState(1)
  const [completedRequests, setCompletedRequests] = useState(1)
  const [declinedRequests, setDeclinedRequests] = useState(1)
  const [focused, setFocused] = useState("About");
  const widthAndHeight = 150
  const series = [pendingRequests, progressRequests, completedRequests, declinedRequests ]
  const sliceColor = ['#4A6D7A', '#E65E6A', '#638F74', '#907F8A']
  const shouldRenderPieChart = series.some(count => count !== 0);
  const legendItems = [
    { label: 'Awaiting approval before further action', color: sliceColor[0] },
    { label: 'Approved and currently in progress', color: sliceColor[1] },
    { label: 'Successfully finished and closed', color: sliceColor[2] },
    { label: 'Not approved or terminated', color: sliceColor[3] },
  ];
  const ABoxItems = [
    { label: 'Pending/Waiting for Approval', color: ['#4A6D7A', '#6D9FAE', '#AED9E0'], count: series[0] },
    { label: 'Accepted/In Progress', color: ['#F8BFC4', '#F3878F', '#E65E6A'], count: series[1] },

  ];
  const HBoxItems = [
   { label: 'Succesfully Completed', color: ['#C7EFCF', '#9AC7A6', '#638F74'], count: series[2]},
    { label: 'Rejected/Cancelled', color: ['#907F8A', '#BBAAB8', '#D8CDD5'], count: series[3] },
  ];

  Geocoder.init("AIzaSyCAJ-vi4G_teVyt2t23fQF3yJ87Bf6AhEk");
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        myContext.setLatitude(location?.latitude);
        myContext.setLongitude(location?.longitude);
        getAddressFromCoordinates(location?.latitude, location?.longitude);
      })
      .catch(error => {
        console.log(error, "errr");
      });
  };
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const newAddress = response.results[0].formatted_address;
      myContext.setAddress(newAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  
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
          const completedRequests = allRequests.filter(request => request.data.currentStatus === 'completed');
          const declinedRequests = allRequests.filter(request => request.data.currentStatus === 'declined');
  
          setCompletedRequests(completedRequests.length);
          setDeclinedRequests(declinedRequests.length);
          setPendingRequests(pendingRequests.length);
          setProgressRequests(progressRequests.length);
          console.log(completedRequests.length,declinedRequests.length,pendingRequests.length,progressRequests.length);
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

  return (
    <>
    {myContext.mainLoader ? <LoadingScreen/>:
     <View style={{ flex: 1 }}>
     <View style={[styles.header, { flexDirection: 'row', padding: moderateScale(15) }]}>
       <TouchableOpacity
         onPress={() => navigation.toggleDrawer()}
         style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
         <Feather name="menu" color={red} size={30} />
       </TouchableOpacity>
       <View style={{ flex: 6, justifyContent: 'center' }}>
<Text style={globalStyles.heading}>Dashboard</Text>

       </View>
       <TouchableOpacity onPress={() => navigation.navigate("MechNotifications")} style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end', position: 'relative' }}>
         <MaterialIcons name="notifications" color={red} size={40} />

         {/* <View style={{ position: 'absolute', top: -8, left: 42, color: 'red' }}>
           <Entypo name="dot-single" color='red' size={50} />
         </View> */}
       </TouchableOpacity>
     </View>
     <View style={styles.container}>

       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',padding:moderateScale(20) }}>
         {shouldRenderPieChart && 
          <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
         }
        
       </View>
       <View style={{ flex: 1,paddingHorizontal:moderateScale(20) }}>
         {legendItems.map((val, ind) => {
           return <View key={ind} style={{ flexDirection: 'row' }}>
             <View style={{ flex: 1, alignItems: 'flex-end' }}>
               <View style={{
                 width: 12,
                 height: 12,
                 backgroundColor: val.color,
                 marginRight: 5,
                 marginTop: moderateScale(4),
               }} />
             </View>

             <View style={{ flex: 4 }}>
               <Text style={{ fontFamily: Poppins_Regular, fontSize: 12 }}>{val.label}</Text>
             </View>

           </View>
         })}


       </View>
     </View>
     <View style={{marginTop:moderateScale(20)}}>
     <View style={{ flexDirection: 'row', margin: moderateScale(10) }}>
       {ABoxItems.map((val,i) => {
         return <LinearGradient key={i} style={[styles.linearGradient, { marginHorizontal: 4 }]} colors={val.color}>
             <TouchableOpacity onPress={()=>navigation.navigate("MechActiveRequest")} style={{flex:1}}>
           <View style={{ flex: 1 }}>
             <Text style={styles.heading}>{val.label}</Text>
           </View>
           <View style={{ flex: 1 }}>
             <Text style={styles.count} >{val.count}</Text>
           </View>
           </TouchableOpacity>
         </LinearGradient>
       })}
        </View>
        <View style={{ flexDirection: 'row', margin: moderateScale(10) }}>
       {HBoxItems.map((val,i) => {
         return <LinearGradient key={i} style={[styles.linearGradient, { marginHorizontal: 4 }]} colors={val.color}>
           <TouchableOpacity onPress={()=>navigation.navigate("MechRequestHistory")} style={{flex:1}}>
           <View style={{ flex: 1 }}>
             <Text style={styles.heading}>{val.label}</Text>
           </View>
           <View style={{ flex: 1 }}>
             <Text style={styles.count} >{val.count}</Text>
           </View>
           </TouchableOpacity>
         </LinearGradient>
       })}
     </View>
     </View>
    </View>
    }
    </>
   
  )
}

export default MechHome