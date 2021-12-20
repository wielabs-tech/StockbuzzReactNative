import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, View, SafeAreaView, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { stocksAPI } from '../api/ajax';
import FillButton from '../components/fillButton'
import moment from 'moment';
import { getCryptoInfoThunk, getStockFeedThunk, getStockInfoThunk } from '../redux/stocks/stocks.actions';
import { getProfileInfoThunk, updateWatchlistThunk } from '../redux/profile/profile.actions';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import PostCreate from './PostCreate';
import PostRoute from './PostRoute';
import { RefreshControl } from 'react-native';
import { store } from '../redux/store';
import { GET_STOCK_INFO } from '../redux/stocks/stocks.types';
import { useIsFocused } from '@react-navigation/core';

export default StockScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const { width, height } = Dimensions.get("window");

    const [stockInfo, setStockInfo] = useState('');
    const [stockFeed, setStockFeed] = useState('');
    const [watchlistLoading, setWatchlistLoading] = useState(false);
    const profileInfo = useSelector(state => state.profile.profileInfo)
    const [isLoadingProgress, setIsLoadingProgress] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    useEffect(async () => {
        const res = await stocksAPI.getCryptoInfo(item?.symbol);
        setStockInfo(res?.data?.data[item?.symbol]);
    }, []);

    const isFocused = useIsFocused();

    useEffect(async () => {
        const response1 = await stocksAPI.getStockPosts(item?.symbol);
        setStockFeed(response1.data);
    }, [isFocused]);

    const roundOff = (number, decimalPlaces) => {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(number * factor) / factor;
    }

    async function updateWatchLIst(is_add) {
        setWatchlistLoading(true);
        await dispatch(updateWatchlistThunk(profileInfo?._id.$oid, item?.symbol, is_add));
        const response = await stocksAPI.getStockInfo(item?.symbol);
        setStockInfo(response.data)
        // await dispatch(getStockInfoThunk(item?.symbol))
        setWatchlistLoading(false);
    }

    navigation.setOptions({
        headerTitle: () => <Text style={styles.title}>{item?.symbol}</Text>,
        headerLeft: () =>
            <Icon
                onPress={() => {
                    navigation.goBack();
                    store.dispatch({ type: GET_STOCK_INFO, payload: null })
                }}
                style={{ marginLeft: 14 }}
                color="#737373"
                fontWeight={100}
                backgroundColor="#fff"
                name="arrow-back"
                size={24} />,

        headerRight: () => (
            <Icon
                color="#737373"
                fontWeight={100}
                name="help-circle-outline"
                size={20}
                style={{ paddingRight: 20 }}
            // onPress={() => {
            //   navigation.navigate("");
            // }}
            />
        ),
    })

    const renderItem = ({ item }) => {
        return (
            <PostRoute
                item={item}
            />
        )
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        dispatch(getProfileInfoThunk(profileInfo?._id.$oid));
        const response = await stocksAPI.getCryptoInfo(item?.symbol);
        await setStockInfo(response?.data?.data[item?.symbol]);
        const response1 = await stocksAPI.getStockPosts(item?.symbol);
        setStockFeed(response1.data);
        setRefreshing(false);
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#fff", height: '100%' }}>
            {
                isLoading ? (
                    <View style={{ height: '100%', width: '100%', backgroundColor: "#fff", justifyContent: 'center' }}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 10 }}>
                            <View>
                                <Text style={{ fontSize: 16, fontFamily: 'Inter-Regular', fontWeight: '400' }}>{item?.symbol}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                    {stockInfo?.quote?.USD?.price &&
                                        <Text style={{ color: "#4955BB", fontWeight: '400', fontFamily: 'SecularOne-Regular', fontSize: 20 }}>${roundOff(stockInfo?.quote?.USD?.price, 4)}</Text>
                                    }
                                    {stockInfo?.quote?.USD?.percent_change_1h && stockInfo?.quote?.USD?.percent_change_1h > 0 ?
                                        <Text style={{ marginLeft: 8, fontSize: 10, alignSelf: 'flex-end', color: 'green', alignSelf: 'center' }}>+</Text> : <><Text style={{ marginLeft: 8 }}></Text></>
                                    }
                                    {stockInfo?.quote?.USD?.percent_change_1h &&
                                        <Text style={{ fontSize: 12, color: stockInfo?.quote?.USD?.percent_change_1h > 0 ? "green" : "red", }}>{roundOff(stockInfo?.quote?.USD?.percent_change_1h * stockInfo?.quote?.USD?.price / 100, 4)}({roundOff(stockInfo?.quote?.USD?.percent_change_1h, 2)}%)</Text>
                                    }
                                </View>
                                <Text style={{ color: '#aaa', fontSize: 12 }}>Last Updated - {moment(stockInfo?.metadata?.lastUpdateTime).format('DD MMM, YYYY h:mm a')}</Text>
                            </View>
                            {
                                !watchlistLoading ? (
                                    <View style={{}}>
                                        {profileInfo?.watchlist.find(element => element == item?.symbol) ? (
                                            <TouchableOpacity
                                                style={styles.watchButtonStyle}
                                                onPress={() => updateWatchLIst(false)}
                                                underlayColor='#fff'>
                                                <Text style={{ color: '#fff', padding: 5 }}>Unwatch</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity
                                                style={styles.watchButtonStyleOutline}
                                                onPress={() => updateWatchLIst(true)}>
                                                <Text style={{ color: '#4955BB', padding: 5, textAlign: 'center' }}>Watch</Text>
                                            </TouchableOpacity>
                                        )}
                                        <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <Text style={{ color: "#4955bb" }}>{stockInfo?.total_watchers}</Text>
                                            <Icon name="person-circle-outline" style={{ alignSelf: 'center', marginLeft: 4 }} color="#4955bb" size={14} />
                                        </View>
                                    </View>
                                ) : (
                                    <View>
                                        <ActivityIndicator />
                                    </View>
                                )
                            }

                        </View>
                        <Text style={{ marginTop: 20, fontSize: 18, marginLeft: 10, marginBottom: 10 }}>Feed</Text>
                        <FlatList
                            nestedScrollEnabled
                            data={stockFeed}
                            renderItem={renderItem}
                            keyExtractor={item => item?._id?.$oid}
                        />

                    </ScrollView>
                )
            }
            <TouchableOpacity style={{ elevation: 10, position: 'absolute', bottom: 50, right: 20, height: 65, width: 65, backgroundColor: "#fff", borderRadius: 100, justifyContent: 'center' }}
                onPress={() => {
                    console.log("PRESSED", stockInfo?.symbol)
                    navigation.push('createPost', { groupPost: false, prefill: item?.symbol })
                }}
            >
                <LinearGradient
                    colors={['#0063F5', '#4955BB']}
                    start={{ x: 1, y: 0 }}
                    style={styles.fab}
                    end={{ x: 0, y: 0 }}
                    angle={267.35}>
                    <View style={styles.fab}>
                        <MaterialIcons style={{ alignSelf: 'center' }} name="edit" size={24} color="#fff" />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    title: {
        color: '#4955BB',
        fontFamily: 'SecularOne-Regular',
        fontSize: 16,
        fontWeight: '400',
    },

    watchButtonStyle: {
        borderRadius: 3,
        backgroundColor: '#4955BB',
    },

    watchButtonStyleOutline: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#4955BB',
    },

    box: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },

    fab: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 60,
        width: 60,
        borderRadius: 100,
    }
});
