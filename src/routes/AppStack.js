import React from 'react'
import Home from '../screens/Home'
import { createStackNavigator } from '@react-navigation/stack';

export default function AppStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackVisible: false
            }}
        >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}
