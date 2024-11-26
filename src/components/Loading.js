import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Palette from '../constants/colors'

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Palette.primary} />
            <Text>Loading</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
