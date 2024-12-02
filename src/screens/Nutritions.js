import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppbarHeader from '../components/AppbarHeader';

export default function Nutritions({navigation}) {
    return (
        <>
            <AppbarHeader title="Nutritions" navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.text}>Nutritions</Text>
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