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
  Platform,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Avatar from "../components/Avatar";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PostRoute from "./PostRoute";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/auth.actions";
import { MyPostsRoute } from "./MyPostsRoute";
import Watchers from "./Watchers";
import { API_URL } from "../utils/config";
import { FlatList } from "react-native";
import FollowingRoute from "./FollowingRoute";
import FollowersRoute from "./FollowersRoute";
import FillButton from "../components/fillButton";
import LinearGradient from "react-native-linear-gradient";
import {
  getRoomPostsThunk,
  joinGroupThunk,
} from "../redux/rooms/rooms.actions";
import FastImage from "react-native-fast-image";
import { ActivityIndicator } from "react-native-paper";
var dateFormat = require("dateformat");

export default GroupPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const myRooms = useSelector((state) => state.rooms.myRooms);
  console.log("MYROOMS", myRooms);

  const [isParticipant, setIsParticipant] = useState(
    myRooms?.find((element) => element?._id?.$oid == route.params._id?.$oid)
  );

  console.log("ISPARTICIPANT", isParticipant);

  const groupInfo = route?.params;

  useEffect(() => {
    navigation.setOptions(
      {
        headerTitle: () => <Text style={styles.title}>{groupInfo?.title}</Text>,
        headerRight: () => (
          <View style={styles.setting}>
            <Icon
              color="#737373"
              fontWeight={100}
              name="information-circle"
              size={24}
              style={{ paddingRight: 20 }}
            />
          </View>
        ),
        headerLeft: () => (
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
            size={24}
            style={{ marginLeft: 10 }}
          />
        ),
      },
      []
    );
  }, []);

  const profile = useSelector((state) => state.profile.profileInfo);
  var date = new Date(groupInfo?.created_at?.$date).toDateString();
  const dispatch = useDispatch();
  const roomPosts = useSelector((state) => state.rooms.roomsPosts);

  useEffect(() => {
    dispatch(getRoomPostsThunk(groupInfo?._id?.$oid));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <PostRoute roomId={groupInfo?._id?.$oid} isRoom={true} item={item} />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {groupInfo?.image ? (
              <FastImage
                style={{
                  height: 64,
                  width: 64,
                  backgroundColor: "#aaa",
                  borderRadius: 50,
                }}
                source={{
                  uri: API_URL + `/` + groupInfo?.image,
                }}
              />
            ) : (
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 64,
                  backgroundColor: "#aaa",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="group"
                  size={36}
                  color="#fff"
                  style={{ alignSelf: "center" }}
                />
              </View>
            )}
            <View style={{ alignSelf: "center", marginLeft: 5 }}>
              <Text style={{ fontFamily: "SecularOne-Regular", fontSize: 16 }}>
                {groupInfo?.title}
              </Text>
              <Text style={{ fontSize: 12 }}>
                since {dateFormat(date, "dS mmmm yyyy")}
              </Text>
            </View>
          </View>
          <View style={{ alignSelf: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
                marginRight: 10,
              }}
            >
              <View style={{ flexDirection: "row", paddingRight: 20 }}>
                <Text style={{ color: "#000", fontSize: 10 }}>
                  {groupInfo.participants.length}
                </Text>
                <Text
                  style={{
                    marginLeft: 2,
                    color: "#000",
                    fontSize: 8,
                    alignSelf: "flex-end",
                  }}
                >
                  People
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <FastImage
                style={{ height: 16, width: 16 }}
                source={require("../assets/user.png")}
              />
              <FastImage
                style={{ height: 16, width: 16, marginLeft: -8 }}
                source={require("../assets/user.png")}
              />
              <FastImage
                style={{ height: 16, width: 16, marginLeft: -8 }}
                source={require("../assets/user.png")}
              />
              <FastImage
                style={{ height: 16, width: 16, marginLeft: -8 }}
                source={require("../assets/user.png")}
              />
              <FastImage
                style={{ height: 16, width: 16, marginLeft: -8 }}
                source={require("../assets/user.png")}
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10, marginLeft: 15 }}>
          <Text>{groupInfo?.description}</Text>
        </View>
        {!isParticipant ? (
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={async () => {
                setIsLoading(true);
                await dispatch(
                  joinGroupThunk(groupInfo?._id?.$oid, profile?._id?.$oid)
                );
                setIsParticipant(!isParticipant);
                setIsLoading(false);
              }}
              style={{
                marginHorizontal: 20,
                alignContent: "center",
                justifyContent: "center",
                height: 50,
                backgroundColor: "#5B72FF",
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: "#fff", alignSelf: "center" }}>
                  Join group
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={async () => {
                setIsLoading(true);
                await dispatch(
                  joinGroupThunk(groupInfo?._id?.$oid, profile?._id?.$oid)
                );
                setIsParticipant(!isParticipant);
                setIsLoading(false);
              }}
              style={{
                marginHorizontal: 20,
                alignContent: "center",
                justifyContent: "center",
                height: 50,
                backgroundColor: "#fff",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#5B72FF",
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="#5B72FF" />
              ) : (
                <Text style={{ color: "#5B72FF", alignSelf: "center" }}>
                  Exit group
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <Text style={{ marginTop: 20, color: "#5b72ff", marginLeft: 10 }}>
          Posts
        </Text>
        <View
          style={{ height: 2, backgroundColor: "#aaa", marginTop: 10 }}
        ></View>
        <FlatList
          data={roomPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item?._id?.$oid}
        />
      </View>
      <TouchableOpacity
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 10,
          position: "absolute",
          bottom: 50,
          right: 20,
          height: 65,
          width: 65,
          backgroundColor: "#fff",
          borderRadius: 100,
          justifyContent: "center",
        }}
        onPress={() => {
          console.log("PRESSED");
          navigation.push("createPost", {
            groupPost: true,
            groupId: groupInfo?._id?.$oid,
          });
        }}
      >
        <LinearGradient
          colors={["#0063F5", "#4955BB"]}
          start={{ x: 1, y: 0 }}
          style={styles.fab}
          end={{ x: 0, y: 0 }}
          angle={267.35}
        >
          <View style={styles.fab}>
            <MaterialIcons
              style={{ alignSelf: "center" }}
              name="edit"
              size={24}
              color="#fff"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
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

  box: {
    paddingBottom: 10,
    overflow: "hidden",
    shadowColor: "#5B72FF",
    shadowOffset: { width: 6, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  fab: {
    justifyContent: "center",
    alignSelf: "center",
    height: 60,
    width: 60,
    borderRadius: 100,
  },
});
