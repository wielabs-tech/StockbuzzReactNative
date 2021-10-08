import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, StatusBar, useWindowDimensions, SafeAreaView, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Dimensions } from 'react-native';
import colors from '../styles/colors';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { getCryptoSearchThunk, getCryptoSuggestionsThunk, getSuggestionsThunk, setSuggestionEmptyThunk } from '../redux/stocks/stocks.actions';
import SearchStocks from './SearchStocks';
import SearchUsers from './SearchUsers';
import SearchCrypto from './SearchCrypto';
import { CRYPTO_SUGGESTIONS } from '../redux/stocks/stocks.types';
const { width, height } = Dimensions.get("window");

export default SearchScreen = ({ navigation }) => {

    const layout = useWindowDimensions();
    const suggestions = useSelector(state => state.stocks.suggestions);
    const [val, setVal] = useState('');
    const dispatch = useDispatch();
    const cryptos = useSelector(state => state.stocks.cryptos);
    const [filterDataSource, setFilteredDataSource] = useState('');
    const [search, setSearch] = useState('');
    const cryptoSearch = useSelector(state => state.stocks.stockSearch)
    const [data, setData] = useState();

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = cryptos.filter(
                function (item) {
                    // Applying filter for the inserted text in search bar
                    const itemData = item?.name
                        ? item?.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource([]);
            setSearch(text);
        }
    };

    useEffect(() => {
        if (val.length > 0){
            dispatch(getSuggestionsThunk(val.toLowerCase()));
            dispatch(getCryptoSuggestionsThunk(val.toLowerCase(), cryptoSearch))
        }
        else{
            dispatch({type: CRYPTO_SUGGESTIONS, payload: []})
            dispatch(setSuggestionEmptyThunk());
        }
    }, [val]);

    const goBack = () => {
        navigation.goBack();
    }

    const renderTabBar = props => (
        <TabBar
            tabStyle={{
                width: 100
            }}
            pressColor={'transparent'}
            {...props}
            style={{
                elevation: 0,
                backgroundColor: 'white',
                paddingTop: 4
            }}
            labelStyle={{
                fontSize: 14,
                fontWeight: '500',
                textTransform: 'capitalize',
                fontFamily: "inter"
            }}
            indicatorStyle={{
                height: 4,
                borderRadius: 4,
                backgroundColor: '#4955BB',
            }}
            activeColor={'#4955BB'}
            inactiveColor={'#00000080'}
        />
    );

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'stocks', title: 'Stocks ' },
        { key: 'crypto', title: 'Crypto' },
        { key: 'users', title: 'Users' },
    ]);


    const renderScene = SceneMap({
        stocks: SearchStocks,
        crypto: SearchCrypto,
        users: SearchUsers,
    });

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} onPress={() => {
                navigation.navigate('stockScreen', {
                    item: item,
                    isCrypto: false,
                });
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ marginTop: 10, marginBottom: 5, marginLeft: 10 }}>{item?.symbol}</Text>
                        <Text style={{ marginBottom: 10, marginLeft: 10, fontSize: 10 }}>{item?.symbol_info || item?.name}</Text>
                    </View>
                    {/* <Text>{item?.}</Text> */}
                </View>
            </TouchableOpacity>
        )
    }

    const renderItemUsers = ({ item }) => {
        console.log("ITEM", item)
        return (
            <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} onPress={() => {
                navigation.navigate('UserProfile', { userId: item?._source?.user_id?.$oid })
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ marginTop: 10, marginBottom: 5, marginLeft: 10 }}>{item?._source?.fullName || item?._source?.full_name}</Text>
                        <Text style={{ marginBottom: 10, marginLeft: 10, fontSize: 10 }}>@{item?._source?.username}</Text>
                    </View>
                    {/* <Text>{item?.}</Text> */}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#fff", height: '100%' }}>
            <StatusBar
                animated={true}
                barStyle='dark-content'
                backgroundColor='#fff'
            />
            <View style={{ height: '100%' }}>
                <View style={{ width: '100%' }}>
                    <Input
                        onChangeText={text => setVal(text)}
                        leftIcon={{
                            type: 'iconicons',
                            name: 'arrow-back',
                            color: '#ACABAF',
                            onPress: goBack
                        }}
                        autoFocus={true}
                        placeholder="Search for symbol"
                        rightIcon={{
                            type: 'iconicons',
                            name: 'search',
                            size: 20,
                            color: '#ACABAF',
                        }}
                        inputStyle={{ fontSize: 14 }}
                        inputContainerStyle={styles.inputContainerStyleBlur}
                    />
                </View>
                <View style={{height: '100%'}}>
                    <TabView
                        renderTabBar={renderTabBar}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        indicatorStyle={{ backgroundColor: "#fff" }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    leftIconContainerStyle: { marginLeft: 4, marginRight: 4 },
    inputContainerStyle: {
        width: '70%',
        borderColor: '#C8E0F9',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        height: 48,
        backgroundColor: '#F1F1F9',
    },

    inputContainerStyleBlur: {
        marginTop: 24,
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
