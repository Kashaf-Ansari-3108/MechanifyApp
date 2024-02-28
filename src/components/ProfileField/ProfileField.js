import { View, Text, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { red } from '../../../font'
import styles from './styling'


const ProfileField = ({ label, value, secureTextEntry, editPress, multiline }) => {
    return (
        <View style={styles.main}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ flex: 10 }}><Text style={styles.label}>{label ? label : "Label"}</Text></View>
                <TouchableOpacity onPress={editPress} style={editPress?{flex:1}:{display:'none'}}><SimpleLineIcons name="pencil" color={red} size={18} /></TouchableOpacity>
            </View>
            <View>
                <TextInput multiline={multiline} editable={false} secureTextEntry={secureTextEntry} style={styles.InputText} value={value} />
            </View>
        </View>
    )
}

export default ProfileField