import React from 'react'
import firestore from '@react-native-firebase/firestore'

export default function CreateChatRoom({ navigation }) {
    // ... rest remains same
    function handleButtonPress() {
      if (roomName.length > 0) {
        // create new thread using firebase & firestore
        firestore()
          .collection('MESSAGE_THREADS')
          .add({
            name: roomName,
            latestMessage: {
              text: `${roomName} created. Welcome!`,
              createdAt: new Date().getTime()
            }
          })
          .then(() => {
            navigation.navigate('ChatRoom')
          })
      }
    }
  }