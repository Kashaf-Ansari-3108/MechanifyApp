import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { blue } from '../../../font';

const LoadingScreen = () => {
   return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Progress.Circle size={60}
             indeterminate={true}
             color={blue}
             borderWidth={4}
              />
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
        width: 150,
        height: 150,
        marginBottom: 20,
        resizeMode: 'contain',
    },
});

export default LoadingScreen;
