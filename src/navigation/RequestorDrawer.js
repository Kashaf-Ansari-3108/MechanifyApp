import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Requestor/Profile/Profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet, Text } from 'react-native';
import { white, black, Poppins_Regular } from '../../font'
import ReqSideBar from '../components/SideBarMenu/ReqSideBar';
import ReqHome from '../screens/Requestor/Home/Home';
import RequestHistory from '../screens/Requestor/RequestHistory/RequestHistory';
import ActiveRequest from '../screens/Requestor/ActiveRequest/ActiveRequest';
import ReqSettings from '../screens/Requestor/Settings/Settings';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Drawer = createDrawerNavigator();

const RequestorDrawer = () => {
  return (
    <>
      <Drawer.Navigator
       initialRouteName="Home"
        screenOptions={{}}
        drawerContent={props => <ReqSideBar {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={ReqHome}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
          }}
        />
        
        <Drawer.Screen name="Profile" component={Profile}
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
          <Drawer.Screen name="ActiveRequest" component={ActiveRequest}
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
        <Drawer.Screen name="RequestHistory" component={RequestHistory}
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
        <Drawer.Screen name="ReqSettings" component={ReqSettings}
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


export default RequestorDrawer;