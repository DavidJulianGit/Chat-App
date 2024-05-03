import { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';

// importing react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importing screens
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
   const [text, setText] = useState('');

   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName="StartScreen"
         >
            <Stack.Screen
               name="StartScreen"
               component={StartScreen}
            />
            <Stack.Screen
               name="ChatScreen"
               component={ChatScreen}
            />
         </Stack.Navigator>
      </NavigationContainer>

   );
}


export default App;