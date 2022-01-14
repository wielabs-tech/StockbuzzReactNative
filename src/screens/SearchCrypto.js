import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const SearchCrypto = () => {
  const navigation = useNavigation();
  const cryptos = useSelector((state) => state.stocks.cryptoSuggestions);

  const renderItemUsers = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ marginLeft: 10, marginRight: 10 }}
        onPress={() => {
          navigation.navigate("cryptoScreen", { item: item });
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ marginTop: 10, marginBottom: 5, marginLeft: 10 }}>
              {item?.name}
            </Text>
            <Text style={{ marginBottom: 10, marginLeft: 10, fontSize: 10 }}>
              ${item?.symbol}
            </Text>
          </View>
          {/* <Text>{item?.}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyboardDismissMode="none"
      keyboardShouldPersistTaps={"always"}
      data={cryptos}
      renderItem={renderItemUsers}
      keyExtractor={(item) => item?.id}
    />
  );
};

export default SearchCrypto;
