/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import { Provider, useDispatch } from 'react-redux';
 import { PersistGate } from 'redux-persist/integration/react';
 import { store, persistedStore } from './src/redux/store';
 import messaging from '@react-native-firebase/messaging';
 import AppNavigation from './src/navigation/AppNavigation';

 
 const App = () => {

  const [initialRoute, setInitialRoute] = useState('Home');
  const [data, setData] = useState('');


  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log("HELLO")
        // if (remoteMessage) {
        //   console.log(
        //     'Notification caused app to open from quit state:',
        //     remoteMessage.notification,
        //     remoteMessage.data
        //   );
        //   setInitialRoute("MessageRoom"); // e.g. "Settings"
        //   setData(remoteMessage.data);
        // }
        // setLoading(false);
      });

  }, []);
 
   return (
     <SafeAreaProvider>
       <Provider store={store}>
         <PersistGate persistor={persistedStore}>
           <AppNavigation initialRouteName={initialRoute} data={data}/>
         </PersistGate>
       </Provider>
     </SafeAreaProvider>
   );
 };
 
 export default App;
 