import { View, TouchableOpacity, Text, Dimensions, TextInput, Image, ScrollView } from 'react-native'
import React, { useContext, useRef, useState,useEffect } from "react";
import Header from '../../../components/Header/Header'
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Poppins_Regular, black, blue, gray, red, smoke, white } from '../../../../font'
import ProfileField from '../../../components/ProfileField/ProfileField'
import LinearGradient from 'react-native-linear-gradient'
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';
import AppContext from '../../../Provider/AppContext';
import axiosconfig from '../../../axios/axios'
import axios from 'axios';
import { getTokenFromStorage, getUserFromStorage } from '../../../authUtils/authUtils';
import ToasterView from '../../../components/ToasterView/ToasterView';
import LoadingScreen from '../../../components/MainLoader/MainLoader';
import BtnLoader from '../../../components/BtnLoader/BtnLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';




const ReqProfile = ({ navigation }) => {
  const myContext = useContext(AppContext)
  const refImgSheet = useRef();
  const refInpSheet = useRef();
 
  const [label, setLabel] = useState("");
  const [val, setVal] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false)
  const [isloading, setloading] = useState(false)
  const [avaLoader, setAvaLoader] = useState(false)


  const [image, setImage] = useState("https://cdn-icons-png.flaticon.com/128/3171/3171065.png");
  const openGallery = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async res => {
      try {
        setAvaLoader(true)
        const base64 = await RNFS.readFile(res.assets[0].uri, 'base64');

        const cloudName = 'dmvs1559g';
        const unsignedUploadPreset = 'ml_default';

        const file = `data:image/jpeg;base64,${base64}`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', unsignedUploadPreset);
        formData.append('cloud_name', cloudName);

        const options = {
          method: 'POST',
          body: formData,
        };

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload',
          options,
        );
        const data = await response.json();

        console.log(data);
        setAvaLoader(false);
        setImage(data.secure_url);
        
      } catch (e) {
        console.log(e);
        console.log('Error converting image to base64 or uploading to Cloudinary');
      }
    });
  };

  const openCamera = async () => {
    launchCamera({ mediaType: 'photo' }, async res => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission given");
          setAvaLoader(true)
          const base64 = await RNFS.readFile(res.assets[0].uri, 'base64');
  
          const cloudName = 'dmvs1559g';
          const unsignedUploadPreset = 'ml_default';
  
          const file = `data:image/jpeg;base64,${base64}`;
  
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', unsignedUploadPreset);
          formData.append('cloud_name', cloudName);
  
          const options = {
            method: 'POST',
            body: formData,
          };
  
          const response = await fetch(
            'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload',
            options,
          );
          const data = await response.json();
  
          console.log(data);
          setAvaLoader(false);
          setImage(data.secure_url);
        } else {
          console.log("Camera permission denied");
        }

      }
      catch (e) {
        console.log(e);
        console.log('Error converting image to base64');
      }
    });
  };
  const profileFieldSave = () => {
    if (label === "Full Name") {
      setFullName(val);

    }
    if (label === "Phone") {
      setPhone(val);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);

            const token = await getTokenFromStorage();
            const user = await getUserFromStorage();
            const response = await axiosconfig.get(`/users/getuser/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response?.data?.data, "res");
            setFullName(response?.data?.data?.others.username);
            setEmail(response?.data?.data?.others.email);
            setPhone(response?.data?.data?.others.phoneNum);
            setImage(response?.data?.data?.others.image || "https://cdn-icons-png.flaticon.com/128/3171/3171065.png" );
           
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
}, [myContext.userRefresh]);

const handleSubmit = async () => {
  try {
      setloading(true);
      const obj = {
          username: fullName,
          phoneNum: phone,
          image:image
        }
      console.log(obj,"obj to send");

      const token = await getTokenFromStorage();
      const response = await axiosconfig.put('users/updateuser', obj, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      // console.log(response.data);
      await AsyncStorage.setItem('user', JSON.stringify(response?.data?.data));
      ToasterView(response?.data?.message)
      myContext.setUserRefresh(!myContext.userRefresh)
      navigation.navigate('RequestorDrawer');

  } catch (error) {
      if (axios.isAxiosError(error)) {
          ToasterView(error.response?.data?.message || "An Error Occured")
          console.log(error.response?.data);
      }
  } finally {
      setloading(false);
  }
};
  return (
    <>
    {loading? <LoadingScreen/>:
     <View style={{ flex: 1 }}>
     <Header navigation={navigation} title="Profile" />
     <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
       <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: moderateScale(30) }}>
         <TouchableOpacity onPress={() => refImgSheet.current.open()} style={styles.picBox}>
          {avaLoader? <BtnLoader/>:<Image style={{ width: '100%', height: '100%' }} source={{ uri: image }} /> }
           
           <SimpleLineIcons style={{ position: 'absolute', bottom: 15, right: 15 }} name="pencil" color={red} size={18} />
         </TouchableOpacity>
       </View>
       <ProfileField label="Full Name" value={fullName} editPress={() => {
         refInpSheet.current.open()
         setLabel("Full Name")
         setVal(fullName)
       }} />
       <ProfileField label="Email" value={email} />
       <ProfileField label="Phone" value={phone} editPress={() => {
         refInpSheet.current.open()
         setLabel("Phone")
         setVal(phone)
       }} />
      {isloading? <BtnLoader/> :
       <TouchableOpacity onPress={handleSubmit} style={{ margin: moderateScale(20) }}>
       <LinearGradient style={styles.delBtn} colors={[red, "#74cded"]} start={{ x: 0.5, y: 0.5 }}
         end={{ x: 0.5, y: 1 }}><Text style={styles.btnText}>Save</Text></LinearGradient>
     </TouchableOpacity>
      }
     
     </ScrollView >
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
           backgroundColor: black
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
           backgroundColor: black
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
           <Text style={styles.btnText}>Done</Text>
         </TouchableOpacity>
       </View>
     </RBSheet>
   
   </View >
    }
    
    </>
   
  )
}

export default ReqProfile