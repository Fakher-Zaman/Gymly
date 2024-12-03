import React, { useEffect } from 'react';
import { Provider as PaperProvider, DefaultTheme, configureFonts } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Loading from './src/components/Loading';
import { Provider } from 'react-redux';
import store, { persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/components/NavigationContainer';

SplashScreen.preventAutoHideAsync();

export default function App() {
  // Load fonts using `expo-font`
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
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
          <AppNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
