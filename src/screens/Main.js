import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import BottomNavigationBar from '../components/NavigationBar';
import { Button } from 'react-native-paper';
import Palette from '../constants/colors';
import { logout } from '../appwrite/service';
import Snackbar from 'react-native-snackbar';

export default function Main({ navigation }) {
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

  return (
    <SafeAreaView style={styles.container}>
      <Button
        mode="contained"
        onPress={() => handleLogout()}
        style={styles.button}
      >Logout</Button>
      <BottomNavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: Palette.primary,
  },
});
