import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrivacyPolicy from '../screens/PrivacyPolicy/PrivacyPolicy';
import TermsCondition from '../screens/TermsCondition/TermsCondition';
import Location from '../screens/Location/Location';
import MechanicDrawer from './MechanicDrawer';
import MechViewRequest from '../screens/Mechanic/ViewRequest/ViewRequest';
import HelpAndSupport from '../screens/HelpSupport/HelpSupport';
import Faqs from '../screens/FAQs/FAQs';
import MechRequestHistory from '../screens/Mechanic/RequestHistory/RequestHistory';
import MechNotifications from '../screens/Mechanic/Notifications/Notifications';
import MechProfile from '../screens/Mechanic/Profile/Profile';
import ChangePassword from '../screens/ChangePassword/ChangePassword';




const Stack = createNativeStackNavigator();
const MechLoginStack = () => {
  return (
    <Stack.Navigator  screenOptions={{
        headerShown: false,
        
      }}>
      <Stack.Screen name="MechanicDrawer" component={MechanicDrawer} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsCondition} />
      <Stack.Screen name="HelpSupport" component={HelpAndSupport} />
      <Stack.Screen name="FAQs" component={Faqs} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="MechViewRequest" component={MechViewRequest} />
      <Stack.Screen name="MechRequestHistory" component={MechRequestHistory} />
      <Stack.Screen name="MechNotifications" component={MechNotifications} />
      <Stack.Screen name="MechProfile" component={MechProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      
    </Stack.Navigator>
  )
}

export default MechLoginStack