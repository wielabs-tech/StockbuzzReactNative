import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
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
  TextInput,
  Dimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getDiscoverRoomsThunk } from "../redux/rooms/rooms.actions";
import { API_URL } from "../utils/config";
import Avatar from "./Avatar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FastImage from "react-native-fast-image";
var dateFormat = require("dateformat");

const Item = ({ item }) => {
  const { height, width } = Dimensions.get("window");
  var date = new Date(item?.created_at?.$date).toDateString();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("groupPage", item);
      }}
      style={{ padding: 5, width: width / 2 }}
    >
      <View style={styles.item}>
        <View style={styles.header}>
          {item?.image ? (
            <View>
              <Avatar
                url={API_URL + `/` + item?.image}
                height={30}
                width={30}
              />
            </View>
          ) : (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 64,
                backgroundColor: "#aaa",
                justifyContent: "center",
              }}
            >
              <MaterialIcons
                name="group"
                size={16}
                color="#fff"
                style={{ alignSelf: "center" }}
              />
            </View>
          )}
          <View style={{ marginLeft: 4 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#4955BB",
                fontFamily: "SecularOne-Regular",
                marginBottom: -4
              }}
            >
              {item?.title}
            </Text>
            <Text style={{ fontSize: 8, color: "#18181880" }}>
              since {dateFormat(date, "dd/mm/yy")}
            </Text>
          </View>
        </View>
        <Text style={{ color: "#666", fontSize: 12, marginTop: 10 }}>
          {item?.description}
        </Text>
        <View style={styles.bottom}>
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 5,
              alignContent: "center",
            }}
          >
            <Text style={{ color: "#4955BB" }}>
              {item?.participants.length}
            </Text>
            <Text style={{ color: "#00000080", fontSize: 8, marginTop: 4 }}>
              {" "}
              people
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function Discover() {
  const profile = useSelector((state) => state.profile.profileInfo);
  const discoverRooms = useSelector((state) => state.rooms.discoverRooms);
  const myRooms = useSelector((state) => state.rooms.myRooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscoverRoomsThunk(profile?._id?.$oid));
    // dispatch(getMyRoomsThunk(profile?._id?.$oid))
  }, []);

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  function comparer(otherArray) {
    return function (current) {
      return (
        otherArray?.filter(function (other) {
          return (
            JSON.stringify(other?._id?.$oid) ==
            JSON.stringify(current._id?.$oid)
          );
        }).length == 0
      );
    };
  }

  const notJoined = discoverRooms.filter(comparer(myRooms));
  // const isParticipant = myRooms?.find(element => element?._id?.$oid != discoverRooms._id?.$oid)

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <FlatList
        data={notJoined}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item?._id?.$oid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bottom: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
  },
  item: {
    borderRadius: 10,
    borderColor: "#4955BB80",
    borderWidth: 2,
    padding: 10,
  },
});

export default Discover;
