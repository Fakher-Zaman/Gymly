import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// react native elements
import { FAB } from '@rneui/themed';
// snackbar
import Snackbar from 'react-native-snackbar';
// context API
import { AppwriteContext } from '../appwrite/AppwriteContext';

type UserObj = {
    name: String;
    email: String;
}

export default function Home() {

    const handleLogout = () => {

    }

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B0D32',
    },
    welcomeContainer: {
        padding: 12,

        flex: 1,
        alignItems: 'center',
    },
    message: {
        fontSize: 26,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    userContainer: {
        marginTop: 24,
    },
    userDetails: {
        fontSize: 20,
        color: '#FFFFFF',
    },
})
