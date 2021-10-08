import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View, Image, StyleSheet, FlatList, Text, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getMyWatchlistDataThunk } from '../redux/stocks/stocks.actions';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BuzzingItem } from './BuzzingItem';

function WatchlistHome({}) {
    const navigation = useNavigation();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const watchlistData = useSelector(state => state.stocks.watchlistData);
    const profileInfo = useSelector(state => state.profile.profileInfo);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getMyWatchlistDataThunk(profileInfo?._id?.$oid))
    }, []);

    const [render, setRender] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setRender(!render);
    //         dispatch(getMyWatchlistDataThunk(profileInfo._id.$oid))
    //     }, 10000);
    // }, [render]);

    async function refresh() {
        setIsRefreshing(true)
        await dispatch(getMyWatchlistDataThunk(profileInfo?._id.$oid))
        setIsRefreshing(false)
    }

    return (
        <FlatList
            refreshing={isRefreshing}
            onRefresh={() => { refresh() }}
            numColumns={2}
            data={watchlistData?.data}
            keyExtractor={(item) => item?.identifier}
            renderItem={({item}) => {
                return (
                  <BuzzingItem
                    item={item} />
                );
            }}
        />
    )
}
export default WatchlistHome;

const styles = StyleSheet.create({
    box: {
        height: 125,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 12,
        elevation: 2,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    }
});