import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";


const ChatScreen = ({ route, navigation }) => {
   // Routing parameters
   const { name, backgroundColor } = route.params;

   // Chatmessages
   const [messages, setMessages] = useState([]);

   // Colors for the users Chat bubbles and their containing text
   const [colorSchema, setColorSchema] = useState({ textColor: '#ffffff', bubbleColorL: '#b5b5b5', bubbleColorR: '#a4a4a4' });


   // Append new messages to the chat
   const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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

   // Setting the title of the Screen
   useEffect(() => {

      navigation.setOptions({ title: name });
   }, [name, navigation]);

   // Load initial messages
   useEffect(() => {

      getColorSchema(backgroundColor);

      setMessages([
         {
            _id: 1,
            text: `Welcome ${name}`,
            createdAt: new Date(),
            user: {
               _id: 2,
               name: 'React Native',
               avatar: 'https://ideogram.ai/api/images/direct/dViQFzG3TGKg9RHRccjQPA.png',
            },
         },
         {
            _id: 2,
            text: 'You have entered the chat.',
            createdAt: new Date(),
            system: true,
         },
      ]);
   }, []);

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



   return (
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
         <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            onSend={messages => onSend(messages)}
            user={{
               _id: 1
            }}
            renderSystemMessage={renderSystemMessage}
         />

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