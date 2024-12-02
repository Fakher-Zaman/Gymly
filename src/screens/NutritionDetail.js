import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import AppbarHeader from '../components/AppbarHeader';

export default function NutritionDetail({ route, navigation }) {
    const { nutrition } = route.params;

    return (
        <>
            <AppbarHeader title={nutrition.name} navigation={navigation} />
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={nutrition.image} style={styles.image} />
                <Text style={styles.title}>{nutrition.name}</Text>
                <Text style={styles.details}>{nutrition.details}</Text>
                <Text style={styles.benefits}>Benefits: {nutrition.benefits}</Text>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    details: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    benefits: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
