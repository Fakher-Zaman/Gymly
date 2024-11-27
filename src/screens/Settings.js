import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppbarHeader from '../components/AppbarHeader';
import { Button } from 'react-native-paper';
import Palette from '../constants/colors';
import { logout } from '../appwrite/service';
import Snackbar from 'react-native-snackbar';

const Settings = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await logout();
            navigation.navigate('Login');
            Snackbar.show({
                text: 'Logged out successfully!',
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'UNDO',
                    textColor: Palette.success,
                    onPress: () => {
                        console.log('Undo action!');
                    },
                },
            });
        } catch (error) {
            Snackbar.show({
                text: 'Error: ' + error.message,
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'UNDO',
                    textColor: Palette.error,
                    onPress: () => {
                        console.log('Undo action!');
                    },
                },
            });
        }
    };

    return (
        <>
            <AppbarHeader />
            <View style={styles.container}>
                <Text style={styles.headlineText}>Settings!</Text>
                <Button
                    mode="contained"
                    onPress={() => handleLogout()}
                    style={styles.button}
                >Logout</Button>
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
