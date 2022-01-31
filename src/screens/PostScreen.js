import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Input } from "react-native-elements/dist/input/Input";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { postsAPI } from "../api/ajax";
import CustomInput from "../components/custominput";
import { getCommentsThunk } from "../redux/posts/posts.actions";
import { API_URL } from "../utils/config";
import PostRoute from "./PostRoute";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FastImage from "react-native-fast-image";

const PostScreen = ({ navigation, route }) => {
  console.log("PARAMS", route?.params?.item);
  const comments = useSelector((state) => state.posts.comments);
  console.log("COMMENTS", comments);
  const profileInfo = useSelector((state) => state.profile.profileInfo);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsThunk(route?.params?.item?._id?.$oid));
    navigation.setOptions({
      headerLeft: () => (
        <MaterialIcons
          name="arrow-back"
          style={{ marginLeft: 10 }}
          size={24}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, []);

  const renderItem = ({ item }) => {
    const d = new Date();
    let secondsUTC = d.getUTCSeconds();
    // var UTCseconds = x.getTime() + 330 * 60 * 1000;

    function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      var days = Math.floor(duration / (1000 * 60 * 60) / 24);

      if (days > 0) {
        if (days === 1) return "1 day ago";
        else return days + " days ago";
      } else if (hours > 0) {
        if (hours === 1) return "1 hour ago";
        else return hours + " hours ago";
      } else if (minutes > 0) {
        if (minutes === 1) return "1 minute ago";
        else return minutes + " minutes ago";
      } else {
        if (seconds === 1) return "1 second ago";
        else return seconds + " seconds ago";
      }
    }

    console.log(API_URL + JSON.stringify(item));
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: 10,
          borderBottomColor: "#aaa",
          borderBottomWidth: 0.2,
        }}
      >
        <Text
          style={{
            position: "absolute",
            right: 0,
            fontSize: 10,
            color: "#888",
            top: 10,
            right: 10,
          }}
        >
          {msToTime(secondsUTC * 1000 - item?.created_at?.$date)}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {item?.user?.photo ? (
            <FastImage
              style={{ height: 36, width: 36, borderRadius: 56 }}
              source={{
                uri: API_URL + `/` + item?.user?.photo,
              }}
            />
          ) : (
            <View>
              <MaterialIcons name="account-circle" size={36} color="#aaa" />
            </View>
          )}

          <View style={{ marginLeft: 5 }}>
            <Text style={{ fontSize: 14 }}>{item?.user?.full_name}</Text>
          </View>
        </View>
        <View>
          <Text style={{ marginTop: 10 }}>{item?.body}</Text>
        </View>
        {/* <View style={{marginTop: 10, flexDirection: 'row'}}>
                    <MaterialIcons name='favorite' size={16} color='red'/>
                    <Text style={{marginLeft: 4}}>56</Text>
                </View> */}
      </View>
    );
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 2,
      }}
    >
      <ScrollView style={{ height: "100%" }}>
        <View>
          <PostRoute
            style={{ backgroundColor: "#aaa" }}
            item={route?.params?.item}
          />
        </View>
        <FlatList
          style={{ marginBottom: 60 }}
          data={comments}
          keyExtractor={(item) => item?._id?.$oid}
          renderItem={renderItem}
        />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          height: 60,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ height: 0.5, backgroundColor: "#aaa" }}></View>
        <View style={{ width: "100%" }}>
          <Input
            style={{ fontSize: 14, color: "#000" }}
            inputContainerStyle={{ borderColor: "#fff" }}
            placeholder="Type your comment..."
            value={comment}
            placeholderTextColor={"#aaa"}
            onChangeText={setComment}
            labelName="Type your comment..."
            isPassword={false}
            rightIcon={
              <MaterialIcons
                onPress={async () => {
                  const res = await postsAPI.writeComment(
                    profileInfo?._id?.$oid,
                    comment,
                    route?.params?.item?._id?.$oid
                  );
                  dispatch(getCommentsThunk(route?.params?.item?._id?.$oid));
                  console.log("RES", res);
                  setComment("");
                }}
                name="arrow-forward"
                size={24}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default PostScreen;
