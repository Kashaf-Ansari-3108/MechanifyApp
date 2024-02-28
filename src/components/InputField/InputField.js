import { View, TextInput } from 'react-native'
import React from 'react'
import styles from './styling'
import { moderateScale } from 'react-native-size-matters'
import { silver } from '../../../font'

const InputField = ({placeholder, setVal,editable,value,secureTextEntry}) => {
  return (
    <>
    <View style={{paddingVertical:moderateScale(7)}}>
     <TextInput
     value={value}
     editable={editable} 
      onChangeText={(e)=>setVal(e)}  
      style={styles.InputText} 
      placeholderTextColor={silver} 
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      />
     </View>
    </>
  )
}

export default InputField