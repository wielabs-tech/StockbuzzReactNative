import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { profileAPI } from "../api/ajax";
import { getMyPostsThunk } from "../redux/profile/profile.actions";
import PostRoute from "./PostRoute";
import * as Animatable from "react-native-animatable";

export const MyPostsRoute = () => {
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const profileInfo = useSelector((state) => state.profile.profileInfo);
  const myPosts = useSelector((state) => state.profile.myPosts);

  useEffect(() => {
    dispatch(getMyPostsThunk(profileInfo?._id?.$oid));
  }, []);

  useEffect(() => {
    console.log("MU", myPosts);
  }, [myPosts]);

  async function refresh() {
    setIsRefreshing(true);
    await dispatch(getMyPostsThunk(profileInfo?._id?.$oid));
    setIsRefreshing(false);
  }

  return (
    <FlatList
      style={{ flex: 1, height: "100%" }}
      refreshing={isRefreshing}
      onRefresh={() => {
        console.log("REFRESHING");
        refresh();
      }}
      nestedScrollEnabled
      data={myPosts}
      renderItem={({ item, index }) => {
        return (
          // <Animatable.View
          //   animation={'fadeInUp'}
          //   useNativeDriver
          // >
          <PostRoute item={item} />
          /* </Animatable.View> */
        );
      }}
      keyExtractor={(item) => item?._id?.$oid}
    />
  );
};
