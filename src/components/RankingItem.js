import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingStocksThunk } from '../redux/stocks/stocks.actions';
import { Item } from './ItemRanking';

const ran_colors = ["#abfd16", "#19dd82", "#8baf59", "#c6dcff", "#d3b1a7", "#13a3d3", "#a7cddd", "#cae4b1", "#2578cb", "#308deb", "#1cf8aa"]

const RankingItem = () => {

  const trendingStocks = useSelector(state => state.stocks.topTrendingStocks);
  let gainers = trendingStocks?.data.gainers;
  let losers = trendingStocks?.data.losers;
  const data = gainers.concat(losers)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrendingStocksThunk())
  }, []);

  const renderItem = ({ item }) => {
    if(item.symbol){
      return (<Item item={item} />)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item?.identifier}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomColor: "#4955BB40",
    borderBottomWidth: 0.2                                          
  },
  title: {
    fontSize: 10,
  },
});

export default RankingItem;
