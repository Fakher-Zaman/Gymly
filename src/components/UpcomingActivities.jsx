import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Palette from '../constants/colors';

const UpcomingActivities = () => {
    const activities = [
        { id: '1', title: 'Yoga Session', time: '10:00 AM', icon: 'spa' },
        { id: '2', title: 'Cardio Workout', time: '2:00 PM', icon: 'running' },
        { id: '3', title: 'Strength Training', time: '6:00 PM', icon: 'dumbbell' },
    ];

    return (
        <View style={styles.upcomingContainer}>
            <Text style={styles.upcomingHeading}>Upcoming Activities</Text>
            <View style={styles.activityList}>
                {activities.map(activity => (
                    <View key={activity.id} style={styles.activityItem}>
                        <FontAwesome5
                            name={activity.icon}
                            size={24}
                            color={Palette.charcoal}
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

const styles = StyleSheet.create({
    upcomingContainer: {
        marginTop: 5,
    },
    upcomingHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Palette.charcoal,
        marginBottom: 10,
    },
    activityList: {
        paddingBottom: 10,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    activityTextContainer: {
        marginLeft: 10,
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Palette.charcoal,
    },
    activityTime: {
        fontSize: 14,
        color: '#757575',
    },
});

export default UpcomingActivities;
