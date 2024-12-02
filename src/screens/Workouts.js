import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import AppbarHeader from '../components/AppbarHeader';
import { workoutData } from '../lib/data';
import Palette from '../constants/colors';

export default function Workouts({ navigation }) {
    const [filter, setFilter] = useState('All');

    const filteredData =
        filter === 'All' ? workoutData : workoutData.filter((item) => item.category === filter);

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
            <AppbarHeader title="Workouts" navigation={navigation} />
            <View style={styles.segmentedButtonContainer}>
                <SegmentedButtons
                    theme={{ colors: { primary: Palette.primary } }}
                    value={filter}
                    onValueChange={setFilter}
                    buttons={[
                        { value: 'All', label: 'All' },
                        { value: 'Strength', label: 'Strength' },
                        { value: 'Cardio', label: 'Cardio' },
                        { value: 'Core', label: 'Core' },
                    ]}
                />
            </View>
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </>
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 16,
    },
    segmentedButtonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 12,
        elevation: 2,
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
