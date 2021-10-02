import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Separator from "./Seperator";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from "react-redux";
import { API_URL } from "../utils/config";


export default function ChatRoom({ navigation }) {
    const [threads, setThreads] = useState([])
    const [loading, setLoading] = useState(true)
    const profile = useSelector(state => state.profile.profileInfo)
    console.log("RPFO", profile)

    navigation.setOptions({
        headerLeft: () => <MaterialIcons name='arrow-back' style={{ marginLeft: 10 }} size={24} onPress={() => {
            navigation.goBack();
        }} />,
    })

    useEffect(async () => {
        try {
            const unsubscribe = firestore()
                .collection('MESSAGE_THREADS')
                .orderBy('latestMessage.createdAt', 'desc')
                .onSnapshot(querySnapshot => {
                    const threads = querySnapshot.docs.map(e => {
                        // if(documentSnapshot._data.createdBy === profile?.username || documentSnapshot._data.otherUser === profile?.username){
                        return {
                            _id: e.id,
                            name: '',
                            latestMessage: { text: '' },
                            createdBy: '',
                            otherUser: '',
                            createdByUID: '',
                            otherUserUID: '',
                            ...e.data()
                        }
                    })

                    console.log("THREADS", threads);
                    const filtered = threads
                        .filter(e => {
                            return ((e?.createdBy == profile?.username || e?.otherUser == profile?.username) && e.latestMessage.text.length > 1)
                        })//filter to only keep elements from the same state
                        .map(e => {
                            const {
                                _id,
                                name,
                                latestMessage,
                                createdBy,
                                otherUser,
                                createdByUID,
                                otherUserUID,
                            } = e;
                            return {
                                _id,
                                name,
                                latestMessage,
                                createdBy,
                                otherUser,
                                createdByUID,
                                otherUserUID,
                            };
                        });

                    setThreads(filtered)
                    if (loading) {
                        setLoading(false)
                    }
                })

            return () => unsubscribe()
        } catch (e) {
            console.log("ERROR", e)
        }

    }, [])

    const renderItem = ({ item }) => {
        console.log("IMAGEURL", API_URL + '/static/uploads/users/' + item?.otherUserUID + '/IMG.jpg')
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('MessageRoom', { thread: item })
            }}>
                <View style={styles.row}>
                    {/* <View style={{ height: 50, width: 50, backgroundColor: '#F08080', borderRadius: 50, marginRight: 10, marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity>
                        </TouchableOpacity>
                    </View> */}
                    {item?.createdBy != profile?.username ? (
                        <Image style={{ height: 50, width: 50, borderRadius: 50, marginRight: 10, marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#aaa' }}
                            source={{
                                uri: API_URL + '/static/uploads/users/' + item?.createdByUID + '/IMG.jpg'
                            }}
                            defaultSource={
                                require('../assets/user.png')
                            }
                        />
                    ) : (
                        <Image style={{ height: 50, width: 50, borderRadius: 50, marginRight: 10, marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#aaa' }}
                            source={{
                                uri: API_URL + '/static/uploads/users/' + item?.otherUserUID + '/IMG.jpg'
                            }}
                            defaultSource={
                                require('../assets/user.png')
                            }
                        />
                    )}
                    <View style={styles.content}>
                        <View style={styles.header}>
                            {
                                item?.createdBy === profile?.username ? (
                                    <Text style={styles.nameText}>@{item.otherUser}</Text>
                                ) : (
                                    <Text style={styles.nameText}>@{item?.createdBy}</Text>
                                )
                            }
                        </View>
                        <Text style={styles.contentText}>
                            {item?.latestMessage?.createdBy === profile?.username ? "You" : item?.latestMessage?.createdBy} : {item?.latestMessage.text.slice(0, 90)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    if (loading) {
        return <ActivityIndicator size='large' color='#555' />
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={threads}
                keyExtractor={item => item?._id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <Separator />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        marginTop: 20,
        marginBottom: 30,
        fontSize: 28,
        fontWeight: '500'
    },
    row: {
        paddingRight: 10,
        paddingLeft: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flexShrink: 1
    },
    header: {
        flexDirection: 'row'
    },
    nameText: {
        marginBottom: 2,
        fontWeight: '600',
        fontSize: 16,
        color: '#000'
    },
    dateText: {},
    contentText: {
        color: '#949494',
        fontSize: 12,
    }
})