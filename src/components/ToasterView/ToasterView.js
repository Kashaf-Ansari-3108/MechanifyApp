import { View, Text } from 'react-native'
import React from 'react'
import Toast from 'react-native-simple-toast';
const ToasterView = (toasts) => {
        if(toasts != null || toasts != undefined){
            return Toast.show(toasts);
        }
        else{
            return
        }
}
export default ToasterView;