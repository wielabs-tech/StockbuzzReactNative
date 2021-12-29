import React, { useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import Avatar from "./Avatar";
import { API_URL } from "../utils/config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { joinGroupThunk } from "../redux/rooms/rooms.actions";
import { useDispatch, useSelector } from "react-redux";

export const GroupItem = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  isParticipant,
}) => {
  const navigation = useNavigation();
  const profile = useSelector((state) => state.profile.profileInfo);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("groupPage", item);
      }}
      style={{ height: 125 }}
    >
      <LinearGradient
        colors={isParticipant ? ["#fff", "#fff"] : ["#5B72FF", "#3d56f0"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={[
          styles.item,
          {
            borderWidth: isParticipant ? 1 : 0,
            borderColor: isParticipant ? "#3d56f0" : "#aaa",
            borderRadius: 10,
          },
        ]}
        angle={105.35}
      >
        <View style={styles.viewStyle}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {item?.image ? (
                <Avatar
                  height={44}
                  width={44}
                  url={API_URL + `/` + item?.image}
                />
              ) : isParticipant ? (
                <View
                  style={{
                    height: 44,
                    width: 44,
                    backgroundColor: "#aaa",
                    borderRadius: 44,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="group" size={24} color="#fff" />
                </View>
              ) : (
                <View
                  style={{
                    height: 44,
                    width: 44,
                    backgroundColor: "#fff",
                    borderRadius: 44,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="group" size={24} color="#aaa" />
                </View>
              )}
              <Text
                style={{
                  marginLeft: 4,
                  color: isParticipant ? "#4955BB" : "#fff",
                  marginRight: 40,
                  fontSize: 10,
                }}
              >
                {item?.title}
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: isParticipant ? "#000" : "#fff",
                    fontSize: 12,
                    alignSelf: "flex-end",
                  }}
                >
                  {item?.participants?.length}
                </Text>
                <Text
                  style={{
                    marginLeft: 2,
                    color: isParticipant ? "#000" : "#fff",
                    fontSize: 12,
                    alignSelf: "flex-end",
                  }}
                >
                  People
                </Text>
              </View>
            </View>
          </View>
        </View>
        {isParticipant ? (
          <Text
            style={{
              fontSize: 12,
              color: "#aaa",
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
          >
            Joined
          </Text>
        ) : (
          <></>
        )}
      </LinearGradient>
      {!isParticipant ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 20,
            backgroundColor: "#fff",
            borderRadius: 40,
            borderWidth: 2,
            borderColor: "#4955bb",
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              await dispatch(
                joinGroupThunk(item?._id?.$oid, profile?._id?.$oid)
              );
              navigation.navigate("groupPage", item);
            }}
            style={{
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="add" size={28} color="#4955bb" />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftIconContainerStyle: { marginLeft: 4, marginRight: 4 },
  item: {
    borderRadius: 10,
    height: 100,
    padding: 10,
    width: 125,
    marginVertical: 4,
    marginRight: 10,
  },
  title: {
    fontSize: 32,
  },

  box: {
    paddingBottom: 10,
    overflow: "hidden",
    shadowColor: "#5B72FF",
    shadowOffset: { width: 6, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  viewStyle: {
    height: "100%",
    justifyContent: "space-between",
  },
});
