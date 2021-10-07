import React, { useState, useEffect } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from '../components/Avatar';
import ImagePicker from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';

import {
    TextInput,
    Text,
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Switch,
    Button,
    TouchableOpacity,
    useWindowDimensions,
    Alert,
    PermissionsAndroid
} from 'react-native';
import { createRoom } from '../api/ajax';
import { useDispatch, useSelector } from 'react-redux';
import { createRoomsThunk } from '../redux/rooms/rooms.actions';

export const CreateRoom = ({ navigation }) => {
    const dispatch = useDispatch();
    const [wordCount, SetwordCount] = useState(200)
    const [message, setMessage] = useState("")
    const [bearish, setBearish] = useState(false)
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const profile = useSelector(state => state.auth.profileInfo);
    const profileInfo = useSelector(state => state.profile.profileInfo);
    const [image, setImage] = useState("")
    useEffect(() => {
        SetwordCount(200 - message.length)
    }, [message])

    navigation.setOptions({
        headerLeft: () => <MaterialIcons name='arrow-back' style={{ marginLeft: 10 }} size={24} onPress={() => {
            navigation.goBack();
        }} />,
    })


    const imgPic = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
        }).then(ima => {
            console.log("IMAGE", ima)
            setImage(ima)
        }).catch((err) => { console.log("openCamera catch" + err.toString()) });
    }
    console.log("IMAGE", image)

    return (
        <ScrollView>
            <View style={{ backgroundColor: "#fff" }}>
                <View style={styles.container}>
                    <View style={styles.avatar}>
                        <TouchableOpacity onPress={imgPic}>
                            {image ?
                                <Image
                                    style={{ height: 100, width: 100, borderRadius: 50 }}
                                    source={{
                                        uri: image.path
                                    }}
                                /> 
                                : <MaterialIcons name="add-photo-alternate" size={86} color={"#f1f1f1"} />
                            }
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, color: "#00000080" }}>
                            {!image &&
                                <Text>
                                    Upload Room Image
                                </Text>
                            }
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>
                            Title
                        </Text>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            style={styles.inp_title}
                            placeholder="Create your room name"
                            placeholderTextColor="#00000080"
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", }}>
                        <View style={styles.info_header}>
                            <Text style={styles.title}>
                                Info
                            </Text>
                            <Text style={{ marginHorizontal: 15, fontSize: 10 }}>
                                {wordCount}
                            </Text>
                        </View>
                        <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                            <TextInput style={styles.input}
                                multiline
                                style={styles.input}
                                onChangeText={setMessage}
                                value={message}
                                maxLength={200}
                                placeholder="Click and type here...."
                                placeholderTextColor="#00000080"
                            />
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={styles.condition}>
                            By clicking Create you are agreeing to the
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.condition_terms}>
                                Terms and conditions
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: "#fff", height: 100, marginHorizontal: 20 }}>
                        <TouchableOpacity style={styles.button}
                            onPress={async () => {
                                console.log("PROFILE", profileInfo?._id?.$oid)
                                const res = await dispatch(createRoomsThunk(profileInfo?._id?.$oid, title, message, image))
                                if (res?.response?.data?.status === "False") {
                                    Toast.show("Already a room exists with the same name, Try another.", Toast.LONG);
                                } else {
                                    navigation.goBack();
                                }
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 14 }}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: "#fff",
        marginHorizontal: 10,
    },
    avatar: {
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    inp_title: {
        height: 50,
        margin: 10,
        backgroundColor: "#4955BB0D",
        borderRadius: 10,
        color: '#000',
        paddingLeft: 10
    },
    title: {
        marginHorizontal: 15,
        fontFamily: "inter",
        fontSize: 17
    },
    input: {
        padding: 15,
        backgroundColor: "#4955BB0D",
        color: "black",
        height: 200,
        borderRadius: 10,
    },
    button: {
        textAlign: "center",
        alignItems: "center",
        width: "100%",
        height: 40,
        backgroundColor: "#4955BB",
        justifyContent: "center",
        marginVertical: 15,
        borderRadius: 15
    },
    info_header: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    condition: {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 10,
        color: "#00000080"
    },
    condition_terms: {
        marginVertical: 10,
        fontSize: 10,
        color: "#00000080",
        marginBottom: 9,
        borderBottomWidth: 1,
        borderColor: "#00000080"
    }


});