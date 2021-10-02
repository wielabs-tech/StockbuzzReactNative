import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Switch,
    Image,
    Button,
    TouchableOpacity,
    useWindowDimensions,
    TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import TwitterButton from '../screens/TwitterButtonConnection';

function Connections() {
    const profile = useSelector(state => state.profile.profileInfo);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#000', fontSize: 16 }}>
                        Social Accounts
                    </Text>
                </View>
                <View>
                    <Text style={{ paddingVertical: 10, fontSize: 12, color: "rgba(0, 0, 0, 0.5)" }}>
                        Connect social accounts to find friends and share ideas
                        across networks
                    </Text>
                </View>
                <View style={styles.twitter}>
                    <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                        <Entypo size={48} name="twitter-with-circle" style={{ color: "#1DA1F2", backgroundColor: "#fff" }} />
                        <Text style={styles.twitter_text}>
                            Twitter
                        </Text>
                    </View>
                    <View>
                        <TwitterButton id={profile?._id?.$oid} name={profile?.full_name}/>
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 14 }}>
                        Applications
                    </Text>
                    <Text style={{ color: "#00000080", marginVertical: 10 }}>
                        You have authorized these apps to interact with your
                        Stocktwits account
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: "#fff",
        padding: 10
    },
    input: {
        marginVertical: 10,
        borderWidth: 0.3,
        borderColor: "#4955BB",
        color: "black",
        textAlignVertical: "top",
        borderRadius: 10,
        padding: 15
    },
    button: {
        justifyContent: "center",
        backgroundColor: "#1DA1F2",
        alignItems: 'center',
        borderRadius: 10,
        width: 72,
        height: 32
    },
    twitter: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20
    },
    twitter_text: {
        fontWeight: "700",
        marginLeft: 10,
        color: "#000000",
        fontSize: 14,
        fontFamily: "inter",
        fontStyle: 'normal'
    }
});
export default Connections;