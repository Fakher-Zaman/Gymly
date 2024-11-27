import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import BottomNavigationBar from '../components/NavigationBar';

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
});
