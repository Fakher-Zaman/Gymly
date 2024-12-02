import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import AppbarHeader from '../components/AppbarHeader';
import { nutritionData } from '../lib/data';

export default function Nutritions({ navigation }) {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('NutritionDetail', { nutrition: item })}
        >
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.benefits}>{item.benefits}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <AppbarHeader title="Nutritions" navigation={navigation} />
            <FlatList
                data={nutritionData}
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
        resizeMode: 'contain',
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    benefits: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    details: {
        fontSize: 12,
        color: '#888',
    },
});
