import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatScreen = ({ route, navigation, db, isConnected }) => {
   // Routing parameters
   const { name, backgroundColor, userID } = route.params;

   // Chatmessages
   const [messages, setMessages] = useState([]);

   // Colors for the users Chat bubbles and their containing text
   const [colorSchema, setColorSchema] = useState({ textColor: '#ffffff', bubbleColorL: '#b5b5b5', bubbleColorR: '#a4a4a4' });


   // Append new messages to the DB
   const onSend = (newMessages) => {
      addDoc(collection(db, "MessagesCollection"), newMessages[0]);
   }

   // Get textColor and bubbleColor for the chosen backgroundColor
   const getColorSchema = (color) => {
      switch (color) {
         case '#090C08':
            setColorSchema({ textColor: '#ffffff', bubbleColorL: '#506A47', bubbleColorR: '#6A8C5E' });
            break;
         case '#474056':
            setColorSchema({ textColor: '#ffffff', bubbleColorL: '#9485B4', bubbleColorR: '#B09FD6' });
            break;
         case '#8A95A5':
            setColorSchema({ textColor: '#ffffff', bubbleColorL: '#5F6B7C', bubbleColorR: '#A3B4CC' });
            break;
         case '#B9C6AE':
            setColorSchema({ textColor: '#ffffff', bubbleColorL: '#87967A', bubbleColorR: '#A3BA8F' });
            break;
      }
   }


   let unsubMessages;

   useEffect(() => {
      // Set screen title
      navigation.setOptions({ title: 'Chat' });

      // load messages from DB if the device is connected to the internet, otherwise load from cache
      if (isConnected === true) {

         // unregister current onSnapshot() listener to avoid registering multiple listeners when
         // useEffect code is re-executed.
         if (unsubMessages) unsubMessages();
         unsubMessages = null;

         // DB Query
         const qu = query(collection(db, "MessagesCollection"), orderBy("createdAt", "desc"));

         // Create DB listener 
         unsubMessages = onSnapshot(qu, async (documentsSnapshot) => {

            let newMessage = [];

            // read chat messages
            documentsSnapshot.forEach(doc => {
               newMessage.push({
                  id: doc.id,
                  ...doc.data(),
                  createdAt: new Date(doc.data().createdAt.toMillis()),
               })
            });

            // save new Messages in cache
            cacheMessages(newMessage);

            // save messages in local state
            setMessages(newMessage);
         });
      }
      else loadCachedMessages();


      // Colors for the Chat window according to the selected color in the start screen
      getColorSchema(backgroundColor);

      return () => {
         // code to execute when the component will be unmounted - unsubscribe onSnapShot listener
         if (unsubMessages) unsubMessages();
      }
   }, [isConnected]);

   const cacheMessages = async (messageToChache) => {
      try {
         await AsyncStorage.setItem('chatMessages', JSON.stringify(messageToChache));
      } catch (error) {
         console.log(error.message);
      }
   }

   const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem("chatMessages") || [];
      setMessages(JSON.parse(cachedMessages));
   }

   // Setting message bubble style
   const renderBubble = (props) => {
      return <Bubble
         {...props}
         textStyle={{
            right: { color: colorSchema.textColor },
            left: { color: colorSchema.textColor },
         }}
         wrapperStyle={{
            right: { backgroundColor: colorSchema.bubbleColorR },
            left: { backgroundColor: colorSchema.bubbleColorL },
         }}
      />
   }

   const renderSystemMessage = (props) => {
      return (
         <Text style={{ color: colorSchema.bubbleColorL, textAlign: 'center', padding: 20 }}>
            {props.currentMessage.text}
         </Text>
      );
   };

   // Disable the input if offline
   const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
   }

   return (
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
         <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            onSend={messages => onSend(messages)}
            user={{
               _id: userID,
               name: name,
            }}
            renderSystemMessage={renderSystemMessage}
         />
         {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
         ) : null}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
   },
});

export default ChatScreen;