import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, ImageBackground } from 'react-native';
import { Surface } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import Palette from '../constants/colors';
import { items } from '../lib/data';

const Recomendations = () => {
    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';

    const styles = StyleSheet.create({
        container: {
            marginTop: 15,
        },
        heading: {
            fontSize: 22,
            fontWeight: 'bold',
            color: isDarkMode ? Palette.darkText : '#333',
            marginBottom: 10,
        },
        card: {
            height: 200,
            width: 150,
            borderRadius: 8,
            overflow: 'hidden',
            marginRight: 10,
        },
        imageBackground: {
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
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
    });

    const renderRecomendation = useCallback(
        ({ item }) => (
            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.card}>
                <Surface style={styles.card} elevation={1}>
                    <ImageBackground
                        source={item.image}
                        style={styles.imageBackground}
                    >
                        <Text style={styles.overlayText}>{item.text}</Text>
                    </ImageBackground>
                </Surface>
            </Animated.View>
        ),
        [isDarkMode]
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Recomendations</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderRecomendation}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
        </View>
    );
};

export default Recomendations;
