import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Separator() {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#5555',
    height: 0.4,
    flex: 1
  }
})