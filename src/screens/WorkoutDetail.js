import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import AppbarHeader from '../components/AppbarHeader';
import Palette from '../constants/colors';
import { workoutData } from '../lib/data';

export default function WorkoutDetail({ route, navigation }) {
    const { workout } = route.params;
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeOver, setTimeOver] = useState(false);

    const workoutTime = parseInt(workout.timing.split(' ')[0]); // Extract time in seconds

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => {
                    if (prev + 1 >= workoutTime) {
                        clearInterval(interval);
                        setIsRunning(false);
                        setTimeOver(true);
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const resetTimer = () => {
        setSeconds(0);
        setIsRunning(false);
        setTimeOver(false);
    };

    const handleNextWorkout = () => {
        const currentIndex = workoutData.findIndex((item) => item.id === workout.id);
        const nextWorkout = workoutData[currentIndex + 1];
        if (nextWorkout) {
            navigation.replace('WorkoutDetail', { workout: nextWorkout });
        } else {
            alert('No more exercises! Great job!');
        }
    };

    return (
        <>
            <AppbarHeader title="Workout Detail" navigation={navigation} />
            <ScrollView>
                <View style={styles.container}>
                    <Image source={workout.gifImage} style={styles.gif} />
                    <Text style={styles.title}>{workout.title}</Text>
                    <Text style={styles.details}>{workout.details}</Text>

                    <View style={styles.timerContainer}>
                        <Text style={styles.timer}>
                            Time: {seconds}s / {workoutTime}s
                        </Text>
                        <View style={styles.buttonContainer}>
                            {!timeOver ? (
                                <Button
                                    color={isRunning ? Palette.error : Palette.primary}
                                    title={isRunning ? 'Stop' : 'Start'}
                                    onPress={() => setIsRunning(!isRunning)}
                                />
                            ) : (
                                <Button
                                    color={Palette.primary}
                                    title="Next Exercise"
                                    onPress={() => handleNextWorkout()}
                                />
                            )}
                            <Button color={Palette.accent} title="Reset" onPress={resetTimer} />
                        </View>
                    </View>

                    {timeOver && (
                        <View style={styles.timeOverContainer}>
                            <Text style={styles.errorMessage}>Time is over! Great effort!</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
        minHeight: '100%',
    },
    gif: {
        width: 300,
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    details: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        marginBottom: 16,
    },
    timerContainer: {
        alignItems: 'center',
    },
    timer: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginBottom: 16,
    },
    timeOverContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    errorMessage: {
        fontSize: 18,
        color: 'red',
        marginBottom: 16,
    },
    nextButton: {
        backgroundColor: Palette.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    nextButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
