import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme, configureFonts } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Loading from './src/components/Loading';
import { getUser } from './src/appwrite/service';
import { StatusBar } from 'expo-status-bar';
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import Main from './src/screens/Main';
import Landing from './src/screens/Landing';
import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
import WorkoutDetail from './src/screens/WorkoutDetail';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load fonts using `expo-font`
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
  });

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

    if (fontsLoaded) {
      SplashScreen.hideAsync();
      checkUserLoggedIn();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || loading) {
    return <Loading />;
  }

  // Font configuration
  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Roboto-Bold',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Roboto-Italic',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Roboto-Italic',
        fontWeight: 'normal',
      },
      bodySmall: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 'normal',
      },
      bodyMedium: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 'normal',
      },
    },
  };

  const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
    roundness: 8, // Optional: Rounded corners for UI elements
    colors: {
      ...DefaultTheme.colors,
      primary: '#F44336', // Use your red palette here
      accent: '#FFCDD2',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'Main' : 'Landing'}
          screenOptions={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
        </Stack.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </PaperProvider>
  );
}
