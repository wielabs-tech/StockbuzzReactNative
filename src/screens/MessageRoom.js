import React, { useEffect, useState } from 'react'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Video from 'react-native-video'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getUserDetailsById } from '../redux/user/user.actions'
import axios from 'axios'


export default function MessageRoom({ navigation, route }) {

    const { thread } = route.params
    
    console.log("THREAD21", thread)
    // const user = auth().currentUser.toJSON()
    const profileInfo = useSelector(state => state.profile.profileInfo);
    const [messages, setMessages] = useState([

    ])
    const dispatch = useDispatch();
    let otherUser
    if (profileInfo?._id?.$oid === thread.createdByUID) {
        otherUser = thread.otherUserUID
    } else {
        otherUser = thread.createdByUID
    }
    const user = useSelector(state => state.user.user);
    console.log("USER", user)
    useEffect(() => {
        if(otherUser?.length > 0)
        dispatch(getUserDetailsById(otherUser));
    }, [otherUser])


    // {"_id": "45eV0ma1UICuWP3Js8D3", "createdBy": "Rohan22", "latestMessage": {"createdAt": 1631967248878, "text": ""}, "name": "Rohan22-Rohan ", "otherUser": "Rohan "}
    navigation.setOptions({
        headerTitle: () => thread.createdBy != profileInfo?.username ? (
            <Text>{thread.createdBy}</Text>
        ) : (
            <Text>{thread.otherUser}</Text>
        ),
        headerLeft: () => <MaterialIcons name='arrow-back' style={{ marginLeft: 10 }} size={24} onPress={() => {
            navigation.goBack();
        }} />,
    })

    useEffect(() => {
        const unsubscribeListener = firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messagesFirebase = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data()

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    }

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.displayName
                        }
                    }

                    // if()

                    return data
                })
                console.log("MESSAGES", messagesFirebase)
                setMessages(messagesFirebase);
            })

        return () => unsubscribeListener()
    }, [])

    async function handleSend(messages) {
        const text = messages[0].text
        firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: profileInfo?._id?.$oid,
                    displayName: "rohan"
                }
            })
        await firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .set(
                {
                    latestMessage: {
                        text,
                        createdAt: new Date().getTime(),
                        createdBy: profileInfo?.username
                    }
                },
                { merge: true }
            )
        const json = JSON.stringify({
            "to": user.firebase_token,
            "notification": {
                "title": "Message from " + user?.username,
                "body": messages[0].text
            },
            "data":{
                "thread" : thread
            },
        });
        const res = await axios.post('https://fcm.googleapis.com/fcm/send', json, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAA5Yxpeho:APA91bFatoOETjXlZIWLBHaQUj9TqIl-bplyi0iERHbu0T4eoBQqXop49kXWlq5zzTlfRHzfxj78OMhjiBVKkklB4dTnPHZMd8z0NUF4CbBM2UEvcg_iiLP5WfNa7cpQ5lub-uS6x2Ae'
            }
        });

    }

    const renderMessageVideo = (props) => {
        const { currentMessage } = props;
        console.log("CURRENT MESSAGE", currentMessage.video)
        return (
            <View style={{ margin: 5 }}>
                <Video
                    paused={true}
                    controls={true}
                    onBuffer={() => {
                        console.log("BUFFERING")
                    }}
                    onError={(e) => {
                        console.log('ERROR', e)
                    }}
                    onLoad={() => {
                        console.log("LOADING")
                    }}
                    onProgress={() => {
                        console.log("PROGRESS")
                    }}
                    onEnd={console.log("ENDING")}
                    resizeMode="cover"
                    source={{ uri: currentMessage.video }}
                    style={{ height: 200, width: 200 }}
                />
            </View>
        );
    };

    return (
        <GiftedChat
            messages={messages}
            textInputStyle={{
                color: '#000',
            }}
            renderBubble={(props) => {
                return (
                    <Bubble {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: 'white',
                            },
                        }} />
                )
            }}
            renderMessageVideo={renderMessageVideo}
            onSend={newMessage => handleSend(newMessage)}
            user={{
                _id: profileInfo?._id?.$oid,
                displayName: ""
            }}
            renderAvatar={null}
        />
    )
    // ...
}