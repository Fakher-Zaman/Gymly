import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Palette from '../constants/colors'
import { useSelector } from 'react-redux';

export default function Loading() {
    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';
    console.log("first", isDarkMode);

    return (
        <View style={styles.container} backgroundColor={isDarkMode ? Palette.darkBackground : '#fff'}>
            <ActivityIndicator size="large" color={Palette.primary} />
            <Text style={{ color: isDarkMode ? Palette.darkText : '#333' }}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
    }
})
