import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import AppbarHeader from '../components/AppbarHeader';
import { nutritionData } from '../lib/data';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Nutritions({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(nutritionData);

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = nutritionData.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

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
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for nutrition..."
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                </View>
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
    searchContainer: {
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
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
