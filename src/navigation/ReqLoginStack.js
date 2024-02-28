import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrivacyPolicy from '../screens/PrivacyPolicy/PrivacyPolicy';
import TermsCondition from '../screens/TermsCondition/TermsCondition';
import Location from '../screens/Location/Location';
import RequestorDrawer from './RequestorDrawer';
import ViewMechanic from '../screens/Requestor/ViewMechanic/ViewMechanic';
import HelpAndSupport from '../screens/HelpSupport/HelpSupport';
import Faqs from '../screens/FAQs/FAQs';
import ViewRequest from '../screens/Requestor/ViewRequest/ViewRequest';
import ReqNotifications from '../screens/Requestor/Notifications/Notifications';
import ReqHome from '../screens/Requestor/Home/Home';
import ChangePassword from '../screens/ChangePassword/ChangePassword';

const Stack = createNativeStackNavigator();
const ReqLoginStack = () => {
  return (
    <Stack.Navigator  screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="RequestorDrawer" component={RequestorDrawer} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsCondition} />
      <Stack.Screen name="HelpSupport" component={HelpAndSupport} />
      <Stack.Screen name="FAQs" component={Faqs} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="ViewMechanic" component={ViewMechanic} />
      <Stack.Screen name="ViewRequest" component={ViewRequest} />
      <Stack.Screen name="ReqNotifications" component={ReqNotifications} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
     
    </Stack.Navigator>
  )
}

export default ReqLoginStack