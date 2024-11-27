import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppbarHeader from './AppbarHeader';

const Settings = () => {
    return (
        <>
            <AppbarHeader />
            <View style={styles.container}>
                <Text style={styles.headlineText}>Settings!</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headlineText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Settings;
