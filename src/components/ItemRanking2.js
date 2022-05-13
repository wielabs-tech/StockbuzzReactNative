import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { stocksAPI } from "../api/ajax";
import { ActivityIndicator } from "react-native-paper";
import a, { findBySymbol } from "../utils/coins";

export const Item = ({ item }) => {
  const ran_colors = [
    "#abfd16",
    "#19dd82",
    "#8baf59",
    "#c6dcff",
    "#d3b1a7",
    "#13a3d3",
    "#a7cddd",
    "#cae4b1",
    "#2578cb",
    "#308deb",
    "#1cf8aa",
  ];
  const navigation = useNavigation();

  const [details, setDetails] = useState();

  useEffect(async () => {
    if(!findBySymbol(item)){
      const res = await stocksAPI.getStockInfo(item);
      setDetails(res.data);
    } else {
      const res2 = await stocksAPI.getCryptoInfo(findBySymbol(item));
      await setDetails(res2.data[0]);
      console.log("RES", res2.data[0])
    }
  }, []);

 

  const roundOff = (number, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
  };

  if(findBySymbol(item)){
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.push("cryptoScreen", {
            item: {
              symbol: item,
              ...details,
            },
          })
        }
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: ran_colors[item.length],
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24, color: "#fff" }}>{item[0]}</Text>
            </View>
            <View style={{ marginLeft: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "inter",
                  lineHeight: 17,
                  marginBottom: 2,
                }}
              >
                ${item}
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "inter" }}>
                {details?.name > 40
                  ? details?.name.substring(0, 40 - 3) + "..."
                  : details?.name}
              </Text>
            </View>
          </View>
          {details?.current_price? (
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "inter",
                  lineHeight: 17,
                  marginBottom: 2,
                  alignSelf: "flex-end",
                }}
              >
                ${roundOff(details?.current_price, 6)}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "inter",
                  color: details?.price_change_24h > 0 ? "green" : "red",
                }}
              >
                {roundOff(details?.price_change_24h, 2)}(
                {roundOff(details?.price_change_percentage_24h, 2)}%)
              </Text>
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.push("stockScreen", {
            item: {
              symbol: item,
              ...details,
            },
          })
        }
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: ran_colors[item.length],
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24, color: "#fff" }}>{item[0]}</Text>
            </View>
            <View style={{ marginLeft: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "inter",
                  lineHeight: 17,
                  marginBottom: 2,
                }}
              >
                ${item}
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "inter" }}>
                {details?.info?.companyName?.length > 40
                  ? details?.info?.companyName?.substring(0, 40 - 3) + "..."
                  : details?.info?.companyName}
              </Text>
            </View>
          </View>
          {details?.priceInfo?.lastPrice ? (
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "inter",
                  lineHeight: 17,
                  marginBottom: 2,
                  alignSelf: "flex-end",
                }}
              >
                ₹{roundOff(details?.priceInfo?.lastPrice, 2)}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "inter",
                  color: details?.priceInfo?.change > 0 ? "green" : "red",
                }}
              >
                {roundOff(details?.priceInfo?.change, 2)}(
                {roundOff(details?.priceInfo?.pChange, 2)}%)
              </Text>
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </TouchableOpacity>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomColor: "#4955BB40",
    borderBottomWidth: 0.2,
  },
  title: {
    fontSize: 10,
  },
});
