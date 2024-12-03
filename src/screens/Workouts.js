import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import AppbarHeader from '../components/AppbarHeader';
import { workoutData } from '../lib/data';
import { useSelector } from 'react-redux';
import Palette from '../constants/colors';

export default function Workouts({ navigation }) {
    const [filter, setFilter] = useState('All');

    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';

    const filteredData =
        filter === 'All' ? workoutData : workoutData.filter((item) => item.category === filter);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: isDarkMode ? Palette.darkCardBackground : Palette.white }]}
            onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
        >
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
                <Text style={[styles.title, { color: isDarkMode ? Palette.darkText : '#333' }]}>{item.title}</Text>
                <Text style={[styles.timing, { color: isDarkMode ? Palette.darkTextGray : '#666' }]}>{item.timing}</Text>
                <Text style={[styles.details, { color: isDarkMode ? Palette.darkTextGray : '#888' }]}>{item.details}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <AppbarHeader title="Workouts" navigation={navigation} />
            <View style={[styles.segmentedButtonContainer, { backgroundColor: isDarkMode ? Palette.darkBackground : '#fff' }]}>
                <SegmentedButtons
                    value={filter}
                    onValueChange={setFilter}
                    theme={{
                        colors: {
                            primary: isDarkMode ? Palette.primary : '#333', // Change the active button color
                            surface: isDarkMode ? Palette.darkCardBackground : '#fff', // Background color of the button
                            onSurface: isDarkMode ? Palette.darkText : '#000', // Color for the button text
                        }
                    }}
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
                contentContainerStyle={[styles.list, { backgroundColor: isDarkMode ? Palette.darkBackground : '#f8f8f8' }]}
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
        paddingVertical: 16,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
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
        marginBottom: 4,
    },
    details: {
        fontSize: 14,
    },
});
