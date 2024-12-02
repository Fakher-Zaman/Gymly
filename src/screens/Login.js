import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { login, getUser } from '../appwrite/service';
import Snackbar from 'react-native-snackbar';
import { TextInput } from 'react-native-paper';
import Palette from '../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('All fields are required');
            return;
        }
        try {
            await login(email, password);
            const userData = await getUser();
            dispatch(setUser(userData)); // Save user data in Redux
            Snackbar.show({
                text: 'Logged in successfully!',
                duration: Snackbar.LENGTH_SHORT,
            });
            navigation.navigate('Main');
        } catch (error) {
            Snackbar.show({
                text: 'Error: ' + error.message,
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.formContainer}>
                <View style={styles.appNameContainer}>
                    <Text style={styles.appName}>Login</Text>
                    <FontAwesome5 name="user-lock" size={40} color={Palette.primary} />
                </View>
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.textInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    mode="outlined"
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.textInput}
                    secureTextEntry={!showPassword}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={togglePasswordVisibility}
                        />
                    }
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Pressable onPress={handleLogin} style={styles.btn}>
                    <Text style={styles.btnText}>Login</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Signup')} style={styles.signUpContainer}>
                    <Text style={styles.noAccountLabel}>
                        Don't have an account? <Text style={styles.signUpLabel}>Create one</Text>
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    formContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
    },
    appNameContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: '100%',
    },
    appName: {
        color: Palette.primary,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
    textInput: {
        marginTop: 10,
        width: '90%',
        height: 45,
        alignSelf: 'center',
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        marginTop: 10,
    },
    btn: {
        backgroundColor: Palette.primary,
        padding: 10,
        height: 45,
        alignSelf: 'center',
        borderRadius: 5,
        width: '90%',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
    },
    btnText: {
        color: '#FFFFFF',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    signUpContainer: {
        marginTop: 80,
    },
    noAccountLabel: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    signUpLabel: {
        color: Palette.primary,
    },
});
