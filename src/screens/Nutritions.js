import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Nutritions() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nutritions</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});