import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Poppins_Regular, gray, red, smoke } from '../../../../font';
import styles from './styling'
import { moderateScale } from 'react-native-size-matters';
import MechanicCard from '../../../components/MechanicCard/MechanicCard';
import globalStyles from '../../../styling/styling'
import AppContext from '../../../Provider/AppContext';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import axiosconfig from '../../../axios/axios'
import axios from 'axios';
import { getTokenFromStorage } from '../../../authUtils/authUtils';
import ToasterView from '../../../components/ToasterView/ToasterView';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import LoadingScreen from '../../../components/MainLoader/MainLoader';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';


const ReqHome = ({ navigation }) => {
  const myContext = useContext(AppContext);
  const [loading, setLoading] = useState(false)
  const [selectedService, setSelectedService] = useState([])
  const [data, setData] = useState([])
  function onMultiChange() {
    return (item) => setSelectedService(xorBy(selectedService, [item], 'id'))
  }
  Geocoder.init("AIzaSyCYvOXB3SFyyeR0usVOgnLyoDiAd2XDunU");
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



  const dataOption = [
    { id: 1, item: "Oil changes", image: "https://cdn-icons-png.flaticon.com/128/6823/6823503.png" },
    { id: 2, item: "Brake inspections and replacements", image: "https://cdn-icons-png.flaticon.com/128/6823/6823641.png" },
    { id: 3, item: "Tire rotations and replacements", image: "https://cdn-icons-png.flaticon.com/128/8719/8719607.png" },
    { id: 4, item: "Fluid checks and replacements", image: "https://cdn-icons-png.flaticon.com/128/2092/2092284.png" },
    { id: 5, item: "Identifying and fixing engine problems", image: "https://cdn-icons-png.flaticon.com/128/3079/3079162.png" },
    { id: 6, item: "Computerized diagnostic testing", image: "https://cdn-icons-png.flaticon.com/128/1481/1481619.png" },
    { id: 7, item: "Troubleshooting electrical issues", image: "https://cdn-icons-png.flaticon.com/128/2766/2766264.png" },
    { id: 8, item: "Engine repairs and overhauls", image: "https://cdn-icons-png.flaticon.com/128/3048/3048376.png" },
    { id: 9, item: "Transmission repairs", image: "https://cdn-icons-png.flaticon.com/128/13567/13567000.png" },
    { id: 10, item: "Exhaust system repairs", image: "https://cdn-icons-png.flaticon.com/128/13567/13567011.png" },
  ]
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const obj = {
          latitude: myContext.latitude,
          longitude: myContext.longitude,
          services: selectedService
        }
        console.log(obj, 'send');
        const token = await getTokenFromStorage();
        const response = await axiosconfig.post(`users/getMechanics`, obj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response?.data, "res");
        setData(response?.data)

      } catch (error) {
        if (axios.isAxiosError(error)) {
          ToasterView(error.response?.data?.message || "An Error Occured")
          console.log(error.response?.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [myContext.latitude, myContext.longitude, selectedService]);
  return (
    <>
      {loading ? <LoadingScreen /> :
        <React.Fragment>
          <View style={[styles.header, { flexDirection: 'row', padding: moderateScale(15) }]}>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Feather name="menu" color={red} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Location", { from: 'home' })} style={{ flex: 6, justifyContent: 'center' }}>
              <Text style={globalStyles.heading}>Location Radius</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <Feather name="map-pin" color={red} size={15} />
                </View>
                <Text numberOfLines={1} style={[styles.address, { flex: 10 }]}>
                  {myContext.address.length < 35
                    ? `${myContext.address}`
                    : `${myContext.address.substring(0, 32)}...`}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ReqNotifications")} style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end', position: 'relative' }}>
              <MaterialIcons name="notifications" color={red} size={40} />

              {/* <View style={{ position: 'absolute', top: -8, left: 32, color: 'red' }}>
                <Entypo name="dot-single" color='red' size={50} />
              </View> */}
            </TouchableOpacity>
          </View>
          <View style={{

            backgroundColor: smoke,
            paddingVertical: moderateScale(15),
            paddingHorizontal: moderateScale(20),
            borderRadius: 10,
            marginHorizontal: moderateScale(20),
            marginVertical: moderateScale(10),
          }}>
            <Text style={{
              fontFamily: Poppins_Regular,
              fontSize: 12,
              color: gray,
            }}>Select Services</Text>

            <SelectBox
              labelStyle={{ display: 'none' }}
              arrowIconColor="#1697c7"
              searchIconColor="#1697c7"
              toggleIconColor="#1697c7"
              multiOptionContainerStyle={{ backgroundColor: '#1697c7' }}
              options={dataOption}
              selectedValues={selectedService}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              isMulti
              // listOptionProps={{ nestedScrollEnabled: true }}
              fixedHeight={true}

            />

          </View>


          <View style={{ paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(20) }}>
            <Text style={[styles.heading, { fontSize: 18 }]}>All Mechanics</Text>
          </View>
          {data.length == 0 ? <NoDataFound /> :
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate("ViewMechanic", item)}>
                  <MechanicCard item={item} />
                </TouchableOpacity>
              )}
            />
          }



        </React.Fragment>
      }
    </>

  )
}

export default ReqHome