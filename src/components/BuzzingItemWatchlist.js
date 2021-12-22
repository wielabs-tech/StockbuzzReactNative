import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import { stocksAPI } from "../api/ajax";

export const BuzzingItem = ({ item }) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const [details, setDetails] = useState();

  useEffect(async () => {
    const res = await stocksAPI.getStockInfo(item?.symbol);
    setDetails(res.data);
  }, []);

  return (
    <View style={{ width: width / 2, padding: 5 }}>
      <TouchableWithoutFeedback
        style={{ elevation: 2 }}
        onPress={() => {
          navigation.push("stockScreen", {
            item: {
                symbol: item?.symbol,
                ...details
            },
          });
        }}
      >
        <View style={styles.box}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>{item?.symbol}</Text>
              <Text style={{ fontSize: 8 }}></Text>
            </View>
            {details?.priceInfo?.change > 0 ? (
              <MaterialIcons name="north" color="green" size={20} />
            ) : (
              <MaterialIcons name="south" color="red" size={20} />
            )}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 12, alignSelf: "flex-end" }}>₹</Text>
              <Text style={{ fontSize: 12, alignSelf: "flex-end" }}>
                {roundOff(details?.priceInfo?.lastPrice, 2)}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              {details?.priceInfo?.change > 0 ? (
                <Text
                  style={{
                    fontSize: 10,
                    alignSelf: "flex-end",
                    color: "green",
                  }}
                >
                  +
                </Text>
              ) : (
                <></>
              )}
              <Text
                style={{
                  color: details?.priceInfo?.change > 0 ? "green" : "red",
                  fontSize: 10,
                  alignSelf: "flex-end",
                }}
              >
                {roundOff(details?.priceInfo?.change, 2)}({roundOff(details?.priceInfo?.pChange, 2)}%)
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const roundOff = (number, decimalPlaces) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
};

const styles = StyleSheet.create({
  box: {
    height: 125,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 12,
    elevation: 1,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});