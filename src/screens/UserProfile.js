import React, { useEffect, useState } from "react";
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
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Avatar from "../components/Avatar";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PostRoute from "./PostRoute";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/auth.actions";
import { MyPostsRoute } from "./MyPostsRoute";
import Watchers from "./Watchers";
import { API_URL } from "../utils/config";
import { UserPostsRoute } from "./UserPostsRoute";
import {
  followUserThunk,
  getMyFollowersThunk,
  getMyFollowingThunk,
  getProfileFollowersThunk,
  getProfileFollowingThunk,
} from "../redux/profile/profile.actions";
import FollowersRoute from "./FollowersRoute";
import FollowingRoute from "./FollowingRoute";
import { getUserDetailsById } from "../redux/user/user.actions";
import { GET_FOLLOWERS, GET_FOLLOWING } from "../redux/profile/profile.types";
import ImageModal from "react-native-image-modal";

// function isFollowing(likes) {
//   return likes.$oid === profileInfo?._id?.$oid;
// }

// const findLike = item?.likes.find(isLiked);
// const [liked, setLiked] = useState(findLike?.$oid === profileInfo?._id?.$oid);
// const [localLiked, setLocalLiked] = useState(item?.likes.length);

const renderTabBar = (props) => (
  <TabBar
    pressColor={"transparent"}
    {...props}
    style={{
      backgroundColor: "white",
      paddingTop: 4,
    }}
    tabStyle={{
      marginHorizontal: 8,
    }}
    contentContainerStyle={{
      justifyContent: "center",
    }}
    labelStyle={{
      marginHorizontal: -10,
      fontSize: 14,
      fontWeight: "500",
      textTransform: "capitalize",
      fontFamily: "inter",
    }}
    indicatorStyle={{
      borderRadius: 2,
      backgroundColor: "#4955BB",
      height: 4,
    }}
    activeColor={"#4955BB"}
    inactiveColor={"#00000080"}
  />
);
export default UserProfile = ({ navigation, route }) => {
  console.log("ROUTE", route);
  const { full_name, username, photo } = route.params;
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  const profile = useSelector((state) => state.user.user);
  const [followers, setFollowers] = useState();
  const profileInfo = useSelector((state) => state.profile.profileInfo);
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    setIsFollowing(
      profileInfo?.following?.find(
        (element) => element?.$oid == route.params.userId
      )
    );
  }, [profile]);

  useEffect(() => {
    loadUserDetails();
    // dispatch(getProfileFollowersThunk(route.params.userId))
    // dispatch(getProfileFollowingThunk(route.params.userId))
  }, []);

  const loadUserDetails = async () => {
    dispatch(getUserDetailsById(route.params.userId));
  };
  const [threads, setThreads] = useState();

  async function handleButtonPress(roomName) {
    const r = await firestore()
      .collection("MESSAGE_THREADS")
      .where("createdBy", "==", profileInfo?.username)
      .where("otherUser", "==", profile?.username);

    let data = [];
    const snapshot = await r.get();
    snapshot.forEach((doc) => {
      let d = doc.data();
      d._id = doc.id;
      data.push(d);
    });

    if (data.length != 0) {
      navigation.navigate("MessageRoom", { thread: data[0] });
    } else {
      const r2 = await firestore()
        .collection("MESSAGE_THREADS")
        .where("createdBy", "==", profile?.username)
        .where("otherUser", "==", profileInfo?.username);
      let data2 = [];
      const snapshot2 = await r2.get();
      snapshot2.forEach((doc) => {
        let d = doc.data();
        d._id = doc.id;
        data2.push(d);
      });

      if (data2.length == 0) {
        firestore()
          .collection("MESSAGE_THREADS")
          .add({
            name: roomName,
            latestMessage: {
              text: ``,
              createdAt: new Date().getTime(),
            },
            createdBy: profileInfo?.username,
            otherUser: profile?.username,
            createdByUID: profileInfo?._id?.$oid,
            otherUserUID: profile?._id?.$oid,
          })
          .then(async (m) => {
            const r = await firestore()
              .collection("MESSAGE_THREADS")
              .where("createdBy", "==", profileInfo?.username)
              .where("otherUser", "==", profile?.username);

            let data = [];
            const snapshot = await r.get();

            snapshot.forEach((doc) => {
              let d = doc.data();
              d._id = doc.id;
              navigation.navigate("MessageRoom", { thread: d });
            });
          });
      } else {
        navigation.navigate("MessageRoom", { thread: data2[0] });
      }
    }

    // const r2 = await firestore()
    //   .collection('MESSAGE_THREADS')
    //   .where('createdBy', '==', profile?.username)
    //   .where('otherUser', '==', profileInfo?.username)

    // let data2 = []
    // const snapshot2 = await r2.get();
    // snapshot2.forEach(doc => {
    //   let d = doc.data();
    //   d._id = doc.id
    //   data2.push(d);
    // });

    // console.log("DATALENGTH2", JSON.stringify(data2));
    // if (data2.length == 0) {
    //   firestore()
    //     .collection('MESSAGE_THREADS')
    //     .add({
    //       name: roomName,
    //       latestMessage: {
    //         text: ``,
    //         createdAt: new Date().getTime(),
    //       },
    //       createdBy: profileInfo?.username,
    //       otherUser: profile?.username,
    //       createdByUID: profileInfo?._id?.$oid,
    //       otherUserUID: profile?._id?.$oid
    //     })
    //     .then(async (m) => {
    //       console.log("CRETED MSG", m)
    //       const r = await firestore()
    //         .collection('MESSAGE_THREADS')
    //         .where('createdBy', '==', profileInfo?.username)
    //         .where('otherUser', '==', profile?.username)

    //       let data = []
    //       const snapshot = await r.get();

    //       snapshot.forEach(doc => {
    //         let d = doc.data();
    //         d._id = doc.id
    //         console.log(d)
    //         navigation.navigate('MessageRoom', { thread: d })
    //       });
    //     })
    // } else {
    //   console.log(data2[0]);
    //   navigation.navigate('MessageRoom', { thread: data2[0] })
    // }

    // if (roomName.length > 0) {
    //   await firestore()
    //     .collection('MESSAGE_THREADS')
    //     .orderBy('latestMessage.createdAt', 'desc')
    //     .get(querySnapshot => {
    //       const threads = querySnapshot.docs.map(e => {
    //         // if(documentSnapshot._data.createdBy === profile?.username || documentSnapshot._data.otherUser === profile?.username){
    //         return {
    //           _id: e.id,
    //           name: '',
    //           latestMessage: { text: '' },
    //           createdBy: '',
    //           otherUser: '',
    //           ...e.data()
    //         }
    //       })
    //       let filtered = threads
    //         ?.filter(e => {
    //           return (e?.createdBy === profile?.username || e?.otherUser === profile?.username)
    //         })//filter to only keep elements from the same state
    //         .map(e => {
    //           const {
    //             _id,
    //             name,
    //             latestMessage,
    //             createdBy,
    //             otherUser,
    //           } = e;
    //           return {
    //             _id,
    //             name,
    //             latestMessage,
    //             createdBy,
    //             otherUser,
    //           };
    //         });
    //         console.log("FILTERED", filtered)
    //       if (filtered.length < 1) {
    //         firestore()
    //           .collection('MESSAGE_THREADS')
    //           .add({
    //             name: roomName,
    //             latestMessage: {
    //               text: ``,
    //               createdAt: new Date().getTime(),
    //             },
    //             createdBy: profileInfo?.username,
    //             otherUser: profile?.username
    //           })
    //           .then((m) => {
    //             console.log("CRETED MSG", m)
    //             // navigation.navigate('MessageRoom')
    //           })
    //           filtered = [];
    //       } else {
    //         const fil = filtered.filter(e => (e.createdBy === profileInfo?.username && e.otherUser === profile?.username) || (e.createdBy === profile?.username && e.otherUser === profileInfo?.username))
    //         navigation.navigate("MessageRoom", { thread: fil[0] })
    //       }
    //     })
    // }
  }

  // {"_id": "VhAakW5DtTHwmCcvAm2H", "createdBy": "rohanp2223232323", "latestMessage": {"createdAt": 1631883678094, "text": "Ok bro"}, "name": "rohanp2223232323-Rohan22", "otherUser": "Rohan22"}
  // {"_id": "VhAakW5DtTHwmCcvAm2H", "createdBy": "rohanp2223232323", "latestMessage": {"createdAt": 1631883678094, "text": "Ok bro"}, "name": "rohanp2223232323-Rohan22", "otherUser": "Rohan22"}, {"_id": "621u7YngUpHuVVk16QxA", "createdBy": "Rohan22", "latestMessage": {"createdAt": 1631883639606, "text": "Ndj"}, "name": "Rohan22-rohan3", "otherUser": "rohan3"}]
  navigation.setOptions({
    headerLeft: () => (
      <MaterialIcons
        name={"arrow-back"}
        size={24}
        style={{ marginLeft: 10 }}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
    headerTitle: () => <Text style={styles.title}>Profile</Text>,
    headerRight: () => (
      <View style={styles.setting}>
        <MaterialIcons
          color="#737373"
          fontWeight={100}
          name="more-vert"
          size={24}
          style={{ paddingRight: 20 }}
          // onPress={() => {
          //   navigation.navigate("");
          // }}
        />
      </View>
    ),
  });
  const MyProfile = useSelector((state) => state.auth.profileInfo);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "post", title: "Post", profile: route.params.userId },
    { key: "watchlist", title: "Watchlist", id: route.params.userId },
    { key: "followers", title: "Followers", user: profile },
    { key: "following", title: "Following", user: profile },
  ]);

  const renderScene = SceneMap({
    post: UserPostsRoute,
    watchlist: Watchers,
    followers: FollowersRoute,
    following: FollowingRoute,
  });
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.profile_header}>
          {/* avatar */}
          {photo ? (
            <ImageModal
              style={{ height: 56, width: 56, borderRadius: 50 }}
              source={{
                uri: API_URL + `/` + photo,
              }}
              modalImageStyle={{ height: 56, width: 56, borderRadius: 50 }}
              modalImageResizeMode={"contain"}
            />
          ) : (
            <MaterialIcons name="account-circle" size={44} color="#e1e1e1" />
          )}
          <View style={styles.header}>
            <View style={styles.profile_name}>
              <Text style={styles.name}>{full_name}</Text>
              <Text style={styles.sub_name}>@{username}</Text>
            </View>
            {!isFollowing ? (
              <TouchableOpacity style={{ marginRight: 60 }}>
                <Text
                  onPress={async () => {
                    await dispatch(
                      followUserThunk(MyProfile?._id?.$oid, profile?._id?.$oid)
                    );
                  }}
                  style={{
                    paddingVertical: 5,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    color: "#4955BB",
                    fontFamily: "inter",
                    fontWeight: "500",
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#4955BB",
                  }}
                >
                  Follow
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <View
                  style={{
                    marginRight: 60,
                    backgroundColor: "#4955BB",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    onPress={async () => {
                      await dispatch(
                        followUserThunk(
                          MyProfile?._id?.$oid,
                          profile?._id?.$oid
                        )
                      );
                    }}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "#fff",
                      fontFamily: "inter",
                      fontWeight: "500",
                      borderRadius: 5,
                    }}
                  >
                    Following
                  </Text>
                </View>
                <TouchableOpacity style={{ marginRight: 60, marginTop: 10 }}>
                  <Text
                    onPress={() => {
                      handleButtonPress(
                        MyProfile?.username + "-" + profile?.username
                      );
                    }}
                    style={{
                      paddingVertical: 5,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      borderColor: "#4955BB",
                      color: "#4955bb",
                      borderWidth: 1,
                      fontFamily: "inter",
                      fontWeight: "500",
                    }}
                  >
                    Message
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.des}>
          {/* <Text style={{ color: '#00000080' }}>
            Digital Goodies Team - Web & Mobile UI/UX ,  Graphics;Illustrations
          </Text> */}
        </View>
        {/* user posts following followers watchlist */}

        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  profile_image: {
    height: 56,
    width: 56,
    borderRadius: 50,
  },
  profile_header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    margin: 18,
  },
  profile_name: {
    backgroundColor: "#fff",
    marginLeft: 10,
    justifyContent: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    paddingBottom: 2,
    fontFamily: "Secular One",
  },
  sub_name: {
    color: "#737373",
  },
  des: {
    marginHorizontal: 18,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    fontFamily: "Inter",
    fontStyle: "normal",
    color: "#00000080",
  },
  header: {
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  tab_header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    borderRadius: 10,
    borderColor: "#4955BB",
    borderWidth: 1,
    borderStyle: "solid",
  },

  title: {
    color: "#4955BB",
    fontFamily: "SecularOne-Regular",
    fontSize: 20,
    fontWeight: "400",
  },
  arrow: {
    alignSelf: "center",
  },
  arrowbutton: {
    color: "red",
  },
  setting: {
    display: "flex",
    flexDirection: "row",
  },
});
