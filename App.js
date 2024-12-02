import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider, DefaultTheme, configureFonts } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Loading from './src/components/Loading';
import { getUser } from './src/appwrite/service';
import { Provider } from 'react-redux';
import store, { persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/components/NavigationContainer';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <AppNavigator isLoggedIn={isLoggedIn} />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
