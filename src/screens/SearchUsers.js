import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const SearchUsers = () => {
  const navigation = useNavigation();

  const suggestions = useSelector((state) => state.stocks.suggestions);
  const profile = useSelector((state) => state.profile.profileInfo);


  const renderItemUsers = ({ item }) => {
    if (profile?._id?.$oid != item?._id?.$oid)
      return (
        <TouchableOpacity
          style={{ marginLeft: 10, marginRight: 10 }}
          onPress={() => {
            navigation.navigate("UserProfile", {
              userId: item?._id?.$oid,
              full_name: item?.full_name,
              username: item?.username,
              photo: item?.photo,
            });
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={{ marginTop: 10, marginBottom: 5, marginLeft: 10 }}>
                {item?._source?.fullName || item?.full_name}
              </Text>
              <Text style={{ marginBottom: 10, marginLeft: 10, fontSize: 10 }}>
                @{item?.username}
              </Text>
            </View>
            {/* <Text>{item?.}</Text> */}
          </View>
        </TouchableOpacity>
      );
  };

  return (
    <ScrollView>
      <FlatList
        keyboardShouldPersistTaps={"always"}
        data={suggestions?.users}
        scrollEnabled={true}
        style={{height: '100%'}}
        renderItem={renderItemUsers}
        keyExtractor={(item) => item?._id.$oid}
      />
    </ScrollView>
  );
};

export default SearchUsers;
