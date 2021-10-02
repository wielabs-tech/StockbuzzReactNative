import React, { useState, useEffect, useRef } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from '../components/Avatar';
import ImagePicker from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ProgressDialog from 'react-native-progress-dialog';
import {
    Image,
    TextInput,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { profileAPI, roomsAPI, uploadPost } from '../api/ajax';
import { FlatList } from 'react-native-gesture-handler';
import ParsedText from 'react-native-parsed-text';
import {
    getStockFeedThunk,
    getSuggestionsThunk,
    setSuggestionEmptyThunk,
} from '../redux/stocks/stocks.actions';
import { GifSearch } from 'react-native-gif-search';
import { ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { getRoomPostsThunk } from '../redux/rooms/rooms.actions';
import AsyncStorage from '@react-native-community/async-storage';
import TwitterButton from './TwitterButtonConnection';

export default PostCreate = ({ navigation, route }) => {
    const scrollRef = useRef();
    console.log("ROUTE", route?.params?.groupPost);
    console.log("PREFILL", route.params?.prefill);
    const [wordCount, SetwordCount] = useState(200);
    const m = route?.params?.prefill ? "$" + route?.params?.prefill : "";
    const [message, setMessage] = useState(m);
    const [bearish, setBearish] = useState(false);
    const [bulish, setBulish] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [twitter, setTwitter] = useState(false);
    const profileInfo = useSelector(state => state.profile.profileInfo);
    const [image, setImage] = useState('');
    const [isGifVisible, setIsGifVisible] = useState(false);

    const suggestions = useSelector(state => state.stocks.suggestions);
    const [val, setVal] = useState('');
    const dispatch = useDispatch();

    navigation.setOptions({
        headerLeft: () => <MaterialIcons name='arrow-back' style={{marginLeft: 10}} size={24} onPress={() => {
            navigation.goBack();
        }}/>,
    })

    useEffect(() => {
        var n = message.split(' ');
        let ms = n[n.length - 1];
        if (ms.length > 1 && ms[0] === '$') {
            dispatch(getSuggestionsThunk(ms.substring(1, ms.length)));
            onPressTouch();
        }
        else dispatch(setSuggestionEmptyThunk());
    }, [message]);

    useEffect(() => {
        SetwordCount(200 - message.length);
    }, [message]);

    const BearishFuc = () => {
        setBearish(!bearish);
        setBulish(false);
    };
    const BulishFuc = () => {
        setBulish(!bulish);
        setBearish(false);
    };

    const TwitterFuc = async () => {
        const token = await AsyncStorage.getItem('@authTokenTwitter')
        const secret = await AsyncStorage.getItem('@authTokenSecretTwitter')
        console.log("TOKEN", token, secret)
        if(!!token && !!secret){
            setTwitter(!twitter);
        } else {
            <TwitterButton />
        }
    };

    const imgPic = () => {
        ImagePicker.openPicker({

            cropping: true,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            maxFiles: 5,
        })
            .then(ima => {
                console.log(ima)
                setImage(ima);
                console.log(image);
            })
            .catch(err => {
                console.log('openCamera catch' + err.toString());
            });
    };

    const remove = () => {
        setImage(null);
    }

    const onPressTouch = () => {
        console.log("SCROLLING")
        scrollRef.current?.scrollTo({
            y: 200,
            animated: true,
        });
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ width: '100%', backgroundColor: '#fff' }}>
                <TouchableOpacity
                    onPress={() => {
                        var str = message;
                        var lastIndex = str.lastIndexOf(" ");
                        str = str.substring(0, lastIndex);
                        setMessage(str + " $" + item.symbol)
                    }}
                    style={{ marginLeft: 10, marginRight: 10, width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ marginTop: 10, marginBottom: 5, marginLeft: 10 }}>
                                {item.symbol}
                            </Text>
                            <Text style={{ marginBottom: 10, marginLeft: 10, fontSize: 10 }}>
                                {item.symbol_info}
                            </Text>
                        </View>
                        {/* <Text>{item.}</Text> */}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
        <ProgressDialog
        loaderColor={"#4955BB"}
        label={"Posting"}
        visible={isPosting}/>
            <ScrollView
                ref={scrollRef}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
                keyboardShouldPersistTaps={"always"}
                style={{ backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <View style={styles.profile_container}>
                        <View
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                        </View>
                    </View>
                    {
                        !!image && (
                            <View style={{ height: 120, marginTop: 60 }}>
                                <View style={{ height: 100, width: 100, marginTop: 10, margin: 10 }}>
                                    <MaterialIcons
                                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                        onPress={() => {
                                            remove()
                                        }}
                                        style={{ position: 'absolute', zIndex: 1, right: -15, top: -5 }} name="highlight-off" size={24} color='grey' />
                                    <Image
                                        style={{ height: 100, width: 100, margin: 5 }}
                                        source={{
                                            uri: image.path
                                        }}
                                    />
                                </View>
                            </View>
                        )
                    }
                    <View style={{ marginTop: !!image ? 10 : 60, marginHorizontal: 10 }}>
                        <TextInput
                            multiline
                            autoFocus={true}
                            style={styles.input}
                            onChangeText={text => {
                                setMessage(text);
                                var n = text.split(' ');
                                const isStock = n[n.length - 1];
                                if (isStock[0] === '$') {
                                }
                            }}
                            maxLength={200}
                            placeholder="Click and type here...."
                            placeholderTextColor="#00000080"
                        >
                            <ParsedText
                                style={styles.text}
                                parse={
                                    [
                                        { pattern: /\$(\w+)/, style: styles.hashTag },
                                    ]
                                }
                                childrenProps={{ allowFontScaling: false }}
                            >
                                {message}
                            </ParsedText>
                        </TextInput>
                    </View>

                    <FlatList
                        keyboardShouldPersistTaps="always"
                        style={{}}
                        data={suggestions?.symbols}
                        keyExtractor={item => item.symbol}
                        renderItem={renderItem}
                    />
                    <View style={styles.bottom_container}>
                        <TouchableOpacity
                            onPress={() => {
                                setIsGifVisible(true);
                            }}>
                            <View>
                                <MaterialIcons size={36} name="gif" color="#00000080" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={imgPic}>
                            <View>
                                <Entypo size={24} color="#00000080" name="image" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={BearishFuc}>
                            <View
                                style={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 8,
                                    alignSelf: 'center',
                                    borderRadius: 5,
                                    borderWidth: bearish ? 0 : 1,
                                    borderColor: '#FD6B74',
                                    backgroundColor: bearish ? '#FD6B74' : '#FD6B7432',
                                }}>
                                <Text style={{ color: bearish ? '#fff' : '#FD6B74' }}>
                                    Bearish
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={BulishFuc}>
                            <View
                                style={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 8,
                                    alignSelf: 'center',
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: '#34CB8B',
                                    backgroundColor: bulish ? '#34CB8B' : '#34CB8B32',
                                }}>
                                <Text style={{ color: bulish ? '#fff' : '#34CB8B' }}>Bulish</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={TwitterFuc}>
                            <View>
                                <Entypo
                                    size={30}
                                    name="twitter-with-circle"
                                    style={{
                                        color: twitter ? '#1DA1F2' : '#1DA1F232',
                                        backgroundColor: '#fff',
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={async () => {
                                if(!route?.params?.groupPost){
                                    const userid = profileInfo?._id?.$oid;
                                    setIsPosting(true);
                                    await uploadPost(userid, message, image, bulish, bearish, twitter);
                                    await dispatch(getStockFeedThunk(route.params?.prefill))
                                    setIsPosting(false);
                                    navigation.goBack();
                                } else {
                                    const userid = profileInfo?._id?.$oid;
                                    roomsAPI.roomPost(userid, message, image, bulish, bearish, route?.params?.groupId)
                                    await dispatch(getRoomPostsThunk(route?.params?.groupId))
                                    navigation.goBack();
                                }
                                
                            }}>
                            <View style={styles.button}>
                                <Ionicons
                                    size={50}
                                    name="arrow-forward-circle"
                                    style={styles.shadow}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    isGifVisible && (
                        <View
                            style={{ position: 'absolute', bottom: 0, elevation: 100, zIndex: 10, width: '100%', height: 300 }}
                        >
                            <View style={{ height: 50, width: '100%', backgroundColor: '#000' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsGifVisible(false);
                                    }}
                                >
                                    <MaterialIcons name='close' color="#fff" style={{marginTop: 10, marginLeft: 10}} size={36} />
                                </TouchableOpacity>
                            </View>
                            <GifSearch
                                numColumns={2}
                                horizontal={false}
                                style={{ height: 300 }}
                                visible={isGifVisible}
                                giphyApiKey={"BNTnS5Dao0Bq4a5iWbTCeKORPuHulBDY"}
                                onGifSelected={(gif_url) => {
                                    setIsGifVisible(false);
                                    setImage({
                                        path: gif_url,
                                        mime: "image/gif"
                                    })
                                }}
                            />
                        </View>
                    )
                }
            </ScrollView>

        </>
    );
};

const styles = StyleSheet.create({

    hashTag: {
        color: '#5B72FF',
    },

    input: {
        borderWidth: 0.3,
        borderColor: '#00000080',
        color: 'black',
        height: 150,
        textAlignVertical: 'top',
        borderRadius: 10,
        padding: 15,
    },
    container: {
        height: '100%',
        backgroundColor: '#fff',
    },
    bottom_container: {
        marginHorizontal: '5%',
        zIndex: 1,
        width: '90%',
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        top: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profile_container: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottom: {
        position: 'absolute', //Here is the trick
        bottom: 0,
    },
    button: {
        // borderRadius:10,
    },
    shadow: {
        color: '#4955BB',
        shadowColor: '#eee',
        shadowOpacity: 2,
        textShadowRadius: 5,
        textShadowOffset: { width: 2, height: 1 },
    },
});
