import { Alert, Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { logout, getUser } from '../appwrite/service';

export default function Home({ navigation }) {
  const [userData, setUserData] = useState();

  const handleLogout = async () => {
    try {
      await logout(); // Perform logout logic
      Alert.alert('Success', 'Logged out successfully!');
      navigation.navigate('Login'); // Navigate to Login
    } catch (error) {
      Alert.alert('Error', error.message);
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
        Alert.alert('Error', error.message || 'Unable to fetch user data.');
      }
    };

    fetchUserData(); // Call the function
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{
            uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
            width: 400,
            height: 300,
            cache: 'default',
          }}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          Build Fast. Scale Big. All in One Place.
        </Text>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {userData.name}</Text>
            <Text style={styles.userDetails}>Email: {userData.email}</Text>
          </View>
        )}
      </View>
      <Button
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{ name: 'logout', color: '#FFFFFF' }}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
