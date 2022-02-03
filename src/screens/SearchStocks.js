import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const SearchStocks = () => {
  const suggestions = useSelector((state) => state.stocks.suggestions);
  const cryptos = useSelector((state) => state.stocks.stockSearch);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ marginLeft: 10, marginRight: 10 }}
        onPress={() => {
          console.log("ITEM1", item);
          if (item?.activeSeries) {
            navigation.navigate("stockScreen", {
              item: item,
              isCrypto: false,
            });
          } else {
            navigation.navigate("cryptoScreen", {
              item: {
                symbol: item.symbol,
                ...item,
              },
            });
          }
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ marginTop: 10, marginBottom: 5, marginLeft: 10 }}>
              {item?.symbol}
            </Text>
            <Text style={{ marginBottom: 10, marginLeft: 10, fontSize: 10 }}>
              {item?.symbol_info || item?.name}
            </Text>
          </View>
          {/* <Text>{item?.}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <ScrollView>
        <FlatList
          keyboardShouldPersistTaps={"always"}
          keyboardDismissMode="none"
          scrollEnabled={true}
          data={suggestions?.symbols}
          renderItem={renderItem}
          keyExtractor={(item) => item?.symbol}
        />
        {cryptos?.length > 0 ? (
          <FlatList
            keyboardShouldPersistTaps={"always"}
            keyboardDismissMode="none"
            scrollEnabled={true}
            data={cryptos}
            renderItem={renderItem}
            keyExtractor={(item) => item?.symbol}
          />
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchStocks;
