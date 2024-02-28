import { View, Text, Image } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { red, smoke } from '../../../font'
import { moderateScale } from 'react-native-size-matters'
import styles from './styling'
import globalStyles from '../../styling/styling'

const MechanicCard = ({item}) => {
    const {username,image, distance} = item;
    return (
        <View style={styles.main}>
            <View style={{ flex: 1.5,backgroundColor:smoke }} >
                <Image style={{height:'100%', width:'100%'}} source={{ uri: image?image:"https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png" }} />
            </View>
            <View style={{ flex: 4, padding: moderateScale(10)}}>
                <View><Text style={globalStyles.heading}>{username}</Text></View>
                <View style={{ flexDirection: 'row'}}>
                    <View style={{ flex:1,justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Feather name="map-pin" color={red} size={15} />
                    </View>
                    <View style={{flex:8}}>
                        <Text style={styles.text}>{distance.toFixed(2)} miles</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MechanicCard