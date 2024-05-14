import { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';

// importing Firestore Database
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// importing react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importing screens
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';

import { useNetInfo } from "@react-native-community/netinfo";

// Create the navigator
const Stack = createNativeStackNavigator();



const App = () => {

   // Config Firebase
   const firebaseConfig = {
      apiKey: "AIzaSyDXdKUPZrGL6loDd7ra8bpp40XagW3Ti9U",
      authDomain: "chat-app-d1367.firebaseapp.com",
      projectId: "chat-app-d1367",
      storageBucket: "chat-app-d1367.appspot.com",
      messagingSenderId: "706663592231",
      appId: "1:706663592231:web:51534d022a865f19e47902"
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);

   // Initialize Cloud Firestore and get a reference to the service
   const db = getFirestore(app);

   // Keeping track of the internet connection status
   const connectionStatus = useNetInfo();

   useEffect(() => {
      if (connectionStatus.isConnected === false) {
         Alert.alert("Connection Lost!");
         disableNetwork(db);
      } else if (connectionStatus.isConnected === true) {
         enableNetwork(db);
      }
   }, [connectionStatus.isConnected]);

   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName="StartScreen"
         >
            <Stack.Screen
               name="StartScreen"
               component={StartScreen}
            />

            <Stack.Screen name="ChatScreen">
               {props => <ChatScreen isConnected={connectionStatus.isConnected} db={db} {...props} />}
            </Stack.Screen>

         </Stack.Navigator>
      </NavigationContainer>

   );
}


export default App;