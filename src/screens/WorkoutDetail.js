import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import AppbarHeader from '../components/AppbarHeader';

export default function WorkoutDetail({ route, navigation }) {
    const { workout } = route.params;
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const resetTimer = () => {
        setSeconds(0);
        setIsRunning(false);
    };

    return (
        <>
            <AppbarHeader title="Workout Detail" />
            <View style={styles.container}>
                <Image source={workout.gifImage} style={styles.gif} />
                <Text style={styles.title}>{workout.title}</Text>
                <Text style={styles.details}>{workout.details}</Text>

                <View style={styles.timerContainer}>
                    <Text style={styles.timer}>Time: {seconds}s</Text>
                    <View style={styles.buttonContainer}>
                        <Button title={isRunning ? 'Stop' : 'Start'} onPress={() => setIsRunning(!isRunning)} />
                        <Button title="Reset" onPress={resetTimer} />
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
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
    },
});
