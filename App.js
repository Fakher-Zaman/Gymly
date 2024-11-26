import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './src/components/Loading';
import { getUser } from './src/appwrite/service';
import { StatusBar } from 'expo-status-bar';
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Landing from './src/screens/Landing';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const user = await getUser();
        setLoading(false);
        if (user) {
          console.log('User is logged in:', user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setLoading(false);
        setIsLoggedIn(false);
        console.error('Error checking user login status:', error.message);
      }
    };

    checkUserLoggedIn();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'Home' : 'Landing'} // Dynamically set the initial route
          screenOptions={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Landing" component={Landing} />
        </Stack.Navigator>

        <StatusBar style="dark" />
      </NavigationContainer>
    </>
  );
}
