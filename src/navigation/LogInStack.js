import React,{useContext} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReqLoginStack from './ReqLoginStack';
import MechLoginStack from './MechLoginStack';
import AppContext from '../Provider/AppContext';
import { getUserFromStorage } from '../authUtils/authUtils';
import LoadingScreen from '../components/MainLoader/MainLoader';

const Stack = createNativeStackNavigator();
const LogInStack = () => {
  const myContext = useContext(AppContext)
  React.useEffect(() => {
    const fetchToken = async () => {
      const getUser = await getUserFromStorage();
      myContext.setUserRole(getUser?.role);
    };

    fetchToken();
  }, [myContext.authRefresh]);

  console.log(myContext.userRole, 'role');
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,

    }}>
      {myContext.userRole == "Requestor"?
      <Stack.Screen name="LoginStack" component={ReqLoginStack} />:
      myContext.userRole == "Mechanic"? 
      <Stack.Screen name="LoginStack" component={MechLoginStack} />:
      <Stack.Screen name="Loading" component={LoadingScreen} />
    }
      
    
    </Stack.Navigator>
  )
}

export default LogInStack