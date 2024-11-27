import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import BottomNavigationBar from '../components/NavigationBar';
import { Button } from 'react-native-paper';
import Palette from '../constants/colors';
import { logout } from '../appwrite/service';
import Snackbar from 'react-native-snackbar';

export default function Main({ navigation }) {


  return (
    <SafeAreaView style={styles.container}>
      
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
