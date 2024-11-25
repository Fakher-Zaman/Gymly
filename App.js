import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signup, login, logout, getUser } from './src/appwrite/service';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async () => {
    try {
      await signup(email, password, name);
      Alert.alert('Success', 'User signed up successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('Success', 'User logged in successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Success', 'User logged out successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGetUser = async () => {
    try {
      const user = await getUser();
      Alert.alert('Current User', JSON.stringify(user));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
      />

      <Text>Password:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />

      <Text>Name:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />

      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Get User" onPress={handleGetUser} />
    </View>
  );
};

export default App;
