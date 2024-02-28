import { View, Text, FlatList, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale } from 'react-native-size-matters';
// import { getTokenFromStorage } from '../../store/authUtils'
// import axios from 'axios'
// import axiosconfig from '../../store/axios'
import { Poppins_Bold, Poppins_Regular, blue, white } from '../../../../font'
import Header from '../../../components/Header/Header';

const MechNotifications = ({navigation}) => {
  const [isloading, setLoading] = useState(false);
  const NotificationsData = [
    {
        id: 1,
        Data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        check:true
    },
    {
        id: 2,
        Data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        check:true
    },
    {
        id: 3,
        Data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        check:true
    },
    {
        id: 4,
        Data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        check:false
    },
    {
        id: 5,
        Data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        check:false
    },
    {
        id: 6,
        Data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        check:false
    },
    {
        id: 7,
        Data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        check:false
    },
    {
        id: 8,
        Data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        check:false
    },
    {
        id: 9,
        Data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        check:false
    },
    {
        id: 10,
        Data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        check:false
    },
]

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const token = await getTokenFromStorage();
//         const response = await axiosconfig.get('/get-notifications', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log(response.data);
//         setNotificationsData(response.data);
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
  return (
    <>
     
        <SafeAreaView style={{ flex: 1 }}>
        <Header navigation={navigation} title={'Notifications'}/>
          <View style={{ flex: 1, marginHorizontal: moderateScale(20, 0.1), marginBottom: moderateScale(60), marginTop: moderateScale(10) }}>
          
            <FlatList
              showsVerticalScrollIndicator={false}
              data={NotificationsData}
              renderItem={({ item, index }) => (
                <ScrollView showsVerticalScrollIndicator={false} >
                  <View style={{
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: 5,
                    padding: moderateScale(17),
                    backgroundColor:item.check? blue: white,
                    marginVertical: 4
                  }}>
                    <Text style={{
                      fontFamily: Poppins_Bold,
                      fontSize: 10,
                      color: item.check? white: blue,
                    }}>
                      {item.Data}
                    </Text>
                   
                  </View>

                </ScrollView>
              )}
            />
          </View>
        </SafeAreaView>
      

    </>


  )
}

export default MechNotifications