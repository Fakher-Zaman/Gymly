import React from 'react';
import { View, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Palette from '../constants/colors';
import { useSelector } from 'react-redux';
import { items } from '../lib/data';

export default function Recomendations() {
    const theme = useSelector((state) => state.theme);  // Access theme from Redux store
    const isDarkMode = theme === 'dark';

    const styles = StyleSheet.create({
        recomendationsContainer: {
            marginTop: 15,
        },
        recomendationsHeading: {
            fontSize: 22,
            fontWeight: 'bold',
            color: isDarkMode ? Palette.darkText : '#333',
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
    });

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
