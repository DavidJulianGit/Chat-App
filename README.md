# Chat App

Welcome to the Chat App! This is a simple chat application built using React Native and React Navigation. Users can enter their name and choose a background color for the chat screen. Once the user starts chatting, they are navigated to the chat screen with their chosen background color.

## Why a Mobile Chat App?

Traditionally, building high-quality mobile apps required significant time and resources due to the need for specialized programmers for different platforms like iOS and Android. However, advancements in technology such as React Native have simplified this process by enabling developers to build and maintain mobile applications with just one codebase.

This Chat App demonstrates the use of React Native, Expo, and Google Firestore Database to create a native chat app optimized for both Android and iOS devices.

## Features

-  Users can enter their name and choose a background color for the chat screen before joining the chat.
-  Users can send and receive text messages, images and current location
-  Data gets stored online and offline

## Installation

To run this app locally, follow these steps:

1. **Clone the repository**: Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/DavidJulianGit/Chat-App.git
   ```

2. **Install dependencies**: Navigate to the project folder and install the required dependencies using `npm` or `yarn`.

   ```bash
   cd <project-folder>
   npm install
   ```

   Or, if you're using Yarn:

   ```bash
   cd <project-folder>
   yarn install
   ```

3. **Set up Firebase for your project**:

   1. Sign in at Google Firebase.
   2. Create a project.
   3. Set up Firestore Database (production mode).
   4. Adjust rules from

      ```bash
      allow read, write: if false;
      ```

      to

      ```bash
      allow read, write: if true;
      ```

   5. Initialize Firebase by copying and pasting the provided Firebase configuration into App.js.

4. **Run the app**: Start the app using the following command:

   ```bash
   npm start
   ```

## Dependencies

The app is built with:

-  [React Native](https://reactnative.dev/)
-  [React Navigation](https://reactnavigation.org/)
-  [Expo](https://docs.expo.dev/)
-  [Google Firestore](https://firebase.google.com/docs/firestore)
-  [Gifted Chat Library](https://github.com/FaridSafi/react-native-gifted-chat)
-  [AsyncStorage](https://www.npmjs.com/package/@react-native-async-storage/async-storage)
-  [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
-  [Expo MediaLibrary](https://docs.expo.dev/versions/latest/sdk/media-library/)
-  [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
-  [react-native-maps](https://www.npmjs.com/package/react-native-maps)

## Contributing

If you wish to contribute to this project, feel free to fork the repository and submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
