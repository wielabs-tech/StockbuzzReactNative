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
import {
  getCryptoWatchlisthunk,
  getMyWatchlistDataThunk,
} from "../redux/stocks/stocks.actions";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BuzzingItem } from "./BuzzingItemWatchlist";
import { BuzzingItemCrypto } from "./BuzzingItemCrypto";

function WatchlistHome({}) {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const watchlistData = useSelector((state) => state.stocks.watchlistData);
  const data = watchlistData?.data;
  const profileInfo = useSelector((state) => state.profile.profileInfo);
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state.stocks.cryptos);
  const [coinsArray, setCoinsArray] = useState([]);
  const watchlistCrypto = useSelector((state) => state.stocks.cryptoWatchlist);

  // useEffect(async () => {
  //   dispatch(getMyWatchlistDataThunk(profileInfo?._id?.$oid));
  //   const cryptoWatchlist = data.filter((e) => !e?.activeSeries);
  //   await dispatch(getCryptoWatchlisthunk(cryptoWatchlist.join(",")));
  //   let array = [];
  //   for (var i = 0; i < cryptoWatchlist?.length; i++) {
  //     array.push(watchlistCrypto[cryptoWatchlist[i]]);
  //   }
  //   await setCoinsArray(array);
  // }, []);

  const [render, setRender] = useState(false);

  // useEffect(() => {
  //     setTimeout(() => {
  //         setRender(!render);
  //         dispatch(getMyWatchlistDataThunk(profileInfo._id.$oid))
  //     }, 10000);
  // }, [render]);

  async function refresh() {
    setIsRefreshing(true);
    // dispatch(getMyWatchlistDataThunk(profileInfo?._id?.$oid));
    // const cryptoWatchlist = data.filter((e) => !e?.activeSeries);
    // await dispatch(getCryptoWatchlisthunk(cryptoWatchlist.join(",")));
    // let array = [];
    // for (var i = 0; i < cryptoWatchlist?.length; i++) {
    //   array.push(watchlistCrypto[cryptoWatchlist[i]]);
    // }
    // await setCoinsArray(array);
    setIsRefreshing(false);
  }

  return (
    <View>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={() => {
          refresh();
        }}
        numColumns={2}
        data={profileInfo?.watchlist}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const result = cryptos?.filter((e) => e.symbol === item);
          if (result?.length > 0) {
            return (
              <BuzzingItemCrypto
                item={{
                  symbol: item,
                }}
              />
            );
          }
          return (
            <BuzzingItem
              item={{
                symbol: item,
              }}
            />
          );
          // if (item?.meta?.companyName) {
          //     return (
          //         <BuzzingItem
          //             item={item} />
          //     );
          // }
          // else if (item?.symbol) {
          //     return (
          //         <BuzzingItemCrypto
          //             item={item} />
          //     )
          // }
        }}
        ListFooterComponent={() => {
          return <View style={{ height: 100 }}></View>;
        }}
      />
    </View>
  );
}
export default WatchlistHome;

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
