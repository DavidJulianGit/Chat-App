import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const StartScreen = ({ navigation }) => {
   // Define state for user name and selected color
   const [name, setName] = useState('');
   const [selectedColor, setSelectedColor] = useState('#B9C6AE'); // Default color

   // Handle navigation to the chat screen
   const handleStartChatting = () => {
      navigation.navigate('ChatScreen', {});
   };

   // Authentication
   const auth = getAuth();

   const signInUser = () => {
      signInAnonymously(auth)
         .then(result => {
            navigation.navigate("ChatScreen", { name, backgroundColor: selectedColor, userID: result.user.uid, });

            //Alert.alert("Signed in Successfully!");
         })
         .catch((error) => {
            Alert.alert("Unable to sign in, try later again.");
         })
   }
   return (
      // Background image
      <ImageBackground source={require('../assets/bg-image.png')} style={styles.backgroundImage}>
         <View style={styles.container}>

            {/* Title at the top of the screen */}
            <Text style={styles.title}>Let's Chat</Text>

            {/* User interaction space at the bottom of the screen */}
            <View style={styles.UI}>

               {/* Text input for username */}
               <TextInput
                  style={styles.nameInput}
                  placeholder="Your name"
                  placeholderTextColor="rgba(117, 112, 131, 0.5)" // #757083 with 50% opacity
                  onChangeText={setName}
                  value={name}
               />

               {/* Choosing background color */}
               <View style={styles.colorSelection}>
                  <Text style={styles.chooseBackgroundColor}>Choose Background Color</Text>

                  {/* Color options */}
                  <View style={styles.colorOptions}>
                     {['#090C08', '#474056', '#8A95A5', '#B9C6AE'].map((color, index) => (
                        <TouchableOpacity
                           key={index}
                           style={[
                              styles.colorCircle,
                              { backgroundColor: color },

                              {/* Change border is item is selected */ },
                              selectedColor === color && { borderColor: '#F5DEB3', borderWidth: 4 }
                           ]}
                           onPress={() => setSelectedColor(color)}
                        />
                     ))}
                  </View>
               </View>

               {/* Start chatting button */}
               <TouchableOpacity style={styles.startChattingButton} onPress={signInUser}>
                  <Text style={styles.startChattingButtonText}>Start Chatting</Text>
               </TouchableOpacity>
            </View>
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
         </View>
      </ImageBackground>
   );
};

// Define styles
const styles = StyleSheet.create({
   backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
   },
   container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
   },
   UI: {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      width: '88%',
      padding: '6%',
   },
   title: {
      fontSize: 45,
      fontWeight: '600',
      color: '#FFFFFF',
      marginVertical: 30,
   },
   nameInput: {
      fontSize: 16,
      fontWeight: '300',
      color: '#757083',
      borderWidth: 1,
      borderColor: '#757083',
      width: '100%',
      padding: 10,
      borderRadius: 5,
      marginBottom: 30,
      opacity: 0.5,
   },
   chooseBackgroundColor: {
      fontSize: 16,
      fontWeight: '300',
      color: '#757083',
      marginBottom: 10,
   },
   colorOptions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '88%',
      marginBottom: 30,
   },
   colorCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#ffffff',
   },
   startChattingButton: {
      backgroundColor: '#757083',
      padding: 15,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
   },
   startChattingButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
   },
});

export default StartScreen;
