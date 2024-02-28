// In App.js in a new project
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SignOutStack from './src/navigation/SignOutStack';
import LogInStack from './src/navigation/LogInStack';
import AppContext from './src/Provider/AppContext';
import BootSplash from "react-native-bootsplash";
import { getTokenFromStorage} from './src/authUtils/authUtils';


function App() {
  const [token, setToken] = useState(null);
  const [latitude, setLatitude] = useState(37.78825);
  const [longitude, setLongitude] = useState(-122.4324);
  const [address, setAddress] = useState("");
  const [userRole, setUserRole] = useState("")
  const [authRefresh, setAuthRefresh] = useState(false)
  const [mainLoader, setMainLoader] = useState(false)
  const [userRefresh, setUserRefresh] = useState(false)
  const [requestRefresh, setRequestRefresh] = useState(false)


  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);


  const userSetting = {
    mainLoader,
    setMainLoader,
    token,
    setToken,
    address,
    setAddress,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    authRefresh,
    setAuthRefresh,
    userRole,
    setUserRole,
    userRefresh,
    setUserRefresh,
    requestRefresh,
    setRequestRefresh
  }
  React.useEffect(() => {
    const fetchToken = async () => {
      const getToken = await getTokenFromStorage();
      setToken(getToken);

    };

    fetchToken();
  }, [authRefresh]);

  console.log(token, 'token');

  // console.log(userSetting, "User Setting");
  return (

    <AppContext.Provider value={userSetting}>
      <NavigationContainer>
        {!token ? <SignOutStack /> : <LogInStack />}
      </NavigationContainer>
    </AppContext.Provider>


  );
}

export default App;