import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { cos } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { ItemCryptoWatchlist } from '../components/ItemCryptoWatchlist';
import { Item } from '../components/ItemRanking';
import { getCryptoInfoThunk, getCryptoWatchlisthunk, getMyWatchlistDataThunk } from '../redux/stocks/stocks.actions';
import { getWatchlistDataThunk } from '../redux/user/user.actions';

export const Watchers = ({navigation, route}) => {
    const profileInfo = useSelector(state => state.profile.profileInfo);
    const userWatchlist = useSelector(state => state.user.userWatchlist)
    const trendingStocks = useSelector(state => state.stocks.watchlistData);
    const data = trendingStocks?.data
    const [coinsArray, setCoinsArray] = useState([]);
    const watchlistCrypto = useSelector(state => state.stocks.cryptoWatchlist);

    // const dispatch = useDispatch();
    // useEffect(async () => {
    //     if(route.id){
    //         await dispatch(getWatchlistDataThunk(route.id)) 
    //     } else {
    //         await dispatch(getMyWatchlistDataThunk(profileInfo?._id?.$oid))
    //     }

    //     const cryptoWatchlist = data.filter(e => !e?.activeSeries)
    //     await dispatch(getCryptoWatchlisthunk(cryptoWatchlist.join(',')))
    //     let array = []
    //     for(var i = 0 ; i < cryptoWatchlist?.length ; i++){
    //         array.push(watchlistCrypto[cryptoWatchlist[i]]);
    //     }
    //     setCoinsArray(array);
    // }, []);

    const renderItem = ({ item }) => {
        if(item?.meta?.companyName){
            return <Item item={item} />
        } else if(item?.symbol){
            return <ItemCryptoWatchlist item={item} />
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={route.id ? userWatchlist?.concat(coinsArray) : data?.concat(coinsArray)}
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

export default Watchers;
