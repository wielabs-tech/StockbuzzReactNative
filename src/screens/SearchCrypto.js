import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const SearchCrypto = () => {

    const crypto = useSelector(state => state.stocks.cryptos);
    const navigation = useNavigation();
    console.log("CRYPTO", crypto)

    const renderItemUsers = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} onPress={() => {
                navigation.navigate('UserProfile', { userId: item?._source?.user_id?.$oid })
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ marginTop: 10, marginBottom: 5, marginLeft: 10 }}>{item?._source?.fullName || item?._source?.full_name}</Text>
                        <Text style={{ marginBottom: 10, marginLeft: 10, fontSize: 10 }}>@{item?._source?.username}</Text>
                    </View>
                    {/* <Text>{item.}</Text> */}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={crypto}
            // renderItem={renderItemUsers}
            keyExtractor={item => item.symbol}
        />
    )
}


export default SearchCrypto;