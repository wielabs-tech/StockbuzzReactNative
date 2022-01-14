import React, { useEffect } from "react";
import { Button, Image } from "react-native";
import { View } from "react-native";
import { FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FillButton from "../components/fillButton";
import { TouchableOpacity } from "react-native";
import {
  followUserThunk,
  getMyFollowersThunk,
  getMyFollowingThunk,
} from "../redux/profile/profile.actions";
import { API_URL } from "../utils/config";
import { useNavigation } from "@react-navigation/core";
import FastImage from "react-native-fast-image";
import UserProfile from "./UserProfile";
import { UserFollowItem } from "../components/UserFollowItem";

const FollowersRoute = ({ route }) => {
  const profile = useSelector((state) => state.profile.profileInfo);
  const followers = useSelector((state) => state.profile.followers);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("FOLLOWERS", profile.followers_list)
  }, [])
  console.log("FOLLOW", profile?._id?.$oid);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const isMe = profile?._id?.$oid === item?._id?.$oid;
    console.log("ISME", isMe);
    const isFollowing = profile?.following?.find(
      (element) => element?.$oid == item?._id?.$oid
    );
    return (
      <TouchableOpacity
        onPress={() => {
          if (!isMe)
            navigation.push("UserProfile", {
              userId: item?._id?.$oid,
              full_name: item?.full_name,
              username: item?.username,
              photo: item?.photo,
            });
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {item?.photo ? (
              <View>
                <FastImage
                  style={{
                    height: 56,
                    width: 56,
                    backgroundColor: "#000",
                    borderRadius: 50,
                  }}
                  source={{
                    uri: API_URL + `/` + item?.photo,
                  }}
                />
              </View>
            ) : (
              <View>
                <MaterialIcons name="account-circle" size={56} />
              </View>
            )}
            <Text style={{ marginLeft: 10 }}>@{item?.username}</Text>
          </View>
          {!isFollowing
            ? !isMe && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      followUserThunk(profile?._id?.$oid, item?._id?.$oid)
                    );
                  }}
                  style={{
                    backgroundColor: "#5B72FF",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Follow</Text>
                </TouchableOpacity>
              )
            : !isMe && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      followUserThunk(profile?._id?.$oid, item?._id?.$oid)
                    );
                  }}
                  style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#5B72FF",
                  }}
                >
                  <Text style={{ color: "#5B72FF" }}>Unfollow</Text>
                </TouchableOpacity>
              )}
        </View>
        <View style={{ height: 0.7, backgroundColor: "#eee" }}></View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={profile?.followers_list}
      keyExtractor={(item) => item?._id?.$oid}
      renderItem={({ item }) => <UserFollowItem item={item} />}
    />
  );
};

export default FollowersRoute;
