import React from 'react'
import Signup from '../screens/Signup'
import Login from '../screens/Login'
import { createStackNavigator } from '@react-navigation/stack';

export default function AuthStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackVisible: false
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    )
}