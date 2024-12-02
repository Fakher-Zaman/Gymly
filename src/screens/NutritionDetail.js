import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import AppbarHeader from '../components/AppbarHeader';
import { List } from 'react-native-paper';
import Palette from '../constants/colors';

export default function NutritionDetail({ route, navigation }) {
    const { nutrition } = route.params;

    // Split benefits into an array (assuming comma-separated for simplicity)
    const benefitsList = nutrition.benefits.split(',');

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
                                left={(props) => <List.Icon {...props} icon="check-circle" color={Palette.primary} />}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
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
    },
    details: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
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
    },
});
