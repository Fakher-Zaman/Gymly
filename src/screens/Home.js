import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Avatar } from 'react-native-paper';
import Palette from '../constants/colors';
import { getUser } from '../appwrite/service';
import { Surface, Text } from 'react-native-paper';

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
            <View>
                <Surface style={styles.surface} elevation={1}>
                    <ImageBackground
                        source={require('../../assets/images/slide3.png')}
                        style={styles.imageBackground}
                        imageStyle={styles.imageOpacity}
                    >
                        <Text style={styles.overlayText}>Your Custom Text</Text>
                    </ImageBackground>
                </Surface>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
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
    surface: {
        height: 170,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Ensures the image stays within bounds
        borderRadius: 8,
    },
    imageBackground: {
        height: '100%',
        width: '100%',
        justifyContent: 'center', // Center text on the image
        alignItems: 'center', // Center text horizontally
    },
    imageOpacity: {
        opacity: 0.6, // Adjust image opacity
        resizeMode: 'cover', // Ensures the image covers the surface dimensions
    },
    overlayText: {
        color: '#FFFFFF', // Text color
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better contrast
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
});

export default Home;
