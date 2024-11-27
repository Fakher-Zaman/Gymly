import { Alert, Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { logout, getUser } from '../appwrite/service';
import Palette from '../constants/colors';
import Snackbar from 'react-native-snackbar';
import BottomNavigationBar from '../components/NavigationBar';

export default function Home({ navigation }) {
  const [userData, setUserData] = useState();

  const handleLogout = async () => {
    try {
      await logout(); // Perform logout logic
      Snackbar.show({
        text: 'Logged out successfully!',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'UNDO',
          textColor: Palette.success,
          onPress: () => {
            console.log('Undo action!');
          },
        },
      });
      navigation.navigate('Login');
    } catch (error) {
      Snackbar.show({
        text: 'Error: ' + error.message,
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'UNDO',
          textColor: Palette.error,
          onPress: () => {
            console.log('Undo action!');
          },
        },
      });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = await getUser();  // Will throw error if no active session
        console.log("Session: ", session);
        const user = {
          name: session.name,
          email: session.email,
        };
        setUserData(user);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData(); // Call the function
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <AppbarHeader /> */}
      <BottomNavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0B0D32',
  },
});
