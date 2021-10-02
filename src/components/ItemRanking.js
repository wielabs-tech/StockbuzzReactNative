import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useEffect } from 'react'

export const Item = ({ item }) => {

    const ran_colors = ["#abfd16", "#19dd82", "#8baf59", "#c6dcff", "#d3b1a7", "#13a3d3", "#a7cddd", "#cae4b1", "#2578cb", "#308deb", "#1cf8aa"]
    const navigation = useNavigation();

    const roundOff = (number, decimalPlaces) => {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(number * factor) / factor;
      }

    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.push('stockScreen', {
            item: item
        })}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: ran_colors[item.symbol.length], justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 24, color: "#fff" }}>{item.symbol[0]}</Text>
                    </View>
                    <View style={{ marginLeft: 5 }} >
                        <Text style={{ fontSize: 14, fontFamily: "inter", lineHeight: 17, marginBottom: 2 }}>${item.symbol}</Text>
                        <Text style={{ fontSize: 12, fontFamily: "inter" }}>{((item.meta.companyName).length > 40) ?
                            (((item.meta.companyName).substring(0, 40 - 3)) + '...') :
                            item.meta.companyName}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontFamily: "inter", lineHeight: 17, marginBottom: 2, alignSelf: 'flex-end' }}>₹{item.lastPrice}</Text>
                    <Text style={{ fontSize: 12, fontFamily: "inter", color: item.change > 0 ? "green" : "red", }}>{roundOff(item.change, 2)}({roundOff(item.pChange, 2)}%)</Text>
                </View>
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
