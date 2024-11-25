import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home';
import Screen from './src/screens/Screen';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Home" component={Home} options={{ title: "Home Page" }} />
        <Stack.Screen name="Screen" component={Screen} options={{ title: "Screen" }} />
        <Stack.Screen name="Login" component={Login} options={{ title: "Login Page" }} />
        <Stack.Screen name="Signup" component={Signup} options={{ title: "Signup Page" }} />
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