import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import Palette from '../constants/colors';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.headline}>Tracking Your Fitness Now!</Text>
                <Avatar.Image
                    size={64}
                    style={styles.avatar}
                    source={require('../../assets/avatar.png')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15, // Add padding for spacing
    },
    headline: {
        fontSize: 40,
        fontWeight: '600',
        color: Palette.primary,
        flex: 1, // Allow text to take available space
        marginRight: 10, // Add spacing between text and avatar
    },
    avatar: {
        backgroundColor: Palette.primary,
    },
});

export default Home;
