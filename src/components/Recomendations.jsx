import React from 'react';
import { View, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { Avatar, Surface, Text } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Palette from '../constants/colors';

export default function Recomendations() {
    const items = [
        {
            id: '1',
            image: require('../../assets/images/slide4.png'),
            text: 'Increase Endurance',
        },
        {
            id: '2',
            image: require('../../assets/images/slide5.png'),
            text: 'Build Strength',
        },
        {
            id: '3',
            image: require('../../assets/images/slide3.png'),
            text: 'Boost Stamina',
        },
        {
            id: '4',
            image: require('../../assets/images/slide1.png'),
            text: 'Cardiovascular Health',
        },
        {
            id: '5',
            image: require('../../assets/images/slide2.png'),
            text: 'Improve Flexibility',
        },
    ];

    const renderItem = ({ item }) => (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.surfaceContainer}>
            <Surface style={styles.surface} elevation={1}>
                <ImageBackground
                    source={item.image}
                    style={styles.imageBackground}
                    imageStyle={styles.imageOpacity}
                >
                    <Text style={styles.overlayText}>{item.text}</Text>
                </ImageBackground>
            </Surface>
        </Animated.View>
    );

    return (
        <View style={styles.recomendationsContainer}>
            <Text style={styles.recomendationsHeading}>Recomendations</Text>
            <FlatList
                data={items}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carousel}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    recomendationsContainer: {
        marginTop: 15,
    },
    recomendationsHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Palette.charcoal,
    },
    surfaceContainer: {
        marginHorizontal: 10,
    },
    surface: {
        height: 200,
        width: 150,
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageBackground: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageOpacity: {
        opacity: 0.8,
    },
    overlayText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Palette.white,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Palette.white,
    },
    carousel: {
        paddingVertical: 15,
    },
})