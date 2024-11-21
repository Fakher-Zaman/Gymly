import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { AppwriteContext } from '../appwrite/AppwriteContext'
import Loading from '../components/Loading'

// Routes
import AuthStack from './AuthStack'
import AppStack from './AppStack'

const Router = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext);

    useEffect(() => {
        appwrite.getCurrentUser().then((user) => {
            setLoading(false);
            if (user) {
                setIsLoggedIn(true);
            }
        })
            .catch(_ => {
                setLoading(false);
                setIsLoggedIn(false);
            })
    }, [appwrite, setIsLoggedIn])

    if (loading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Router
