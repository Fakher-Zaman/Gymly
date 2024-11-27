import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Palette from '../constants/colors';
import { logout, getUser } from '../appwrite/service';
import Snackbar from 'react-native-snackbar';
import { Text } from 'react-native';

export default function Profile() {
    const [userData, setUserData] = useState();

    const handleLogout = async () => {
        try {
            await logout(); // Perform logout logic
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
            navigation.navigate('Login');
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const session = await getUser();  // Will throw error if no active session
                console.log("Session: ", session);
                const user = {
                    name: session.name,
                    email: session.email,
                };
                setUserData(user);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchUserData(); // Call the function
    }, []);
    return (
        <View>
            <Text>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({})