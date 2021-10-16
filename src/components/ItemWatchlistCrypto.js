import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from "react-redux";
import { updateWatchlistThunk } from "../redux/profile/profile.actions";
import { getMyWatchlistDataThunk } from "../redux/stocks/stocks.actions";
import { ActivityIndicator } from "react-native-paper";

export const ItemWatchlistCrypto = ({ item, isInWatchlist, refresh }) => {
    const ran_colors = ["#abfd16", "#19dd82", "#8baf59", "#c6dcff", "#d3b1a7", "#13a3d3", "#a7cddd", "#cae4b1", "#2578cb", "#308deb", "#1cf8aa"]
    const navigation = useNavigation();
    const profile = useSelector(state => state.profile.profileInfo);
    const [watchlistLoading, setWatchlistLoading] = useState('');

    const roundOff = (number, decimalPlaces) => {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(number * factor) / factor;
    }

    const dispatch = useDispatch();

    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.push('cryptoScreen', {
            item: item
        })}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: ran_colors[item?.symbol?.length], justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 24, color: "#fff" }}>{item?.symbol[0]}</Text>
                    </View>
                    <View style={{ marginLeft: 5 }} >
                        <Text style={{ fontSize: 14, fontFamily: "inter", lineHeight: 17, marginBottom: 2 }}>${item?.symbol}</Text>
                        {item?.slug ? (
                            <Text style={{ fontSize: 12, fontFamily: "inter" }}>{((item?.slug).length > 40) ?
                                (((item?.slug).substring(0, 40 - 3)) + '...') :
                                item?.slug}</Text>
                        ) : (
                            <Text style={{ fontSize: 12, fontFamily: "inter" }}>{((item?.slug)?.length > 40) ?
                                (((item?.slug).substring(0, 40 - 3)) + '...') :
                                item?.slug}</Text>
                        )
                        }
                    </View>
                </View>
                {
                    !watchlistLoading ?
                        <View>
                            {
                                isInWatchlist ? (
                                    <TouchableOpacity
                                        style={{ justifyContent: 'center', alignItems: 'center' }}
                                        onPress={async () => {
                                            setWatchlistLoading(true);
                                            await dispatch(updateWatchlistThunk(profile._id.$oid, item?.symbol))
                                            setWatchlistLoading(false);
                                            refresh();
                                        }}
                                    >
                                        <MaterialIcons name="delete" size={24} color="#FF6347" />
                                        <Text style={{ fontSize: 10 }}>Delete</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={{ justifyContent: 'center', alignItems: 'center' }}
                                        onPress={async () => {
                                            setWatchlistLoading(true);
                                            await dispatch(updateWatchlistThunk(profile._id.$oid, item?.symbol))
                                            setWatchlistLoading(false);
                                            refresh();
                                        }}
                                    >
                                        <MaterialIcons name="add" size={24} color="green" />
                                        <Text style={{ fontSize: 10 }}>Add</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View> : <View>
                            <ActivityIndicator />
                        </View>
                }
            </View>
        </TouchableOpacity>
    )
};

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
