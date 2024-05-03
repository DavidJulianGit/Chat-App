import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ChatScreen = ({ route, navigation }) => {

   // Routing parameters
   const { name, backgroundColor } = route.params;

   useEffect(() => {
      navigation.setOptions({ title: name });
   }, [name, navigation]);

   return (
      <View style={[styles.container, { backgroundColor }]}>
         <Text>Hello Chat!</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   }
});

export default ChatScreen;