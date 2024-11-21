import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'

export type AppStackParamList = {
    Home: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
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
