import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Workouts() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Workout</Text>
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