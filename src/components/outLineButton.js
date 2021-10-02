import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default OutLineButton = ({text, onPress}) => {
    return (
        <View>
        <TouchableOpacity style={styles.btnStyleFill} onPress={onPress}>
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

var styles = StyleSheet.create({

    textStyle: {
        alignSelf: 'center', 
        color: "#fff" 
    },

    viewStyle: {
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },

    btnStyleFill: {
        margin: 5,
        borderRadius: 10,
        borderColor: "#fff",
        height: 50,
        width: '80%',
        alignSelf: 'center',
        color: "#fff",
        borderWidth : 1,
        backgroundColor: 'transparent',
    },

});