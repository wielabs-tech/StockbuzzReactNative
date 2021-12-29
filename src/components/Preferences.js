import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Switch,
    Image,
    Button,
    TouchableOpacity,
    useWindowDimensions,
    TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Checkbox } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/auth.actions';
import { updateProfileInfo, updateProfileInfoThunk } from '../redux/profile/profile.actions';
import { API_URL } from '../utils/config';

function Preferences() {
    const navigation = useNavigation();
    const [message, setMessage] = useState("")
    // const [isSelected, setSelection] = useState(false);
    const [top, setTop] = React.useState(false);
    const [all, setAll] = React.useState(false);
    const [charts, setCharts] = React.useState(false);
    const [links, setLinks] = React.useState(false);
    const [wordCount, SetwordCount] = useState(100)
    const profile = useSelector(state => state.profile.profileInfo);
    console.log(profile)

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <MaterialIcons name='arrow-back' style={{ marginLeft: 10 }} size={24} onPress={() => {
                navigation.goBack();
            }} />,
        })
    }, [])

    const [full_name, setFullName] = useState(profile?.full_name);
    const [image, setImage] = useState();
    const [bio, setBio] = useState(!!profile?.bio ? profile?.bio : " ");

    useEffect(() => {
        SetwordCount(100 - message.length)
    }, [message])

    const dispatch = useDispatch();

    const uploadImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            maxFiles: 5,
        })
            .then(async (ima) => {
                await setImage(ima);
                console.log("IMGGG", ima);
                await dispatch(updateProfileInfoThunk(profile?._id?.$oid, full_name, bio, image))
            })
            .catch(err => {
                console.log('openCamera catch' + err.toString());
            });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ width: '100%', justifyContent: 'center' }}>
                    <View style={{ alignSelf: 'center' }}>
                        {
                            image ? (
                                <Image
                                    style={{ height: 100, width: 100, borderRadius: 50 }}
                                    source={{
                                        uri: image.path
                                    }}
                                />
                            ) :
                                profile?.photo ? (
                                    <>
                                    <Image
                                        style={{ height: 100, width: 100, borderRadius: 50 }}
                                        source={{
                                            uri: API_URL + `/` + profile?.photo
                                        }}
                                    />
                                    <>{console.log(API_URL + `/` + profile?.photo)}</>
                                    </>
                                ) :
                                    (
                                        <MaterialIcons name="account-circle" size={100} color="#e1e1e1" />
                                    )
                        }
                        <TouchableOpacity style={{ height: 24, width: 24, backgroundColor: '#000000ee', position: 'absolute', bottom: 5, right: 5, justifyContent: 'center', borderRadius: 50 }} onPress={() => { uploadImage() }}>
                            <MaterialIcons name="edit" size={16} color={'white'} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#000', fontSize: 16 }}>
                        Name
                    </Text>
                </View>
                <TextInput
                    value={full_name}
                    onChangeText={setFullName}
                    style={styles.input}
                    placeholderTextColor="#00000080"
                />
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#000', fontSize: 16 }}>
                        Bio
                    </Text>
                    <Text
                        style={{ marginRight: 10, fontSize: 10 }}>
                        {wordCount}
                    </Text>
                </View>
                <TextInput
                    multiline
                    numberOfLines={3}
                    value={bio}
                    onChangeText={setBio}
                    style={styles.input}
                    maxLength={100}
                    placeholder="click and type here...."
                    placeholderTextColor="#00000080"
                />

                {
                    profile?.email != "null" ?
                        <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'flex-start', marginTop: 10 }}>
                            <Text >
                                Email :
                            </Text>
                            <Text>
                                {
                                    " " + profile?.email
                                }
                            </Text>
                        </View> : <></>
                }


                <View style={{ padding: 20 }}>
                    {/* <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                        <Checkbox
                            status={links ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLinks(!links);
                            }}
                        />
                        <Text>
                            Include me in the Stockbuzz new letter
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                        <Checkbox
                            status={links ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLinks(!links);
                            }}
                        />
                        <Text>
                            Include me in the Stockbuzz new letter
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                        <Checkbox
                            status={links ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLinks(!links);
                            }}
                        />
                        <Text>
                            Send me Followers notification via email
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                        <Checkbox
                            status={links ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLinks(!links);
                            }}
                        />
                        <Text>
                            Send me Linked notification via email
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                        <Checkbox
                            status={links ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLinks(!links);
                            }}
                        />
                        <Text>
                            Send me Likednotification via email
                        </Text>
                    </View> 
                    <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                        <Checkbox
                            status={links ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLinks(!links);
                            }}
                        />
                        <Text>
                            Show me Reshared Message notification via email
                        </Text>
                    </View><View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                        <Checkbox
                            status={links ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLinks(!links);
                            }}
                        />
                        <Text>
                            Send me Mention notification via email
                        </Text>
                    </View> */}
                    <View >
                        <TouchableOpacity style={styles.button}
                            onPress={async () => {
                                await dispatch(updateProfileInfoThunk(profile?._id?.$oid, full_name, bio, image))
                                navigation.goBack();
                            }}
                        >
                            <Text style={{ color: "#fff", alignSelf: 'center', fontSize: 16 }}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity onPress={() => {
                    dispatch(logout())
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <MaterialIcons name="logout" size={16} />
                        <Text style={{ fontSize: 20, color: 'red', marginLeft: 5 }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: "#fff",
        padding: 10
    },
    input: {
        marginVertical: 10,
        borderWidth: 0.3,
        borderColor: "#4955BB",
        color: "black",
        textAlignVertical: "top",
        borderRadius: 10,
        padding: 15
    },
    button: {
        marginTop: 15,
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#4955BB",
        alignItems: 'center',
        borderRadius: 10
    }
});

export default Preferences