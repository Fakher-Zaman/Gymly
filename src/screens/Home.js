import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import Palette from '../constants/colors';
import { getUser } from '../appwrite/service';

const Home = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = async () => {
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData(); // Call the function
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
                <View>
                    <Text style={styles.headline}>Welcome back 🙌</Text>
                    {isLoading ? <Text>Loading...</Text> : <Text style={styles.username}>{userData?.name}</Text>}
                </View>
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
        padding: 20,
    },
    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    headline: {
        fontSize: 20,
        fontWeight: '600',
        color: Palette.steel,
        flex: 1,
        marginRight: 10,
    },
    username: {
        fontSize: 30,
        fontWeight: '600',
        color: Palette.charcoal,
    },
    avatar: {
        backgroundColor: Palette.neutral,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default Home;
