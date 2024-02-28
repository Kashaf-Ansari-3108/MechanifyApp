import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { red } from '../../../font'
import globalStyles from '../../styling/styling'
import styles from './styling'

const Header = ({navigation,title}) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{ flex: 1 }}><AntDesign name="arrowleft" color={red} size={25} /></TouchableOpacity>
      <View style={{ flex: 7 }}><Text style={globalStyles.heading}>{title}</Text></View>
    </View>
  )
}

export default Header