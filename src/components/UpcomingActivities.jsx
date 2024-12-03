import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Palette from '../constants/colors';
import { activities } from '../lib/data';
import { useSelector } from 'react-redux';

const UpcomingActivities = () => {
    const theme = useSelector((state) => state.theme);  // Access theme from Redux store
    const isDarkMode = theme === 'dark';

    const styles = StyleSheet.create({
        upcomingContainer: {
            marginTop: 5,
        },
        upcomingHeading: {
            fontSize: 20,
            fontWeight: 'bold',
            color: isDarkMode ? Palette.darkText : Palette.charcoal,
            marginBottom: 10,
        },
        activityItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? Palette.darkText : '#f8f8f8',
        },
        activityTextContainer: {
            marginLeft: 10,
        },
        activityTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: isDarkMode ? Palette.darkText : Palette.charcoal,
        },
        activityTime: {
            fontSize: 14,
            color: isDarkMode ? Palette.darkTextGray : '#555',
        },
    });

    return (
        <View style={styles.upcomingContainer}>
            <Text style={styles.upcomingHeading}>Upcoming Activities</Text>
            <View style={styles.activityList}>
                {activities.map(activity => (
                    <View key={activity.id} style={styles.activityItem}>
                        <FontAwesome5
                            name={activity.icon}
                            size={24}
                            color={isDarkMode ? Palette.darkText : Palette.charcoal}
                            style={{ width: 35 }}
                        />
                        <View style={styles.activityTextContainer}>
                            <Text style={styles.activityTitle}>{activity.title}</Text>
                            <Text style={styles.activityTime}>{activity.time}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default UpcomingActivities;
