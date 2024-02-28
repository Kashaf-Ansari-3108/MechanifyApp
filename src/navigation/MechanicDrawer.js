import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Mechanic/Profile/Profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { StyleSheet, Text } from 'react-native';
import { white, black, Poppins_Regular } from '../../font'
import MechSideBar from '../components/SideBarMenu/MechSideBar';
import MechHome from '../screens/Mechanic/Home/Home';
import MechRequestHistory from '../screens/Mechanic/RequestHistory/RequestHistory';
import MechActiveRequest from '../screens/Mechanic/ActiveRequest/ActiveRequest';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MyProfile from '../screens/Mechanic/MyProfile/MyProfile';
import Settings from '../screens/Mechanic/Settings/Settings';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Drawer = createDrawerNavigator();

const MechanicDrawer = () => {
  return (
    <>
      <Drawer.Navigator
       initialRouteName="Home"
        screenOptions={{}}
        drawerContent={props => <MechSideBar {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={MechHome}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
          }}
        />
        
        <Drawer.Screen name="MyProfile" component={MyProfile}
          options={{
            headerShown: false,
            drawerLabel: () => <Text style={styles.item}>Profile</Text>,
            drawerIcon: () => (
              <FontAwesome
                name="user-o"
                size={25}
                color={white}
              />
            ),
          }}
        />
        <Drawer.Screen name="MechActiveRequest" component={MechActiveRequest}
          options={{
            headerShown: false,
            drawerLabel: () => <Text style={styles.item}>Active Request</Text>,
            drawerIcon: () => (
              <MaterialIcons
                name="notifications-active"
                size={25}
                color={white}
              />
            ),
          }}
        />
         <Drawer.Screen name="MechRequestHistory" component={MechRequestHistory}
          options={{
            headerShown: false,
            drawerLabel: () => <Text style={styles.item}>Request History</Text>,
            drawerIcon: () => (
              <FontAwesome
                name="history"
                size={25}
                color={white}
              />
            ),
          }}
        />
        <Drawer.Screen name="Settings" component={Settings}
          options={{
            headerShown: false,
            drawerLabel: () => <Text style={styles.item}>Settings</Text>,
            drawerIcon: () => (
              <AntDesign
                name="setting"
                size={25}
                color={white}
              />
            ),
          }}
        />
       </Drawer.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    fontFamily: Poppins_Regular,
    color: black,
    fontSize: 14
  }
})


export default MechanicDrawer;