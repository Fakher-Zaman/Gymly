import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, ImageBackground } from 'react-native';  // Ensure these are from 'react-native'
import { Surface } from 'react-native-paper';  // Make sure this is imported from 'react-native-paper'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import Palette from '../constants/colors';
import { items } from '../lib/data';

export default function Recomendations() {
    const theme = useSelector((state) => state.theme);  // Access theme from Redux store
    const isDarkMode = theme === 'dark';

    // Memoize styles based on theme to prevent unnecessary recalculations
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

    // Memoize renderItem function to avoid unnecessary re-renders
    const renderItem = useCallback(
        ({ item }) => (
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
        ),
        [isDarkMode] // Add isDarkMode as a dependency
    );

    if (!items || items.length === 0) {
        return <Text>Loading...</Text>;  // Show loading text if items is empty
    }

    return (
        <View style={styles.recomendationsContainer}>
            <Text style={styles.recomendationsHeading}>Recomendations</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString() + (isDarkMode ? 'dark' : 'light')} // Use dynamic key to force re-render on theme change
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carousel}
                extraData={isDarkMode}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
            />
        </View>
    );
}
