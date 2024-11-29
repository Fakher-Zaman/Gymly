import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AppbarHeader from '../components/AppbarHeader';
import Palette from '../constants/colors';

const workoutData = [
    {
        id: 1,
        title: 'Push-ups',
        details: 'Perform a full push-up with proper form for 30 seconds.',
        image: require('../../assets/workouts/pngs/push-ups.png'),
        gifImage: require('../../assets/workouts/gifs/push-ups.gif'),
        timing: '30 seconds',
        category: 'Strength',
    },
    {
        id: 2,
        title: 'Squats',
        details: 'Perform bodyweight squats with proper form for 45 seconds.',
        image: require('../../assets/workouts/pngs/squat.png'),
        gifImage: require('../../assets/workouts/gifs/squat.gif'),
        timing: '45 seconds',
        category: 'Strength',
    },
    {
        id: 3,
        title: 'Jumping Jacks',
        details: 'Perform jumping jacks for 1 minute.',
        image: require('../../assets/workouts/pngs/jumping-jacks.png'),
        gifImage: require('../../assets/workouts/gifs/jumping-jacks.gif'),
        timing: '1 minute',
        category: 'Cardio',
    },
    {
        id: 4,
        title: 'Plank',
        details: 'Hold a plank position for 1 minute.',
        image: require('../../assets/workouts/pngs/plank.png'),
        gifImage: require('../../assets/workouts/gifs/plank.gif'),
        timing: '1 minute',
        category: 'Core',
    },
];

export default function Workouts({ navigation }) {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
        >
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.timing}>{item.timing}</Text>
                <Text style={styles.details}>{item.details}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <AppbarHeader title="Workouts" />
            <View style={styles.container}>
                <FlatList
                    data={workoutData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    list: {
        paddingBottom: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Palette.cardBackground,
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    timing: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    details: {
        fontSize: 14,
        color: '#888',
    },
});
