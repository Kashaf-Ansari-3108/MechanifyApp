import { View, Text, ImageBackground, Switch, TouchableOpacity, FlatList, TextInput, Linking } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Poppins_Bold, black, blue, red, white } from '../../../../font'
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import globalStyles from '../../../styling/styling'
import Modal from "react-native-modal";
import AppContext from '../../../Provider/AppContext'
import Feather from 'react-native-vector-icons/Feather'
import ServiceCard from '../../../components/ServiceCard/ServiceCard'
import modalBack from '../../../assets/modal-back.jpeg'
import InputField from '../../../components/InputField/InputField'
import StarRating from 'react-native-star-rating-widget'
import Geocoder from 'react-native-geocoding'
import { formatDateTime, getTokenFromStorage, getUserFromStorage } from '../../../authUtils/authUtils'
import axiosconfig from '../../../axios/axios'
import axios from 'axios'
import ToasterView from '../../../components/ToasterView/ToasterView'
import BtnLoader from '../../../components/BtnLoader/BtnLoader'
import DatePicker from 'react-native-date-picker'
import LoadingScreen from '../../../components/MainLoader/MainLoader'

const ViewMechanic = ({ navigation, route }) => {
  const { username, image, services, phoneNum, latitude, longitude, _id } = route.params;
  const [selectedServices, setSelectedServices] = useState([])
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [modal, setModal] = useState(false)
  const myContext = useContext(AppContext)
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [appDate, setAppDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [avgRating, setAvgRating] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loader, setLoader] = useState(false)

  const openWhatsApp = () => {
    const whatsappMessage = 'Hello, I have an issue.';
    Linking.openURL(`whatsapp://send?phone=${phoneNum}&text=${whatsappMessage}`);
  };

  const makePhoneCall = () => {
    Linking.openURL(`tel:${phoneNum}`);
  };

  const toggleCardSelection = (item) => {
    const updatedSelection = [...selectedServices];
    const isItemSelected = updatedSelection.some(selectedItem => selectedItem.id === item.id);

    if (isItemSelected) {
      // Item is already selected, remove it
      const updatedSelectionWithoutItem = updatedSelection.filter(selectedItem => selectedItem.id !== item.id);
      setSelectedServices(updatedSelectionWithoutItem);
    } else {
      // Item is not selected, add it
      updatedSelection.push(item);
      setSelectedServices(updatedSelection);
    }
  };

  useEffect(() => {
    const getAddressFromCoordinates = async (latitude, longitude) => {
      try {
        const response = await Geocoder.from(latitude, longitude);
        const newAddress = response.results[0].formatted_address;
        setAddress(newAddress);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    getAddressFromCoordinates(latitude, longitude)
  }, [latitude, longitude])

  const handleSubmitRequest = async () => {
    try {
      if (selectedServices.length == 0) {
        ToasterView("Select atleast one Service")
        return;
      }
      setLoading(true);
      const user = await getUserFromStorage();
      const obj = {
        requestor: user._id,
        services: selectedServices,
        mechanic: _id,
        latitude: myContext.latitude,
        longitude: myContext.longitude,
        description: description,
        appointment_date_time: appDate,
      }
      console.log(obj, "obj to send");

      const token = await getTokenFromStorage();
      const response = await axiosconfig.post('requests/requestMechanic', obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      ToasterView(response?.data?.message)
      myContext.setRequestRefresh(!myContext.requestRefresh)
      setModal(!modal);
      navigation.navigate("RequestorDrawer")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToasterView(error.response?.data?.message || "An Error Occured")
        console.log(error.response?.data);

      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);

        const token = await getTokenFromStorage();

        const response = await axiosconfig.get(`/users/getuser/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response?.data, "res");
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
        setLoader(false);
      }
    };

    fetchData();
  }, [myContext.userRefresh]);
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
                  <TouchableOpacity onPress={() => setModal(!modal)} style={styles.icon}>
                    <Entypo name="dots-three-vertical" color={red} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ top: moderateScale(90), marginHorizontal: moderateScale(20), flexDirection: 'row' }}>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                  <Text style={styles.heading}>{username}</Text>
                </View>
                {avgRating && 
                 <View style={{ flex: 1, flexDirection: 'row' }}>

                 <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                   <AntDesign name={'star'} color={'yellow'} size={30} />
                   <View style={{ justifyContent: 'center', marginLeft: moderateScale(5) }}>
                     <Text style={{ textAlign: 'center', color: white, fontFamily: Poppins_Bold, fontSize: 20 }}>{avgRating}</Text>
                   </View>

                 </View>

               </View>
                }
               

              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 1, backgroundColor: 'white', position: 'absolute', top: moderateScale(200), bottom: moderateScale(20), left: 0, right: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30, zIndex: 1 }}>

            <View>
              <FlatList
                ListHeaderComponent={<>
                  <View style={{ flexDirection: 'row', margin: moderateScale(10) }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.icon, { backgroundColor: blue }]}>
                        <Feather name="map-pin" color={white} size={25} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 3, padding: moderateScale(5) }}>

                      <Text style={styles.text}>{address}</Text>
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
                  {loader? <BtnLoader/>:
                   <View style={{ margin: moderateScale(20) }}>
                   {reviews.length !== 0 &&
                   <>
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
                   </>
                   }
                   



                 </View>
                  }
                 
                  <View style={{ marginHorizontal: moderateScale(20) }}>
                    <Text style={globalStyles.heading}>Book your Appointment</Text>
                  </View>
                  <View style={{ marginHorizontal: moderateScale(10) }}>
                    <TextInput
                      placeholder='Write short description here...'
                      multiline={true}
                      style={styles.mainViewInput}
                      value={description}
                      onChangeText={(text) => setDescription(text)} />
                  </View>

                  <View style={styles.main}>

                    <View style={{ flex: 1 }}><Text style={styles.label}>{"Pick Appointment Date & Time"}</Text></View>
                    <View style={{ marginHorizontal: moderateScale(10) }}>

                      <TouchableOpacity onPress={() => setOpen(true)}>
                        <InputField setVal={setAppDate} value={formatDateTime(appDate.toString())} editable={false} placeholder={'Pick Appointment Date & Time'} />
                      </TouchableOpacity>
                      <DatePicker
                        modal
                        open={open}
                        date={appDate}
                        onConfirm={(date) => {
                          setOpen(false)
                          setAppDate(date)
                        }}
                        onCancel={() => {
                          setOpen(false)
                        }}
                      />

                    </View>


                  </View>
                  <View style={{ marginHorizontal: moderateScale(20) }}>
                    <Text style={globalStyles.heading}>Select Services</Text>
                  </View>
                </>}
                data={services}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  const isSelected = selectedServices.some(selectedItem => selectedItem.id === item.id);

                  return (
                    <TouchableOpacity key={index} onPress={() => toggleCardSelection(item)}>
                      <ServiceCard item={item} isSelected={isSelected} />
                    </TouchableOpacity >
                  );
                }}
              />
            </View>


          </View>
          <Modal isVisible={modal}
            onRequestClose={() => {
              setModal(!modal);
            }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
                backgroundColor: 'white',
                borderRadius: 20,
                overflow: 'hidden',
              }}
            >
              <ImageBackground
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}
                resizeMode='cover'
                source={modalBack}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text style={[globalStyles.heading, { color: red }]}>Current Location</Text>
                  </View>
                  <View>
                    <Switch
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>
                {!isEnabled &&
                  <TouchableOpacity onPress={() => navigation.navigate("Location", { from: 'request', mech: route?.params })} style={{ width: '90%' }}>
                    <TextInput editable={false} style={styles.InputText} placeholder="Add Location" value={`${myContext.address.substring(0, 22)}.....`} />
                  </TouchableOpacity >
                }

                {loading ? <BtnLoader /> :

                  <TouchableOpacity onPress={handleSubmitRequest} style={styles.btn}>
                    <Text style={styles.btnText}>Submit Request</Text>
                  </TouchableOpacity>
                }
              </ImageBackground>
            </View>
          </Modal>

        </>
   



  )
}

export default ViewMechanic