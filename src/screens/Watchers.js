import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { cos } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from '../components/ItemRanking';
import { getMyWatchlistDataThunk } from '../redux/stocks/stocks.actions';
import { getWatchlistDataThunk } from '../redux/user/user.actions';

export const Watchers = ({navigation, route}) => {
    console.log("ROUTES", route.id)
    const profileInfo = useSelector(state => state.profile.profileInfo);
    const userWatchlist = useSelector(state => state.user.userWatchlist)
    const trendingStocks = useSelector(state => state.stocks.watchlistData);
    const data = trendingStocks?.data

    const dispatch = useDispatch();
    useEffect(() => {
        if(route.id){
            dispatch(getWatchlistDataThunk(route.id)) 
        } else {
            dispatch(getMyWatchlistDataThunk(profileInfo?._id?.$oid))
        }
    }, []);

    const renderItem = ({ item }) => (
        !!item &&  
        <Item item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={route.id ? userWatchlist : data}
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
