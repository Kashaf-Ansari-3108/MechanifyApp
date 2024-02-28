import { View, TouchableOpacity, Text, Dimensions, TextInput, Image, FlatList, ScrollView } from 'react-native'
import React, { useContext, useRef, useState, useEffect, useCallback } from "react";
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Poppins_Bold, black, blue, gray, red, silver, smoke, white } from '../../../../font'
import ProfileField from '../../../components/ProfileField/ProfileField'
import LinearGradient from 'react-native-linear-gradient'
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import globalStyles from '../../../styling/styling'
import AppContext from '../../../Provider/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ServiceCard from '../../../components/ServiceCard/ServiceCard';
import Header from '../../../components/Header/Header';
import { getTokenFromStorage, getUserFromStorage } from '../../../authUtils/authUtils';
import axiosconfig from '../../../axios/axios'
import axios from 'axios';
import LoadingScreen from '../../../components/MainLoader/MainLoader';
import ToasterView from '../../../components/ToasterView/ToasterView';


const MyProfile = ({ navigation }) => {
  const myContext = useContext(AppContext)
  const refImgSheet = useRef();
  const refInpSheet = useRef();
  const refDelSheet = useRef();
  const [label, setLabel] = useState("");
  const [val, setVal] = useState("");
  const [focused, setFocused] = useState("About");
  const [user, setUser] = useState({})
  const [avgRating, setAvgRating] = useState(null)
  const [reviews, setReviews] = useState([])

  Geocoder.init("AIzaSyCYvOXB3SFyyeR0usVOgnLyoDiAd2XDunU");

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const newAddress = response.results[0].formatted_address;
      myContext.setAddress(newAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

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
  data = [
    { id: 1, name: "Oil changes", image: "https://cdn-icons-png.flaticon.com/128/6823/6823503.png" },
    { id: 2, name: "Brake inspections and replacements", image: "https://cdn-icons-png.flaticon.com/128/6823/6823641.png" },
    { id: 3, name: "Tire rotations and replacements", image: "https://cdn-icons-png.flaticon.com/128/8719/8719607.png" }
  ]
  function formatDateTime(inputDateTime) {
    const inputDate = new Date(inputDateTime);

    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = inputDate.getFullYear();

    let hours = inputDate.getHours();
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');

    let ampm = 'AM';
    if (hours >= 12) {
      ampm = 'PM';
      hours %= 12;
    }

    hours = hours === 0 ? 12 : hours; // Handle midnight (0:00)

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;

    return formattedDateTime;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        myContext.setMainLoader(true);

        const token = await getTokenFromStorage();
        const user = await getUserFromStorage();
        const response = await axiosconfig.get(`/users/getuser/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response?.data, "res");
        if (response?.data?.data?.others.latitude && response?.data?.data?.others.longitude) {
          getAddressFromCoordinates(response?.data?.data?.others.latitude, response?.data?.data?.others.longitude);
          myContext.setLatitude(response?.data?.data?.others.latitude)
          myContext.setLongitude(response?.data?.data?.others.longitude)
        }
        setUser(response?.data?.data?.others)
        const reviews = response?.data?.data.review;
        if (reviews && reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = totalRating / reviews.length;
          setAvgRating(averageRating)
          console.log('Average Rating:', averageRating);
        } else {
          console.log('No reviews available.');
        }
        setReviews(response?.data?.data?.review)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          ToasterView(error.response?.data?.message || "An Error Occured")
          console.log(error.response?.data);
        }
      } finally {
        myContext.setMainLoader(false);
      }
    };

    fetchData();
  }, [myContext.userRefresh]);

  return (
    <>
      {myContext.mainLoader ? <LoadingScreen /> :
        <View style={{ flex: 1 }}>
          <Header navigation={navigation} title={'My Profile'} />
          <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
            <View style={styles.banner}>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.picBox}>
                  <Image style={{ width: '100%', height: '100%' }} source={{ uri: user.image || 'https://cdn-icons-png.flaticon.com/128/1995/1995450.png' }} />

                </View>
              </View>
              <View style={{ margin: moderateScale(10) }}>
                <Text style={[globalStyles.heading, { textAlign: 'center' }]}>{user.username}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <AntDesign name={'star'} color={'yellow'} size={30} />
                  <View style={{ justifyContent: 'center', marginLeft: moderateScale(5) }}>
                    <Text style={{ textAlign: 'center', color: white, fontFamily: Poppins_Bold, fontSize: 20 }}>{avgRating}</Text>
                  </View>

                </View>
              </View>

            </View>
            <View style={styles.tabs}>
              <Tab tab={'About'} />
              <Tab tab={'Services'} />
              <Tab tab={'Review'} />
            </View>
            {focused == "About" ?
              <View style={{ margin: moderateScale(20) }}>
                <View style={{}}>
                  <Text style={globalStyles.heading}>User Information</Text>
                </View>
                <View style={styles.infoCard}>
                  <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <MaterialCommunityIcons name={'email'} color={silver} size={30} />
                  </View>
                  <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={[styles.text, { fontFamily: Poppins_Bold }]}>Email</Text>
                    <Text style={styles.text}>{user.email}</Text>
                  </View>
                </View>
                <View style={styles.infoCard}>
                  <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <Entypo name={'phone'} color={silver} size={30} />
                  </View>
                  <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={[styles.text, { fontFamily: Poppins_Bold }]}>Phone</Text>
                    <Text style={styles.text}>{user.phoneNum}</Text>
                  </View>
                </View>
                <View style={styles.infoCard}>
                  <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <Feather name={'map-pin'} color={silver} size={30} />
                  </View>
                  <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={[styles.text, { fontFamily: Poppins_Bold }]}>Location</Text>
                    <Text style={styles.text}>{myContext.address}</Text>
                  </View>
                </View>
                <View style={styles.infoCard}>
                  <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <Feather name={'user-check'} color={silver} size={30} />
                  </View>
                  <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={[styles.text, { fontFamily: Poppins_Bold }]}>Member Since</Text>
                    <Text style={styles.text}>{formatDateTime(user.createdAt)}</Text>
                  </View>
                </View>

              </View> : focused == "Services" ?
                <View style={{ margin: moderateScale(20) }}>
                  <View style={{}}>
                    <Text style={globalStyles.heading}>Services</Text>
                  </View>
                  <View>
                    {user.services.length == 0 ? <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text>No Services Added</Text></View> :
                      <FlatList
                        data={user.services}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                          return (
                            <View key={index}>
                              <ServiceCard item={item} isSelected={true} />
                            </View >
                          );
                        }}
                      />
                    }

                  </View>

                </View> :
                <View style={{ margin: moderateScale(20) }}>
                  <View style={{}}>
                    <Text style={globalStyles.heading}>Reviews</Text>
                  </View>
                  <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      return (
                        <View key={index}>
                          <View style={styles.ReviewCard}>


                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                              <AntDesign name={'star'} color={'red'} size={30} />
                              <View style={{ justifyContent: 'center', marginLeft: moderateScale(5) }}>
                                <Text style={{ textAlign: 'center', color: blue, fontFamily: Poppins_Bold, fontSize: 20 }}>{item.rating}</Text>
                              </View></View>
                            <View style={{ padding: moderateScale(5) }}>
                              <Text style={[styles.text, { textAlign: 'center' }]}>
                                {item.description}
                              </Text>
                            </View>
                          </View>
                        </View >
                      );
                    }}
                  />



                </View>
            }



          </ScrollView>
          <RBSheet
            height={Dimensions.get('window').height * 0.3}
            ref={refImgSheet}
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
              <TouchableOpacity onPress={() => openCamera()} style={{ flexDirection: 'row', marginHorizontal: moderateScale(20), marginVertical: moderateScale(10) }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><SimpleLineIcons name="camera" size={30} color={red} /></View>
                <View style={{ flex: 5, justifyContent: 'center' }}><Text style={styles.text}>Camera</Text></View>
              </TouchableOpacity>
              <View style={{ alignItems: 'center' }}>
                <View style={{ height: 1, width: '60%', backgroundColor: gray, marginVertical: moderateScale(5) }}></View></View>
              <TouchableOpacity onPress={() => openGallery()} style={{ flexDirection: 'row', marginHorizontal: moderateScale(20), marginVertical: moderateScale(10) }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Entypo name="images" size={30} color={red} /></View>
                <View style={{ flex: 5, justifyContent: 'center' }}><Text style={styles.text}>Gallery</Text></View>
              </TouchableOpacity>
            </View>
          </RBSheet>
          <RBSheet
            height={Dimensions.get('window').height * 0.5}
            ref={refInpSheet}
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
                  <Text style={styles.label}>{label}</Text>

                </View>
                <View>
                  <TextInput value={val} onChangeText={(e) => setVal(e)} style={styles.InputText} />
                </View>
              </View>
              <TouchableOpacity onPress={() => {
                profileFieldSave()
                refInpSheet.current.close()
              }} style={styles.btn}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
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
                  <TextInput secureTextEntry={true} style={styles.InputText} />
                </View>
              </View>
              <View style={styles.main}>
                <View style={{ marginVertical: moderateScale(10) }}>
                  <Text style={styles.label}>Confirm Password</Text>

                </View>
                <View>
                  <TextInput secureTextEntry={true} style={styles.InputText} />
                </View>
              </View>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </View>
      }
    </>

  )
}

export default MyProfile