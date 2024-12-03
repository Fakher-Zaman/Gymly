import React from 'react';
import { View, StyleSheet, FlatList, Image, Text } from 'react-native';
import { exercises } from '../lib/data';
import { useSelector } from 'react-redux';
import Palette from '../constants/colors';

const BodyBuilderExercises = () => {
    const theme = useSelector((state) => state.theme);  // Access theme from Redux store
    const isDarkMode = theme === 'dark';

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            marginBottom: 5,
            backgroundColor: isDarkMode ? Palette.darkBackground : '#fff',
        },
        heading: {
            fontSize: 18,
            fontWeight: 'bold',
            color: isDarkMode ? Palette.darkText : '#333',
            marginBottom: 20,
        },
        card: {
            marginRight: 15,
            alignItems: 'center',
            width: 100,
        },
        image: {
            width: 100,
            height: 100,
            borderRadius: 8,
            resizeMode: 'cover',
        },
        title: {
            marginTop: 5,
            fontSize: 14,
            fontWeight: '500',
            color: isDarkMode ? Palette.darkTextGray : '#555',
            textAlign: 'center',
        },
    });

    const renderExercise = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Body Builder Exercises</Text>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={renderExercise}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default BodyBuilderExercises;
