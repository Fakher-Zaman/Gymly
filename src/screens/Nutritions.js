import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import AppbarHeader from '../components/AppbarHeader';
import { nutritionData } from '../lib/data';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Palette from '../constants/colors';

export default function Nutritions({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(nutritionData);

    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = nutritionData.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const styles = StyleSheet.create({
        list: {
            paddingVertical: 8,
            paddingHorizontal: 16,
        },
        searchContainer: {
            padding: 16,
            backgroundColor: isDarkMode ? Palette.darkBackground : '#f8f8f8',
        },
        card: {
            flexDirection: 'row',
            marginBottom: 16,
            alignItems: 'center',
            backgroundColor: isDarkMode ? Palette.darkCardBackground : Palette.white,
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
            color: isDarkMode ? Palette.darkText : '#333',
            marginBottom: 4,
        },
        benefits: {
            fontSize: 14,
            color: isDarkMode ? Palette.darkTextGray : '#888',
            marginBottom: 4,
        },
    });

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
                <Searchbar
                    placeholder="Search for nutrition..."
                    onChangeText={handleSearch}
                    value={searchText}
                    placeholderTextColor={isDarkMode ? Palette.darkTextGray : '#888'}
                    inputStyle={{ color: isDarkMode ? Palette.darkText : '#333' }}
                    iconColor={isDarkMode ? Palette.darkTextGray : '#888'}
                    style={{
                        backgroundColor: isDarkMode ? Palette.darkCardBackground : '#fff',
                        borderRadius: 8,
                        elevation: 2,
                    }}
                />
            </View>
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                backgroundColor={isDarkMode ? Palette.darkBackground : '#f8f8f8'}
            />
        </>
    );
}
