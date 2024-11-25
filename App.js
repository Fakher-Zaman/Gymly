import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Loading from './src/components/Loading'; // A loading spinner component
import { getUser } from './src/appwrite/service';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true); // Loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const user = await getUser(); // Await the result of getUser
        setLoading(false); // Stop loading
        if (user) {
          setIsLoggedIn(true); // User is logged in
        }
      } catch (error) {
        setLoading(false); // Stop loading
        setIsLoggedIn(false); // User is not logged in
        console.error('Error checking user login status:', error.message); // Log error for debugging
      }
    };

    checkUserLoggedIn(); // Call the async function
  }, []);

  if (loading) {
    return <Loading />; // Show a loading spinner while checking authentication
  }

  return (
    <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home Page' }} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} options={{ title: 'Login Page' }} />
              <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup Page' }} />
            </>
          )}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
