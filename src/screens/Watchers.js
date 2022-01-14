import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ItemCryptoWatchlist } from "../components/ItemCryptoWatchlist";
import { Item } from "../components/ItemRanking2";
import { getUserDetailsById } from "../redux/user/user.actions";

export const Watchers = ({ navigation, route }) => {
  const profileInfo = useSelector((state) => state.profile.profileInfo);
  const userWatchlist = useSelector((state) => state.user.userWatchlist);
  const user = useSelector((state) => state.user.user);
  const trendingStocks = useSelector((state) => state.stocks.watchlistData);
  const data = trendingStocks?.data;
  const [coinsArray, setCoinsArray] = useState([]);
  const watchlistCrypto = useSelector((state) => state.stocks.cryptoWatchlist);

  const dispatch = useDispatch();
  useEffect(async () => {
    if (route?.params?.id) {
      dispatch(getUserDetailsById(route?.params?.id));
    }
  }, []);

  useEffect(() => {
    console.log("USER", user);
  }, []);

  const renderItem = ({ item }) => {
    return <Item item={item} />;
    // if(item?.meta?.companyName){
    //     return <Item item={item} />
    // } else if(item?.symbol){
    //     return <ItemCryptoWatchlist item={item} />
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={route.id ? user?.watchlist : profileInfo?.watchlist}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
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

export default Watchers;
