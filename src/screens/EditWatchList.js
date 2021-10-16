import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, BackHandler } from 'react-native';
import { Input } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { Item } from '../components/ItemWatchlist';
import { getMyWatchlistDataThunk, getSuggestionsThunk, setSuggestionEmptyThunk } from '../redux/stocks/stocks.actions';
import { getWatchlistDataThunk } from '../redux/user/user.actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { clearWatchlistThunk } from '../redux/profile/profile.actions';

export default EditWatchList = ({ navigation }) => {

    const suggestions = useSelector(state => state.stocks.suggestions);
    const [val, setVal] = useState('');

    useEffect(() => {
        if (val.length > 0)
            dispatch(getSuggestionsThunk(val.toLowerCase()));
        else
            dispatch(setSuggestionEmptyThunk());
    }, [val]);


    navigation.setOptions({
        headerLeft: () => <MaterialIcons name='arrow-back' style={{ marginLeft: 10 }} size={24} onPress={() => {
            navigation.goBack();
        }} />,
        headerTitle: () => <Text>Edit Watchlist</Text>,
        headerRight: () => <TouchableOpacity
            onPress={() => {
                dispatch(clearWatchlistThunk(profileInfo?._id?.$oid))
            }}
        ><Text style={{ marginRight: 10, fontSize: 10 }}>Clear watchlist</Text></TouchableOpacity>
    })

    const backAction = () => {
        console.log("HELLO")
    };

    const profileInfo = useSelector(state => state.profile.profileInfo);
    const userWatchlist = useSelector(state => state.user.userWatchlist)
    const trendingStocks = useSelector(state => state.stocks.watchlistData);
    const data = trendingStocks?.data

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyWatchlistDataThunk(profileInfo?._id?.$oid))
    }, []);

    console.log("USER", userWatchlist)

    function isInWatchlist(item) {
        for (var i = 0; i < data.length; i++) {
            if (item?.symbol === data[i].symbol) {
                return true;
            }
        }
        return false
    }

    const renderItem = ({ item }) => {
        if(item?.symbol)
        return (
            <Item item={item} isInWatchlist={isInWatchlist(item)} />
        )
    }

    const onPressClose = () => {
        setVal("");
    }

    return (
        <View style={{ backgroundColor: "#fff", height: '100%' }}>
            <View style={{ height: '100%', paddingTop: 10 }}>
                <Input
                    value={val}
                    onChangeText={text => setVal(text)}
                    placeholder="Search for symbol"
                    rightIcon={{
                        type: 'iconicons',
                        name: 'close',
                        size: 20,
                        color: '#ACABAF',
                        onPress: onPressClose
                    }}
                    inputStyle={{ fontSize: 14 }}
                    inputContainerStyle={styles.inputContainerStyleBlur}
                />
                <FlatList
                    keyboardShouldPersistTaps={"always"}
                    data={suggestions?.symbols.length != 0 ? suggestions?.symbols : data}
                    renderItem={renderItem}
                    keyExtractor={item => item?.identifier}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    leftIconContainerStyle: { marginLeft: 4, marginRight: 4 },
    inputContainerStyle: {
        width: '70%',
        borderColor: '#C8E0F9',
        borderWidth: 1,
        borderRadius: 5,
        height: 48,
        backgroundColor: '#F1F1F9',
    },

    inputContainerStyleBlur: {
        marginBottom: -15,
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        height: 52,
        backgroundColor: '#FFF',
    },
    item: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 100,
        borderRadius: 10,
        height: 200,
        padding: 10,
        marginVertical: 4,
        marginRight: 10,
    },
    title: {
        fontSize: 32,
    },

    box: {
        overflow: 'hidden',
        shadowColor: '#5B72FF',
        shadowOffset: { width: 6, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },

    viewStyle: {
        height: '100%',
        justifyContent: 'space-between'
    }

});