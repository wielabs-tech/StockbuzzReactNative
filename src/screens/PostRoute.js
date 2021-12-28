import React, { useEffect, useState } from 'react';
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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../components/Avatar';
import ImageModal from 'react-native-image-modal';
import ParsedText from 'react-native-parsed-text';
import { profileAPI } from '../api/ajax';
import { API_URL } from '../utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPostsThunk, likePostThunk, likeRoomPostThunk } from '../redux/profile/profile.actions';
import { useNavigation } from '@react-navigation/native';
import { getRoomPostsThunk } from '../redux/rooms/rooms.actions';

const PostRoute = props => {
  const item = props.item;
  const isRoom = props.isRoom;
  const roomid = props.roomId;
  const x = new Date();
  var UTCseconds = x.getTime() + 330 * 60 * 1000;
  const { width, height } = Dimensions.get('window');
  const dispatch = useDispatch();
  const profileInfo = useSelector(state => state.profile.profileInfo);
  const navigation = useNavigation();
  function isLiked(likes) {
    return likes.$oid === profileInfo?._id?.$oid;
  }

  const findLike = item?.likes?.find(isLiked);
  const [liked, setLiked] = useState(findLike?.$oid === profileInfo?._id?.$oid);
  const [localLiked, setLocalLiked] = useState(item?.likes?.length);
  // const {width, height} = Dimensions.get('window')

  useEffect(() => {
    setLiked(findLike?.$oid === profileInfo?._id.$oid)
    setLocalLiked(item?.likes?.length)
  }, [])
  var UTCseconds = x.getTime() + 330 * 60 * 1000;
  const cryptos = useSelector(state => state.stocks.cryptos);

  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    var days = Math.floor(duration / (1000 * 60 * 60) / 24);

    if (days > 0) {
      if (days === 1) return '1 day ago';
      else return days + ' days ago';
    } else if (hours > 0) {
      if (hours === 1) return '1 hour ago';
      else return hours + ' hours ago';
    } else if (minutes > 0) {
      if (minutes === 1) return '1 minute ago';
      else return minutes + ' minutes ago';
    } else {
      if (seconds === 1) return '1 second ago';
      else return seconds + ' seconds ago';
    }
  }

  const handleNamePress = async (stockSymbol, matchIndex) => {
    const result = await cryptos?.filter(e => e.symbol === stockSymbol.substring(1));
    console.log("RESULTS", result)
    if (result?.length > 0) {
      navigation.push('cryptoScreen', {
        item: {
          symbol: stockSymbol.substring(1)
        },
      });
    } else {
      navigation.push('stockScreen', {
        item: {
          symbol: stockSymbol.substring(1)
        },
      });
    }
  }

  const handleUsernamePress = async (username) => {
    console.log("USERNAME", username.substring(1))
    const res = await profileAPI.getProfileInfoByUsername(username.substring(1));
    console.log("USER1", res?.data?._id?.$oid)
    navigation.navigate('UserProfile', { userId: res?.data?._id?.$oid })
  }

  const renderText = (matchingString, matches) => {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  }

  const [widthImage, setWidthImage] = useState();
  const [heightImage, setHeightImage] = useState();

  if (item?.image) {
    Image.getSize(API_URL + `/` + item?.image, (w, height) => {
      setWidthImage(w);
      setHeightImage(((width - 40) * height) / w);
    })
  }

  return (
    <ScrollView
      scrollEnabled={false}
      style={{ width: '100%' }}
    >
      <View style={styles.container}>
        <View style={styles.profile_header}>
          {item?.user?.photo ? (
            <Avatar
              onPress={() => {
                if (profileInfo?._id?.$oid != item?.user?._id?.$oid)
                  navigation.navigate('UserProfile', { userId: item?.user?._id?.$oid })
              }}
              height={44}
              width={44}
              url={API_URL + `/` + item?.user?.photo}
            />
          ) : (
            <MaterialIcons name="account-circle" size={44} color="#e1e1e1"
              onPress={() => {
                if (profileInfo?._id?.$oid != item?.user?._id?.$oid)
                  navigation.navigate('UserProfile', { userId: item?.user?._id?.$oid })
              }}
            />
          )}

          <View style={styles.header}>
            <View style={styles.profile_name}>
              <TouchableOpacity>
                <Text>@{item?.user?.username}</Text>
              </TouchableOpacity>
              <Text style={styles.sub_name}>
                {msToTime(UTCseconds - item?.created_at?.$date)}
              </Text>
            </View>
            <View style={{ paddingLeft: 10, marginVertical: 6 }}>
              {item?.is_bullish && (
                <Text
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderWidth: 1,
                    borderColor: '#34CB8B',
                    borderRadius: 4,
                    backgroundColor: '#34CB8B32',
                    color: '#34CB8B',
                    fontSize: 10,
                  }}>
                  Bullish
                </Text>
              )}
              {item?.is_bearish && (
                <Text
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderWidth: 1,
                    borderColor: '#FD6B74',
                    borderRadius: 4,
                    backgroundColor: '#FD6B7432',
                    color: '#FD6B74',
                    fontSize: 10,
                  }}>
                  Bearish
                </Text>
              )}
            </View>
            {/* <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 8,
                alignSelf: 'center',
                borderRadius: 5,
                borderWidth: item?.bearish ? 0 : 1,
                borderColor: '#FD6B74',
                backgroundColor: item?.bearish ? '#FD6B74' : '#FD6B7432',
              }}>
              <Text style={{ color: item?.bearish ? '#fff' : '#FD6B74' }}>
                Bearish
              </Text>
            </View> */}
          </View>
        </View>
        <View style={styles.des}>
          <ParsedText
            style={styles.text}
            parse={
              [
                { pattern: /\$(\w+)/, style: styles.hashTag, onPress: handleNamePress },
                { pattern: /\@(\w+)/, style: styles.hashTag, onPress: handleUsernamePress },
              ]
            }
            childrenProps={{ allowFontScaling: false }}
          >
            {item?.body}
          </ParsedText>
        </View>

        {/* image  */}

        {item?.image && (
          <View style={{ marginTop: 10, width: '100%', justifyContent: 'center', marginHorizontal: 10, borderRadius: 5, }}>
            <ImageModal
              // onPress={() => {
              //   navigation.navigate('')
              // }}
              style={{ height: heightImage, width: width - 40, borderRadius: 10 }}
              modalImageStyle={{ borderRadius: 10 }}
              resizeMode="contain"
              modalImageResizeMode="contain"
              imageBackgroundColor="#fff"
              source={{
                uri: API_URL + `/` + item?.image,
              }}
            />
          </View>
        )}

        <View style={styles.card_bottom}>
          {liked ? (
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={async () => {
                setLiked(!liked);
                setLocalLiked(localLiked - 1);
                if (isRoom) {
                  console.log("YES")
                  const response = await dispatch(
                    likeRoomPostThunk(item?._id?.$oid, profileInfo?._id?.$oid),
                  );
                  dispatch(getRoomPostsThunk(roomid))
                } else {
                  console.log("No")
                  const response = await dispatch(
                    likePostThunk(item?._id?.$oid, profileInfo?._id?.$oid),
                  );
                  dispatch(getMyPostsThunk(profileInfo?._id?.$oid));
                }

              }}>
              <MaterialIcons
                name="favorite"
                size={18}
                style={{ paddingRight: 6, color: '#f00' }}
              />
              <Text
                style={{ color: '#00000080', fontSize: 12, fontFamily: 'inter' }}>
                {localLiked}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={async () => {
                setLiked(!liked);
                setLocalLiked(localLiked + 1);
                if (isRoom) {
                  console.log("YES")
                  const response = await dispatch(
                    likeRoomPostThunk(item?._id?.$oid, profileInfo?._id?.$oid),
                  );
                  dispatch(getRoomPostsThunk(roomid))

                } else {
                  console.log("No")
                  const response = await dispatch(
                    likePostThunk(item?._id?.$oid, profileInfo?._id?.$oid),
                  );
                  dispatch(getMyPostsThunk(profileInfo?._id?.$oid));
                }
                dispatch(getMyPostsThunk(profileInfo?._id?.$oid));
              }}>
              <MaterialIcons
                color={'#fff'}
                // color={isPostLiked.$oid === profileInfo?._id?.$oid? 'red' : "#000"}
                name="favorite-border"
                size={18}
                style={{ paddingRight: 6, color: '#00000080' }}
              />
              <Text
                style={{ color: '#00000080', fontSize: 12, fontFamily: 'inter' }}>
                {localLiked}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('postScreen', props);
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              color="#000"
              name="comment-outline"
              size={18}
              style={{ paddingRight: 6, color: '#00000080' }}
            />
            <Text
              style={{ color: '#00000080', fontSize: 12, fontFamily: 'inter' }}>
              {item?.comments_count}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialIcons
              color="#000"
              name="share"
              size={18}
              style={{ paddingRight: 6, color: '#00000080' }}
            />
            <Text
              style={{ color: '#00000080', fontSize: 12, fontFamily: 'inter' }}>
              Share
            </Text>
          </View>
        </View>
        <View style={{ position: 'absolute', right: 1, top: 20 }}>
        </View>
      </View>
    </ScrollView>
  );
};
export default PostRoute;

const styles = StyleSheet.create({

  hashTag: {
    color: '#5B72FF',
  },

  container: {
    width: '100%',
    marginBottom: 8,
    height: '100%',
    borderBottomColor: '#4955BB40',
    borderBottomWidth: 0.5,
  },

  profile_header: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 4,
  },
  profile_name: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    paddingBottom: 2,
    fontFamily: 'Secular One',
  },
  sub_name: {
    fontSize: 12,
    color: '#737373',
  },
  des: {
    marginTop: 10,
    marginHorizontal: 15,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  tab_header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderRadius: 10,
    borderColor: '#4955BB',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  card_bottom: {
    marginHorizontal: 20,
    marginTop: 14,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
