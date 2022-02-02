import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingStocksThunk } from "../redux/stocks/stocks.actions";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BuzzingItem } from "./BuzzingItem";

function ItemHome({}) {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const trendingStocks = useSelector((state) => state.stocks.topTrendingStocks);

  let gainers = trendingStocks?.data?.gainers;
  let losers = trendingStocks?.data?.losers;
  const s = gainers ? gainers.concat(losers) : null;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrendingStocksThunk());
  }, []);

  async function refresh() {
    setIsRefreshing(true);
    await dispatch(getTrendingStocksThunk());
    setIsRefreshing(false);
  }

  function compare( a, b ) {
    if ( a.ranking < b.ranking ){
      return 1;
    }
    if ( a.ranking > b.ranking ){
      return -1;
    }
    return 0;
  }

  return (
    <FlatList
      nestedScrollEnabled={true}
      refreshing={isRefreshing}
      onRefresh={() => {
        refresh();
      }}
      numColumns={2}
      data={trendingStocks.stocks?.filter(element => element?.activeSeries).sort(compare)}
      keyExtractor={(item) => item.identifier}
      renderItem={({ item }) => {
        return <BuzzingItem item={item} />;
      }}
    />
  );
}
export default ItemHome;

const styles = StyleSheet.create({
  box: {
    height: 125,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 12,
    elevation: 2,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
