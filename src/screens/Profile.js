import React, { useEffect, useRef } from "react";
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
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Avatar from "../components/Avatar";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PostRoute from "./PostRoute";
import { logout } from "../redux/auth/auth.actions";
import { MyPostsRoute } from "./MyPostsRoute";
import Watchers from "./Watchers";
import { API_URL } from "../utils/config";
import { FlatList } from "react-native";
import FollowingRoute from "./MyFollowingRoute";
import FollowersRoute from "./MyFollowers";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyFollowersThunk,
  getMyFollowingThunk,
  getProfileInfoThunk,
} from "../redux/profile/profile.actions";
import ImageModal from "react-native-image-modal";
import { getUserDetailsById } from "../redux/user/user.actions";

const WatchingRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#fff" }} />
);

const renderTabBar = (props) => (
  <TabBar
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
export default ProfileScreen = ({ navigation }) => {
  const profile = useSelector((state) => state.profile.profileInfo);

  console.log("PROFILE", profile);
  const layout = useWindowDimensions();
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.title}>Profile</Text>,
      headerRight: () => (
        <View style={styles.setting}>
          <Icon
            onPress={() => {
              navigation.navigate("settings");
            }}
            color="#737373"
            fontWeight={100}
            name="settings"
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

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    { key: "post", title: "Post" },
    { key: "watchlist", title: "Watchlist" },
    { key: "followers", title: "Followers", id: profile?._id?.$oid },
    { key: "following", title: "Following", id: profile?._id?.$oid },
  ]);

  useEffect(() => {
    // dispatch(getMyFollowersThunk(profile?._id?.$oid))
    // dispatch(getMyFollowingThunk(profile?._id?.$oid))
    dispatch(getProfileInfoThunk(profile?._id?.$oid));
    dispatch(getMyFollowingThunk(profile?._id?.$oid));
  }, []);

  const modalRef = useRef();

  const renderScene = SceneMap({
    post: MyPostsRoute,
    watchlist: Watchers,
    followers: FollowersRoute,
    following: FollowingRoute,
  });
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.profile_header}>
          {/* avatar */}
          {profile?.photo ? (
            <ImageModal
              modalRef={modalRef}
              overlayBackgroundColor="#000"
              renderHeader={() => {
                return (
                  <SafeAreaView>
                    <View style={{ height: 56, padding: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          modalRef.current.close();
                        }}
                      >
                        <MaterialIcons
                          name="arrow-back"
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                );
              }}
              style={{ height: 56, width: 56, borderRadius: 50 }}
              source={{
                uri: API_URL + `/` + profile?.photo,
              }}
              modalImageStyle={{ height: 56, width: 56, borderRadius: 50 }}
              modalImageResizeMode={"contain"}
            />
          ) : (
            <MaterialIcons name="account-circle" size={56} color="#e1e1e1" />
          )}
          <View style={styles.header}>
            <View style={styles.profile_name}>
              <Text style={styles.name}>{profile?.full_name}</Text>
              <Text style={styles.sub_name}>@{profile?.username}</Text>
            </View>
            <View style={{ paddingLeft: "40%" }}>
              {/* <Text
                onPress={() => { navigation.navigate("Rooms") }}
                style={{ paddingVertical: 5, borderRadius: 5, paddingHorizontal: 10, color: "#fff", backgroundColor: "#4955BB", fontFamily: 'inter', fontWeight: "500" }}>Follow</Text> */}
            </View>
          </View>
        </View>
        <View style={styles.des}>
          <Text style={{ marginBottom: 4 }}>Bio</Text>
          <Text style={{ color: "#00000080" }}>{profile?.bio}</Text>
        </View>

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
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 18,
    alignItems: "center",
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
    marginTop: 10,
    marginHorizontal: 18,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    fontFamily: "Inter",
    fontStyle: "normal",
    color: "#00000080",
  },
  header: {
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
