import React, { useEffect, useState } from "react";
import { Button, Image } from "react-native";
import { View } from "react-native";
import { FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FillButton from "../components/fillButton";
import { TouchableOpacity } from "react-native";
import {
  followUserThunk,
  getMyFollowingThunk,
} from "../redux/profile/profile.actions";
import { API_URL } from "../utils/config";
import { useNavigation } from "@react-navigation/core";
import FastImage from "react-native-fast-image";
import { getUserDetailsById } from "../redux/user/user.actions";

export const UserFollowItem = ({ item }) => {
  const profile = useSelector((state) => state.profile.profileInfo);
  const followingList = useSelector((state) => state.profile.following);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isMe, setIsMe] = useState(profile?._id?.$oid === item?._id?.$oid);
  const [isFollowing, setIsFollowing] = useState(followingList?.find(
    (element) => element?._id?.$oid == item?._id?.$oid
  ));

  // useEffect(() => {
  //   const isFollowing = followingList?.find(
  //     (element) => element?._id?.$oid == item?._id?.$oid
  //   );
  //   setIsFollowing(isFollowing);
  // }, [profile, followingList]);

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
        navigation.navigate("");
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
            <TouchableOpacity>
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
            </TouchableOpacity>
          ) : (
            <MaterialIcons name="account-circle" size={56} />
          )}
          <Text style={{ marginLeft: 10 }}>@{item?.username}</Text>
        </View>
        {!isFollowing
          ? !isMe && (
              <TouchableOpacity
                onPress={() => {
                  console.log("PRESSED");
                  dispatch(
                    followUserThunk(profile?._id?.$oid, item?._id?.$oid)
                  );
                  setIsFollowing(!isFollowing)
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
                  console.log("PRESSED");
                  dispatch(
                    followUserThunk(profile?._id?.$oid, item?._id?.$oid)
                  );
                  setIsFollowing(!isFollowing)
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
