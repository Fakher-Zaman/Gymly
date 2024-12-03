import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Import all screens
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Main from '../screens/Main';
import Landing from '../screens/Landing';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import WorkoutDetail from '../screens/WorkoutDetail';
import NutritionDetail from '../screens/NutritionDetail';
import Workouts from '../screens/Workouts';
import Nutritions from '../screens/Nutritions';
import { useSelector } from 'react-redux';
import Palette from '../constants/colors';

const Stack = createStackNavigator();

export default function AppNavigator() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isLoggedIn ? 'Main' : 'Landing'}
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    headerShown: false,
                    cardStyle: { backgroundColor: isDarkMode ? Palette.darkBackground : '#000' }, // Black background for dark mode
                    cardStyleInterpolator: ({ current, layouts }) => {
                        const translateX = current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0], // Horizontal slide without fade
                        });

                        return {
                            cardStyle: {
                                transform: [{ translateX }], // Only slide effect
                                backgroundColor: isDarkMode ? '#000' : '#fff', // Maintain background during transition
                            },
                        };
                    },
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="Workouts" component={Workouts} />
                <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
                <Stack.Screen name="Nutritions" component={Nutritions} />
                <Stack.Screen name="NutritionDetail" component={NutritionDetail} />
            </Stack.Navigator>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        </NavigationContainer>
    );
}
