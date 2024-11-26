import { TouchableOpacity, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Palette from '../constants/colors';

export default function Landing({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/welcome.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.appLogoContainer}>
                    <FontAwesome5Icon
                        name="dumbbell"
                        size={40}
                        color={Palette.primary}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>GYMly</Text>
                </View>
                <View style={styles.appFooter}>
                    <Text style={styles.text}>Welcome to the app!</Text>
                    <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 12,
    },
    appLogoContainer: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
    },
    text: {
        fontFamily: 'Roboto-Bold',
        fontSize: 25,
        color: '#FFFFFF',
    },
    icon: {
        marginRight: 10,
    },
    appFooter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 25,
    },
    getStartedButton: {
        backgroundColor: Palette.primary,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
