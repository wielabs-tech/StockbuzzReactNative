import React from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Image, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image';

function Avatar(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
            <Image
                style={{ height: props.height, width: props.width, borderRadius: 50 }}
                source={{
                    uri:`${props.url}`
                }}
            />
        </TouchableOpacity>
    )
}
export default Avatar;


