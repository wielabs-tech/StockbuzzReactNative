import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const SearchStocks = () => {

    const suggestions = useSelector(state => state.stocks.suggestions);
    const navigation = useNavigation();

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

    return (
        <FlatList
            keyboardShouldPersistTaps={'always'}
            style={{height: '100%'}}
            keyboardDismissMode="none"
            scrollEnabled={true}
            data={suggestions?.symbols}
            renderItem={renderItem}
            keyExtractor={item => item?.symbol}
        />
    )
}

export default SearchStocks