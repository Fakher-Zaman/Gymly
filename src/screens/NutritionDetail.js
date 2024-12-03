import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import AppbarHeader from '../components/AppbarHeader';
import { List } from 'react-native-paper';
import Palette from '../constants/colors';
import { useSelector } from 'react-redux';

export default function NutritionDetail({ route, navigation }) {
    const { nutrition } = route.params;

    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';

    // Split benefits into an array (assuming comma-separated for simplicity)
    const benefitsList = nutrition.benefits.split(',');

    const styles = StyleSheet.create({
        container: {
            padding: 16,
            alignItems: 'center',
            backgroundColor: isDarkMode ? Palette.darkBackground : '#fff',
            minHeight: '100%',
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
            textAlign: 'center',
            color: isDarkMode ? Palette.darkText : Palette.charcoal,
        },
        details: {
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 16,
            color: isDarkMode ? Palette.darkText : Palette.charcoal,
        },
        benefitsContainer: {
            alignSelf: 'stretch',
            marginTop: 16,
        },
        benefitsTitle: {
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 8,
            textAlign: 'center',
            color: isDarkMode ? Palette.darkText : Palette.charcoal,
        },
    });

    return (
        <>
            <AppbarHeader title="Nutrition Detail" navigation={navigation} />
            <ScrollView>
                <View style={styles.container}>
                    <Image source={nutrition.image} style={styles.image} />
                    <Text style={styles.title}>{nutrition.name}</Text>
                    <Text style={styles.details}>{nutrition.details}</Text>
                    <View style={styles.benefitsContainer}>
                        <Text style={styles.benefitsTitle}>Benefits:</Text>
                        {benefitsList.map((benefit, index) => (
                            <List.Item
                                key={index}
                                title={benefit.trim()}
                                titleStyle={{ color: isDarkMode ? Palette.darkText : Palette.charcoal }}
                                left={(props) => <List.Icon {...props} icon="check-circle" color={Palette.primary} />}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
