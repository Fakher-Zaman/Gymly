import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AppbarHeader from '../components/AppbarHeader';
import Palette from '../constants/colors';
import workoutData from '../lib/data';

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
