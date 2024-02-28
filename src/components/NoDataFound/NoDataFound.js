import React from 'react';
import { View,StyleSheet,Text, Image } from 'react-native';
import { Poppins_Regular, silver } from '../../../font';


const NoDataFound = () => {
   return (
        <View style={styles.container}>
           <Image source={require('../../assets/found.png')} style={styles.logo} />
            <Text style={styles.text}>No Data Found!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    text:{
        fontFamily:Poppins_Regular,
        fontSize:15,
        color:silver
    }
});

export default NoDataFound;
