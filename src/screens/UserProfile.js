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
  FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import { API_URL } from "../utils/config";
import { UserPostsRoute } from "./UserPostsRoute";
import { followUserThunk } from "../redux/profile/profile.actions";
// import FollowingRoute from "./FollowingRoute";
import ImageModal from "react-native-image-modal";
import { Item } from "../components/ItemWatchlistOtherUser";
import { UserFollowItem } from "../components/UserFollowItem";
import { profileAPI } from "../api/ajax";

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
  const userId = route?.params?.userId;
  const profile = useSelector((state) => state.user.user);
  const [followers, setFollowers] = useState();
  const [userInfo, setUserInfo] = useState();
  const profileInfo = useSelector((state) => state.profile.profileInfo);
  const followingList = useSelector((state) => state.profile.following);
  const [isFollowing, setIsFollowing] = useState(
    followingList?.find((element) => element?._id?.$oid == route.params.userId)
  );

  useEffect(async () => {
    const userData = await profileAPI.getProfileInfo(route.params.userId);
    setUserInfo(userData.data);
    // dispatch(getUserDetailsById(route.params.userId));
  }, []);

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
  }
  useEffect(() => {
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
  }, []);
  const MyProfile = useSelector((state) => state.auth.profileInfo);
  console.log("ROUTE", route.params);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "post", title: "Post", profile: route.params.userId },
    { key: "watchlist", title: "Watchlist", id: route.params.userId },
    { key: "followers", title: "Followers", user: profile },
    { key: "following", title: "Following", user: profile },
  ]);

  const Followers = () => {
    return (
      <FlatList
        data={userInfo?.followers_list}
        keyExtractor={(item) => item?._id?.$oid}
        renderItem={({ item }) => <UserFollowItem item={item} />}
      />
    );
  };

  const FollowingRoute = () => {
    return (
      <FlatList
        data={userInfo?.following_list}
        keyExtractor={(item) => item?._id?.$oid}
        renderItem={({ item }) => <UserFollowItem item={item} />}
      />
    );
  };

  const Watchers = ({ navigation, route }) => {
    const renderItem = ({ item }) => {
      return <Item item={item} />;
    };

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={userInfo?.watchlist}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </SafeAreaView>
    );
  };

  const renderScene = SceneMap({
    post: UserPostsRoute,
    watchlist: Watchers,
    followers: Followers,
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
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
              {!isFollowing ? (
                <TouchableOpacity
                  onPress={async () => {
                    console.log("CLICKED");
                    await dispatch(
                      followUserThunk(MyProfile?._id?.$oid, userId)
                    );
                    setIsFollowing(!isFollowing);
                  }}
                  style={{ marginRight: 60, alignSelf: "flex-end" }}
                >
                  <Text
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
                <TouchableOpacity
                  onPress={async () => {
                    console.log("USER");
                    await dispatch(
                      followUserThunk(MyProfile?._id?.$oid, route.params.userId)
                    );
                    setIsFollowing(!isFollowing);
                  }}
                  style={{
                    backgroundColor: "#4955BB",
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                >
                  <Text
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
                </TouchableOpacity>
              )}
              {isFollowing ? (
                <TouchableOpacity
                  onPress={() => {
                    handleButtonPress(
                      MyProfile?.username + "-" + profile?.username
                    );
                  }}
                  style={{
                    marginRight: 60,
                    marginTop: 10,
                    marginLeft: 10,
                    justifyContent: "center",
                  }}
                >
                  <Feather name="message-circle" size={24} color="#4955BB" />
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View style={styles.des}>
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "400" }}>
            Bio
          </Text>
          <Text style={{ color: "#00000080" }}>{profile?.bio?.trim()} </Text>
        </View>
        {/* user posts following followers watchlist */}

        <TabView
          animationEnabled={false}
          swipeEnabled={false}
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
    marginTop: 18,
    marginHorizontal: 18,
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
