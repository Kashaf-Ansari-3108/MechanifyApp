import { View, Text, Image } from 'react-native'
import React from 'react'
import { blue, red, smoke } from '../../../font'
import { moderateScale } from 'react-native-size-matters'
import styles from './styling'
import globalStyles from '../../styling/styling'

const ServiceCard = ({ item, isSelected}) => {
    return (
        <View style={[styles.main,{backgroundColor:isSelected?blue:smoke}]}>
            <View style={{ flex: 2, backgroundColor: smoke }} >
                <Image style={{ height: '100%', width: '100%' }} source={{ uri: item.image ? item.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpmKriM6_0AtxK17d-kwWYLvefI6PfabpZ_w&usqp=CAU" }} />
            </View>
            <View style={{ flex: 5, padding: moderateScale(10) }}>
                <View><Text style={globalStyles.heading}>{item.item}</Text></View>

            </View>
           
        </View>
    )
}

export default ServiceCard