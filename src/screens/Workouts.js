import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppbarHeader from '../components/AppbarHeader';

export default function Workouts() {
    return (
        <>
            <AppbarHeader title="Workouts" />
            <View style={styles.container}>
                <Text style={styles.text}>Workouts</Text>
            </View>
        </>
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