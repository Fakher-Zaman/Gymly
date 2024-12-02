import React from 'react';
import { View, StyleSheet, FlatList, Image, Text } from 'react-native';
import { exercises } from '../lib/data';

const BodyBuilderExercises = () => {
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

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    list: {
        paddingHorizontal: 10,
    },
    card: {
        marginRight: 15,
        alignItems: 'center',
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
        color: '#555',
    },
});

export default BodyBuilderExercises;
